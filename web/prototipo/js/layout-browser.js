	
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
    
    function main(container)
    {
       // Checks if the browser is supported
       if (!mxClient.isBrowserSupported())
       {
          mxUtils.error('Browser is not supported!', 200, false);
       }
       else
       {
    	   var container = document.getElementById('graphContainer');
    	    // Creates the graph inside the given container
    	    editor = new mxEditor();
    		graph = editor.graph;
    		model = graph.model;
    		parent = graph.getDefaultParent();
    		editor.setGraphContainer(container);

    		graph.setConnectable(true);
    		graph.setCellsDisconnectable(false);
    		graph.swimlaneNesting = false;
    		graph.setCellsSelectable(true);

    		var config = mxUtils.load(
    		'comum/keyhandler-minimal.xml').
    			getDocumentElement();
    		editor.configure(config);
    		
    		// Removes the source vertex if edges are removed
			graph.addListener(mxEvent.REMOVE_CELLS, function(sender, evt)
			{
				
				var cells = evt.getArgAt(0);
				
				for (var i = 0; i < cells.length; i++)
				{
					var cell = cells[i];
					
					if (this.model.isEdge(cell))
					{
						
						var terminal = this.model.getTerminal(cell, false);
						var parent = this.model.getChildVertices(terminal);
						alert(mxUtils.toString(terminal));
						alert(mxUtils.toString(parent));
						alert(mxUtils.toString(parent[0]));
						alert(mxUtils.toString(parent[1]));
					}
				}
			});

    		// Edges are not editable
    		graph.isCellEditable = function(cell)
    		{
    			return !this.model.isEdge(cell);
    		}

    		configureStylesheet(graph);

    		graph.addEdge = function(edge, parent, source, target, index)
    		{

    			atualizarRelacionamento(source.value,target.value);
    			return mxGraph.prototype.addEdge.apply(this, arguments); // "supercall"
    		}

    		// Text label changes will go into the name field of the user object
    		graph.model.valueForCellChanged = function(cell, value)
    		{
    			//Não houve alteração no nome
    	  	if(cell.value == value){
    				return;
    	  	}
    			
    			var conjunto = cell.id.substring(0,9);
    			//Conjunto A
    			if(conjunto == 'ConjuntoA'){
    				for (var name in instanciasConjuntoA){
    					if(value == instanciasConjuntoA[name]){
    						mxUtils.error('Já Existe uma instancia com este nome',200,true);
    						return;
    					}
    					
    					if(instanciasConjuntoA[name] == cell.value){
    						editarInstancia(cell.value,value,'ConjuntoA');
    						instanciasConjuntoA[name] = value;
    						cell.id = 'ConjuntoA ' + value;				
    					}
    				}
    			}else{
    				//Conjunto B
    				for (var name in instanciasConjuntoB){
    					if(value == instanciasConjuntoB[name]){
    						mxUtils.error('Já Existe uma instancia com este nome',200,true);
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
    		}

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



    function configureStylesheetDiagrama(graph)
		{
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
			var suns = graph.getChildCells();
			for ( var int = 0; int < suns.length; int++){
				model.remove(suns[int]);
			}
			
			qtdInstanciasConjuntoA = 0;
			qtdInstanciasConjuntoB = 0;
			
			xLeft = 20; 
			xRight = 300;
			yLeft = 20;
			yRight = 20;
			height = 30;
			widht = 80;
			
			Ext.getCmp("classeA").setValue('');
			Ext.getCmp("classeB").setValue('');
			Ext.getCmp("tipoRelacao").setValue('');
			
			var panel = Ext.get('relacoes-div');
			panel.getUpdater().update( {
				url : '/EditorM-MOBI/ajaxListarRelacoes.do',
				params : {
					checked : true
				},
				scripts : true,
				loadScripts: true
			});
			
		}
		
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
		
		function eliminarRelacionamento(instanciaA,instanciaB){
			var params = 'instanciaA=' + instanciaA + '&instanciaB=' + instanciaB;
			
			var myAjax = new Ajax.Request('/EditorM-MOBI/ajaxEliminarRelacionamento.do', {
				method : 'post',
				parameters : params
			});
		}
		
		
		
//
// This is the main layout definition.
//
Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	// This is an inner body element within the Details panel created to provide a "slide in" effect
	// on the panel body without affecting the body's box itself.  This element is created on
	// initial use and cached in this var for subsequent access.
	var detailEl;
	
	// This is the main content center region that will contain each example layout panel.
	// It will be implemented as a CardLayout since it will contain multiple panels with
	// only one being visible at any given time.
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
    	fieldLabel : 'Classe',
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
    	fieldLabel : 'Classe',
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
            id:'delete',
            iconCls:'delete-icon',
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
        },{
            id:'ok',
            iconCls:'delete-icon',
            text:'OK',
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
        }],
        // tree-specific configs:
        contentEl: 'relaco-div',
        items: [cb,classeA,classeB]
        
    });
    
	// This is the Details panel that contains the description for each example layout.
	var detailsPanel = {
		id: 'details-panel',
        title: 'Details',
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
