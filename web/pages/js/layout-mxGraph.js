	
	var editor;
	var graph;
	var model;
	var parent;
	var instanciasConjuntoA = new Array();
	var instanciasConjuntoB = new Array();
	
	//Contador de intancias
	var qtdInstanciasConjuntoA = 1;
	var qtdInstanciasConjuntoB = 1;
	var qtdClasses = 0;
	
	var	xLeft = 60; 
	var yLeft = 20;
	
	var	xRight = 280;
	var yRight = 20;
	
	var height = 30;
	var widht = 80;
	
	var widhtInstance = 80;
	var heightInstance = 60;
    
	
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

    		var config = mxUtils.load('comum/wfgraph-commons.xml')
				.getDocumentElement();
    		editor.configure(config);
    		
    		//graph.setBackgroundImage(new mxImage('/EditorM-MOBI/pages/imagem/Ok.png', 360, 200));
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
			  
    	//    graph.setBackgroundImage(new mxImage('../imagem/Ok.png', 100, 100));
       }
    }

    function configureStylesheet(graph)
		{
			var style = new Object();
			style = graph.stylesheet.getDefaultVertexStyle();
			style[mxConstants.STYLE_SHAPE] = 'box';
			style[mxConstants.STYLE_STROKECOLOR] = '#EFFBFB';
			style[mxConstants.STYLE_FONTCOLOR] = '#000000';
			style[mxConstants.STYLE_FILLCOLOR] = '#EFFBFB';
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
	
		ajaxRequest('/EditorM-MOBI/ajaxAddInstancia.do', params);

	}

	function editarInstancia(nomeAntigo,nomeNovo,conjunto){
		var params = 'nomeAntigo=' + nomeAntigo + '&nomeNovo=' + nomeNovo + '&conjunto=' + conjunto;

		ajaxRequest('/EditorM-MOBI/ajaxAddInstancia.do', params);
		
	}
	
	function estruturaInicial(){
		
		atualizarRelacoes();
		
	}
	
	function atualizarRelacoes(){
		//Contador de intancias
		xLeft = 60;  
		xRight = 280;
		yLeft = 20;
		yRight = 20;
		height = 30;
		widht = 80;
		qtdInstanciasConjuntoA = 1;
		qtdInstanciasConjuntoB = 1;
		
		Ext.getCmp("classeA").setValue('');
		Ext.getCmp("classeB").setValue('');
		Ext.getCmp('fieldSetRadioGroup').remove('form');
		Ext.getCmp('fieldSetRadioGroup').doLayout();
		
	}
	
	function resetarRelacoes(){
		
		editor.destroy();
		main();
		atualizarRelacoes();
		
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
	
	function criarCellVertex(graph, id, nome, x, y, width, height, shape ){
		parent = graph.getDefaultParent();
		return graph.insertVertex(parent, id, nome, x, y, width, height, shape);
	}
		
	/*
 		This is the main layout definition.
 	*/

	
	mxBasePath = 'comum/mxgraph';
	
	function createPopupMenu(graph, menu, cell, evt, classe)
		{
		var model = graph.getModel();

		if (cell != null)
		{
			if (model.isVertex(cell))
			{
				menu.addItem('Adicionar Herança', 'comum/mxgraph/images/check.png', function(){
					
					ClasseNova = criarCellVertex(graph, 'Novo', 'Novo', 0, 0, widht, height);
					graph.insertEdge(parent, null, '', ClasseNova,cell);

					graph.startEditingAtCell(ClasseNova);
					
					params = 'tipoRelacao=Heranca' + '&classeA=' + cell.id + '&classeB=' + ClasseNova.id ;
					ajaxDivUpdate('graphContainerDiagrama','/EditorM-MOBI/ajaxDiagrama.do',params, resetarRelacoes);
											
				});
				
				menu.addItem('Adicionar Composicao', 'comum/mxgraph/images/check.png', function(){
					
					abrirPopupComposicao(graph, cell);

				});
				
				menu.addItem('Adicionar Equivalência', 'comum/mxgraph/images/check.png', function(){
					
					ClasseNova = criarCellVertex(graph, 'Novo', 'Novo', 0, 0, widht, height);
					graph.insertEdge(parent, null, '', ClasseNova,cell);

					graph.startEditingAtCell(ClasseNova);
					
					params = 'tipoRelacao=Equivalencia' + '&classeA=' + cell.id + '&classeB=' + ClasseNova.id ;
					ajaxDivUpdate('graphContainerDiagrama','/EditorM-MOBI/ajaxDiagrama.do',params, resetarRelacoes);
											
				});
			
	
				menu.addItem('Editar Nome Classe', 'comum/mxgraph/images/text.gif', function()
				{
					graph.startEditingAtCell(cell);
					
				});
	
				/*if (cell.id != 'Thing' &&
					model.isVertex(cell))
				{
					menu.addItem('Excluir Classe', 'comum/mxgraph/images/delete.gif', function()
					{
						var cells = [];								
							
						graph.traverse(cell, true, function(vertex)
								{
									cells.push(vertex);					
									return true;
								},null,new Array(), true);
	
						graph.removeCells(cells);
											
					});
				}*/
			}
					
		}

	};

