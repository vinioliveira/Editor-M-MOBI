	
	var editor;
	var graph;
	var model;
	var parent;
	var instanciasConjuntoA = new Array();
	var instanciasConjuntoB = new Array();
	
	//Contador de intancias
	var qtdInstanciasConjuntoA = 0;
	var qtdInstanciasConjuntoB = 0;
	var qtdClasses = 0;
	var	xLeft = 20; 
	var	xRight = 300;
	var yLeft = 20;
	var yRight = 20;
	var height = 30;
	var widht = 80;
    
	
    function main(){
    	
       // Checks if the browser is supported
       if (!mxClient.isBrowserSupported())
       {
          mxUtils.error('Browser is not supported!', 200, false);
       }
       else
       {
    	   var container = document.getElementById('graphContainer');
    	    // Creates the graph to the relationship inside the given container
    	    editor = new mxEditor();
    		graph = editor.graph;
    		model = graph.model;
    		parent = graph.getDefaultParent();
    		editor.setGraphContainer(container);

    		graph.setConnectable(true);
    		graph.setCellsDisconnectable(true);
    		graph.swimlaneNesting = false;
    		graph.setCellsSelectable(true);
    		graph.setAllowLoops(false);
    		graph.setCellsResizable(false);

    		var config = mxUtils.load('comum/keyhandler-minimal.xml')
				.getDocumentElement();
    		editor.configure(config);
    		
    		graph.cellsMovable = false;
    		
    		// Removes the source vertex if edges are removed and destroy the relation 
			graph.addListener(mxEvent.REMOVE_CELLS, function(sender, evt){
				
				var cells = evt.getArgAt(0);
				
				for (var i = 0; i < cells.length; i++)
				{
					var cell = cells[i];
					if (this.model.isEdge(cell))
					{
						eliminarRelacionamento(cell.source.value,cell.target.value);
						this.model.remove(cell);
					}else{
						var conjunto = cell.id.substring(0,9);
						var classe;
						
						if(conjunto == 'ConjuntoA'){
							classe = Ext.getCmp("classeA").getValue();
						}else{
							classe = Ext.getCmp("classeB").getValue();
						}
						eliminarInstancia(cell.value,classe);
					}
				}
			});

    		//Set edges are not editable
    		graph.isCellEditable = function(cell){
    			
    			return !this.model.isEdge(cell);
    		};

    		//Set CSS 
    		configureStylesheet(graph);

    		//Draw the line of relation 
    		graph.addEdge = function(edge, parent, source, target, index){

    			atualizarRelacionamento(source.value,target.value);
    			return mxGraph.prototype.addEdge.apply(this, arguments); // "supercall"
    		};

    		// Text label changes will go into the name field of the user object
    		graph.model.valueForCellChanged = function(cell, value){
	    		//If do not was change
	    	  	if(cell.value == value){
	    				return;
	    	  	}
    			
    			var conjunto = cell.id.substring(0,9);
    			//Conjunto (Classe) A
    			if(conjunto == 'ConjuntoA'){
    				for (var name in instanciasConjuntoA){
    					
    					if(value == instanciasConjuntoA[name]){
					        Ext.MessageBox.show({
					           title: 'Erro',
					           msg: 'Já Existe uma instancia com este nome.',
					           buttons: Ext.MessageBox.ERROR,
					           icon: Ext.MessageBox.ERROR
					        });
    						return;
    					}
    					
    					if(cell.value == instanciasConjuntoA[name]){
    						editarInstancia(cell.value, value,'ConjuntoA');
    						instanciasConjuntoA[name] = value;
    						cell.id = 'ConjuntoA ' + value;				
    					}
    				}
    			}else{
    				//Conjunto (Classe) B
    				for (var name in instanciasConjuntoB){
    					if(value == instanciasConjuntoB[name]){
    						Ext.MessageBox.show({
						           title: 'Erro',
						           msg: 'Já Existe uma instancia com este nome.',
						           buttons: Ext.MessageBox.ERROR,
						           icon: Ext.MessageBox.ERROR
						       });
    						return;
    					}
    					
    					if(instanciasConjuntoB[name] == cell.value){
    						editarInstancia(cell.value,value,'ConjuntoB');
    						instanciasConjuntoB[name] = value;
    						cell.id = 'ConjuntoB ' + value;				
    					}
    				}
    			}

    			
    			return mxGraphModel.prototype.valueForCellChanged.apply(this, arguments);
    		};

    		  // Enables rubberband selection
    	    new mxRubberband(graph);
          
         
       }
    }

    function configureStylesheet(graph)
		{
			var style = new Object();
			style = graph.stylesheet.getDefaultVertexStyle();
			style[mxConstants.STYLE_SHAPE] = 'box';
			style[mxConstants.STYLE_STROKECOLOR] = '#000000';
			style[mxConstants.STYLE_FONTCOLOR] = '#000000';
			style[mxConstants.STYLE_FILLCOLOR] = 'white';
			graph.getStylesheet().putCellStyle('boxstyle', style);

			graph.getStylesheet().putDefaultEdgeStyle(mxConstants.EDGESTYLE_TOPTOBOTTOM);
			

		}

    function atualizarRelacionamento(instanciaA, instanciaB) {
  		var params = 'instanciaA=' + instanciaA + '&' + 'instanciaB=' + instanciaB;
  		var myAjax = new Ajax.Request('/EditorM-MOBI/ajaxAddRelacao.do', {
			method : 'get',
			parameters : params,
			evalScripts : true
		});

    }



    function configureStylesheetDiagrama(graph){
    	
			var style = new Object();
			style = graph.stylesheet.getDefaultVertexStyle();
			style[mxConstants.STYLE_SHAPE] = 'box';
			style[mxConstants.STYLE_STROKECOLOR] = '#000000';
			style[mxConstants.STYLE_FONTCOLOR] = '#000000';
			style[mxConstants.STYLE_GRADIENTCOLOR] = '#41B9F5';
			graph.getStylesheet().putCellStyle('boxstyle', style);

			style = new Object();

			style = graph.stylesheet.getDefaultEdgeStyle();
			style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
			style[mxConstants.STYLE_STROKEWIDTH] = '2';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
	}

    /*	
     * BEGIN - Block of actions from the class 
     */
	function adcionarUmaInstancia(nomeInstancia,conjunto,nameClass){
		var params = 'nomeIstancia=' + nomeInstancia + '&' + 'conjunto=' + conjunto;
		if(nameClass != ''){
			params = params + '&' + 'nameClass=' + nameClass;
		}
		
		var myAjax = new Ajax.Request('/EditorM-MOBI/ajaxAddInstancia.do', {
			method : 'get',
			parameters : params
		});
	}

	function editarInstancia(nomeAntigo,nomeNovo,conjunto){
		var params = 'nomeAntigo=' + nomeAntigo + '&nomeNovo=' + nomeNovo + '&conjunto=' + conjunto;

		var myAjax = new Ajax.Request('/EditorM-MOBI/ajaxEditarInstancia.do', {
			method : 'get',
			parameters : params
		});
		
	}
	
	function resetarRelacoes(){
		/*var suns = graph.getChildCells();
		for (var int = 0; int < suns.length; int++){
			model.remove(suns[int]);
		}*/
		
		editor.destroy();
		main();
		
		//Contador de intancias
		xLeft = 20; 
		xRight = 300;
		yLeft = 20;
		yRight = 20;
		height = 30;
		widht = 80;
		qtdInstanciasConjuntoA = 0;
		qtdInstanciasConjuntoB = 0;
		
		Ext.getCmp("classeA").setValue('');
		Ext.getCmp("classeB").setValue('');
		Ext.getCmp("tipoRelacao").setValue('');
		
		var panel = Ext.get('relacoes-div');
		panel.getUpdater().update( {
			url : '/EditorM-MOBI/ajaxListarRelacoes.do',
			scripts : true,
			loadScripts: true
		});
		
	}
	
	function eliminarRelacionamento(instanciaA,instanciaB){
		var params = 'instanciaA=' + instanciaA + '&instanciaB=' + instanciaB;
		
		var myAjax = new Ajax.Request('/EditorM-MOBI/ajaxEliminarRelacionamento.do', {
			method : 'post',
			parameters : params
		});
	}
	
	function eliminarInstancia(instancia,classe){
		var params = 'idClasse=' + classe + '&instancia=' + instancia;
		
		var myAjax = new Ajax.Request('/EditorM-MOBI/ajaxEliminarInstancia.do', {
			method : 'post',
			parameters : params
		});
	}
	
    /*	
     * END - Block of actions from the class 
     */
	
	function carregarRelacao(classeA,classeB,tipoRelacao){
		
		var params = 'classeA=' + classeA + '&classeB=' + classeB + '&tipoRelacao=' + tipoRelacao;
		
		var panel = Ext.get('relaco-div');
		panel.getUpdater().update( {
			url : '/EditorM-MOBI/ajaxCarregarRelacao.do',
			params : params,
			scripts : true,
			loadScripts: true
		});
		
	}
	
	function buscarInstancias(classe,conjunto,tipoRelacao){
		
		var params = 'nomeClasse=' + classe + '&conjunto=' + conjunto + '&tipoRelacao=' + tipoRelacao;
		
		var panel = Ext.get('relaco-div');
		panel.getUpdater().update( {
			url : '/EditorM-MOBI/ajaxBuscarInstancia.do',
			params : params,
			scripts : true,
			loadScripts: true
		});
		
	}
	
	function addToolbarButton(editor,toolbar, action, label, image, isTransparent){
		
		var button = document.createElement('button');
		button.style.fontSize = '10';
		
		if (image != null){
			
			var img = document.createElement('img');
			img.setAttribute('src', image);
			img.style.width = '16px';
			img.style.height = '16px';
			img.style.verticalAlign = 'middle';
			img.style.marginRight = '2px';
			button.appendChild(img);
		}
		
		if (isTransparent){
			
			button.style.background = 'transparent';
			button.style.color = '#FFFFFF';
			button.style.border = 'none';
		}
		
		mxEvent.addListener(button, 'click', function(evt){
			editor.execute(action);
		});
		
		mxUtils.write(button, label);
		toolbar.appendChild(button);
	}
		
	/*
 		This is the main layout definition.
 	*/
	Ext.onReady(function(){
		
		Ext.QuickTips.init();
		
		/* This is an inner body element within the Details panel created to provide a "slide in" effect
		 on the panel body without affecting the body's box itself.  This element is created on
		 initial use and cached in this var for subsequent access.*/
		
		var detailEl;
		
		/* This is the main content center region that will contain each example layout panel.
		 It will be implemented as a CardLayout since it will contain multiple panels with
		 only one being visible at any given time.*/
		
		var contentPanel = new Ext.Panel({
			id: 'content-panel',
			region: 'center', // this is what makes this panel into a region within the containing layout
			layout: 'card',
			margins: '2 5 5 0',
			activeItem: 0,
			border: false,
			items: [
				start
			]
		});
		
		
		var classeA =  new Ext.form.TextField({
	    	id : 'classeA',
	    	fieldLabel : 'Classe A',
	    	style: {
				top:100
			},
			listeners : {
				change : function (text,newValue,oldValue){
					buscarInstancias(newValue,this.id,Ext.getCmp("tipoRelacao").getValue());
				}
			}
	    });
		
		var classeB =  new Ext.form.TextField({
	    	id : 'classeB',
	    	fieldLabel : 'Classe B',
	    	style: {
				
			},
	    	listeners : {
				change : function (text,newValue,oldValue){
					buscarInstancias(newValue,this.id,Ext.getCmp("tipoRelacao").getValue());
				}
			}
	    });
		
		var cb = new Ext.form.ComboBox({
			id: 'tipoRelacao',
		    typeAhead: true,
		    triggerAction: 'all',
		    lazyRender:true,
		    mode: 'local',
		    fieldLabel: 'Tipo da Relação',
		    store: new Ext.data.ArrayStore({
		        id: 0,
		        fields: [
		            'id',
		            'relacao'
		        ],
		        data: [['Composicao', 'Composicao'], ['Heranca', 'Heranca'], ['Equivalencia', 'Equivalencia'],['Simetrica', 'Simetrica']]
		    }),
		    valueField: 'id',
		    displayField: 'relacao'
		});
	
		// Go ahead and create the TreePanel now so that we can use it below
	    var treePanel = new Ext.FormPanel({
	    	id: 'tree-panel',
	        region:'north',
	        height: 400,
	        minSize: 150,
	        autoScroll: true,
	        tbar: [{
	        	id:'add-instancia',
	        	iconCls:'add',
	            text:'Add Instancia',
	            width: 170,
	            scope: this,
	            handler: function(){
		        	if(qtdInstanciasConjuntoA < 5)
					{
						graph.getModel().beginUpdate();
						parent = graph.getDefaultParent();
			            try
			            {
			               var nomeInstancia = 'Instancia ' + qtdInstanciasConjuntoA;
			               var idInstancia = 'ConjuntoA ' + nomeInstancia;
			               var nameClass = '';
			               var instancia1 = graph.insertVertex(parent, idInstancia, nomeInstancia, xLeft, yLeft, widht, height);
		
			               if(qtdInstanciasConjuntoA == 0){
			            	   nameClass = 'Classe ' + qtdClasses;
			            	   if(Ext.getCmp("classeA").getValue(nameClass) == ''){
			            		   Ext.getCmp("classeA").setValue(nameClass);
			            	   }
			            	   qtdClasses++;			               
			               }
			               
			               instanciasConjuntoA[qtdInstanciasConjuntoA] = nomeInstancia;
			               qtdInstanciasConjuntoA++;
			               yLeft = yLeft + 60;
			               adcionarUmaInstancia(nomeInstancia,'ConjuntoA',nameClass);
			               
			            }
			            finally
			            {
			               // Updates the display
			               graph.getModel().endUpdate();
			            }
					}
	        	}
	        },{
	            id:'ok',
	            iconCls:'delete-icon',
	            text:'OK',
	            width: 70,
	            handler: function(){
	        		var relacao = Ext.getCmp("tipoRelacao").getValue();
	        		var classeA = Ext.getCmp("classeA").getValue();
	        		var classeB = Ext.getCmp("classeB").getValue();
	        		
	        		params = 'tipoRelacao=' + relacao + '&classeA=' + classeA + '&classeB=' + classeB;
	  				new Ajax.Updater('graphContainerDiagrama', '/EditorM-MOBI/ajaxDiagrama.do', 
	  				{
	  					method: 'get',
	  					parameters:params,
	  					evalScripts : true,
	  					onComplete : resetarRelacoes
	  				});
	    		}
	        },{
	            id:'delete',
	            iconCls:'add',
	            width: 170,
	            text:'Add Instancia',
	            handler: function(){
	        	if(qtdInstanciasConjuntoB < 5)
				{
					graph.getModel().beginUpdate();
					parent = graph.getDefaultParent();
		            try
		            {
		               var nomeInstancia = 'Instancia ' + qtdInstanciasConjuntoB;
		               var idInstancia = 'ConjuntoB ' + nomeInstancia;
		               var nameClass = '';
		               var instancia1 = graph.insertVertex(parent, idInstancia, nomeInstancia, xRight, yRight, widht, height);
	
		               if(qtdInstanciasConjuntoB == 0){
		            	   nameClass = 'Classe ' + qtdClasses;
		            	   if(Ext.getCmp("classeB").getValue() == ''){
		            		   Ext.getCmp("classeB").setValue(nameClass);
		            	   }
		            	   qtdClasses++;			               
		               }
		               
		               instanciasConjuntoB[qtdInstanciasConjuntoB] = nomeInstancia;
		               qtdInstanciasConjuntoB++;
		               yRight = yRight + 60;
		               adcionarUmaInstancia(nomeInstancia,'ConjuntoB',nameClass);
		               
		            }
		            finally
		            {
		               // Updates the display
		               graph.getModel().endUpdate();
		            }
				}
	    	}
	        }],
	        // tree-specific configs:
	        contentEl: 'relaco-div',
	        items: [cb,classeA,classeB]
	        
	    });
	    
		// This is the Details panel that contains the description for each example layout.
		var detailsPanel = {
			id: 'details-panel',
	        title: 'Relacoes',
	        region: 'center',
	        bodyStyle: 'padding-bottom:15px;background:#eee;',
			autoScroll: true,
			contentEl: 'relacoes-div',
			items: []
	    };
		
		// Finally, build the main layout once all the pieces are ready.  This is also a good
		// example of putting together a full-screen BorderLayout within a Viewport.
	    new Ext.Viewport({
			layout: 'border',
			title: 'Ext Layout Browser',
			items: [{
				xtype: 'box',
				region: 'north',
				applyTo: 'header',
				height: 30
			},{
				layout: 'border',
		    	id: 'layout-browser',
		        region:'west',
		        border: false,
		        split:true,
				margins: '2 0 5 5',
		        width: 420,
		        minSize: 100,
		        maxSize: 500,
				items: [treePanel, detailsPanel]
			},
				contentPanel
			],
	        renderTo: Ext.getBody()
	    });
	});
	
	mxBasePath = 'comum/mxgraph';
	
	function createPopupMenu(graph, menu, cell, evt, classe)
	{
		var model = graph.getModel();

		if (cell != null)
		{
			if (model.isVertex(cell))
			{
				menu.addItem('Add child', 'comum/mxgraph/images/check.png', function(){
					
					parent = graph.getDefaultParent();
					ClasseNova = graph.insertVertex(parent, 'Novo', 'Novo', 0, 0, 80, 30);
					graph.insertEdge(parent, null, '', ClasseNova,cell);

					graph.startEditingAtCell(ClasseNova);
					
					params = 'tipoRelacao=Heranca' + '&classeA=' + cell.id + '&classeB=' + ClasseNova.id ;
	  				new Ajax.Updater('graphContainerDiagrama', '/EditorM-MOBI/ajaxDiagrama.do', 
	  				{
	  					method: 'get',
	  					parameters:params,
	  					evalScripts : true,
	  					onComplete : resetarRelacoes
	  				});
											
				});
			}

			menu.addItem('Edit label', 'comum/mxgraph/images/text.gif', function()
			{
				graph.startEditingAtCell(cell);
				
			});

			if (cell.id != 'Thing' &&
				model.isVertex(cell))
			{
				menu.addItem('Delete', 'comum/mxgraph/images/delete.gif', function()
				{
					var cells = [];								
						
					graph.traverse(cell, true, function(vertex)
							{
								cells.push(vertex);					
								return true;
							},null,new Array(), true);

					graph.removeCells(cells);
										
				});
			}
				
		}

	};

