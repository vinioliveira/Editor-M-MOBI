function main(){
	
   // Checks if the browser is supported
   if (!mxClient.isBrowserSupported())
   {
      mxUtils.error('Browser is not supported!', 200, false);
   }
   else
   {
	   var container = document.getElementById('graphContainer');
	    // Creates the graph to the instance relationship inside the given container
	    editor = new mxEditor();
		instanceGraph = editor.graph;
		model = instanceGraph.model;
		parent = instanceGraph.getDefaultParent();
		editor.setGraphContainer(container);

		instanceGraph.setConnectable(true);
		instanceGraph.setCellsDisconnectable(true);
		instanceGraph.swimlaneNesting = false;
		instanceGraph.setCellsSelectable(true);
		instanceGraph.setAllowLoops(false);
		instanceGraph.setCellsResizable(false);

		var config = mxUtils.load('comum/keyhandler-minimal.xml').getDocumentElement();
		editor.configure(config);
	
		//graph.setBackgroundImage(new mxImage('/EditorM-MOBI/pages/imagem/Ok.png', 360, 200));
		instanceGraph.cellsMovable = false;
		
		// Removes the source vertex if edges are removed and destroy the relation 
		instanceGraph.addListener(mxEvent.REMOVE_CELLS, function(sender, evt){
				var cells = evt.getArgAt(0);
				removerRelacionamentos(cells);});
		
		// Menu de limpar na tela.
		instanceGraph.panningHandler.factoryMethod = function(menu, cell, evt){
			return optionsRelation(instanceGraph, menu, cell, evt);
		};
		
		//Set edges are not editable
		instanceGraph.isCellEditable = function(cell){
			return !this.model.isEdge(cell);
		};

		//Set CSS 
		configureStylesheet(instanceGraph);

		//Vincular instancias
		instanceGraph.addEdge = function(edge, parent, source, target, index){
			//Validar se já existe uma ligação entre o source e o target
			if(target != null ){
				atualizarRelacionamento(source.value, target.value);
				mobi.RELATION.addRelacaoInstancia(source.value, target.value);
				validarRelacionamentos();
				return mxGraph.prototype.addEdge.apply(this, arguments); // "supercall"
				
			}
		};

		// Text label changes will go into the name field of the user object
		instanceGraph.model.valueForCellChanged = function(cell, value){
			if(atualizacaoLabelRotina(cell, value)){
				return mxGraphModel.prototype.valueForCellChanged.apply(this, arguments);
			}
		};

		  // Enables rubberband selection
	    new mxRubberband(instanceGraph);
		  
	//    graph.setBackgroundImage(new mxImage('../imagem/Ok.png', 100, 100));
   }
}

function configureStylesheet(instanceGraph){
	
		var style = new Object();
		
		style = instanceGraph.stylesheet.getDefaultVertexStyle();
		style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CLOUD;
		style[mxConstants.STYLE_STROKECOLOR] = '#64A8C6';
		style[mxConstants.STYLE_FONTCOLOR] = '#000000';
		style[mxConstants.STYLE_FILLCOLOR] = '#64A8C6';
		style[mxConstants.STYLE_IMAGE_WIDTH] = '200px';
		style[mxConstants.STYLE_IMAGE_HEIGHT] = '500px';
		
		instanceGraph.getStylesheet().putCellStyle('boxstyle', style);

		instanceGraph.getStylesheet().putDefaultEdgeStyle(mxConstants.EDGESTYLE_TOPTOBOTTOM);

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


function createPopupMenu(graph, menu, cell, evt, classe){
	var model = graph.getModel();

	if (cell != null)
	{
		if (model.isVertex(cell))
		{
			menu.addItem('Adicionar Herança', 'images/add_48.png', function(){
				
				ClasseNova = criarCellVertex(graph, 'Novo', 'Novo', 0, 0, widht, height);
				
				graph.insertEdge(parent, null, '', ClasseNova,cell);

				if(cell.id != 'Thing'){
					params = {tipoRelacao : mobi.INHERITANCE , classeA : cell.id , classeB : ClasseNova.id };
					
					ajaxDivUpdate('graphContainerDiagrama','/EditorM-MOBI/ajaxDiagrama.do',params, resetarRelacoes);
				}else{

					params = {nomeClasse : ClasseNova.id };
					ajaxDivUpdate('graphContainerDiagrama','/EditorM-MOBI/addClass.do',params, resetarRelacoes);
				}
			});
			if (cell.id != 'Thing' && model.isVertex(cell)) {
				
				menu.addItem('Adicionar Composicao', 'images/add_48.png', function(){
					
					if(cell.id != 'Thing'){
						abrirPopupComposicao(graph, cell);
					}
				
				});
				
				menu.addItem('Adicionar Equivalência', 'images/add_48.png', function(){
					
					ClasseNova = criarCellVertex(graph, 'Novo', 'Novo', 0, 0, widht, height);
					graph.insertEdge(parent, null, '', ClasseNova,cell);
				
					
					if(cell.id != 'Thing'){
						params = { tipoRelacao : mobi.EQUIVALENCE , classeA : cell.id , classeB : ClasseNova.id };
						ajaxDivUpdate('graphContainerDiagrama','/EditorM-MOBI/ajaxDiagrama.do',params, resetarRelacoes);
					}else{
						params = {nomeClasse : ClasseNova.id };
						ajaxDivUpdate('graphContainerDiagrama','/EditorM-MOBI/addClass.do',params, resetarRelacoes);
					}
											
				});
				
				
				menu.addItem('Editar Nome Classe', 'comum/mxgraph/images/text.gif', function()
				{
					graph.startEditingAtCell(cell);
					
			});
	
			}
		}else if (model.isEdge(cell)){
			
			menu.addItem('Excluir Classe', 'images/cross_48.png', function()
					{ 
						nameRelation =	cell.id.substring(0, cell.id.length-2);
						params = { nameRelation : nameRelation };
						ajaxDivUpdate('graphContainerDiagrama','eliminarRelacao.do',params, resetarRelacoes);		
											
					});
		}
	}
	else{
		menu.addItem('Limpar','images/refresh_48.png',function(){
			resetarRelacoes();});

		menu.addItem('Reset Modelagem','images/clean_16.png',function(){
			Ext.Msg.show({
				   title:'Começar de novo?',
				   msg: 'Você está prestes a perder tudo que foi feito até agora está certo disso ?',
				   buttons: Ext.Msg.YESNO,
				   fn: function(btn){
				    	if (btn == 'yes'){
				    		ajaxDivUpdate('graphContainerDiagrama','/EditorM-MOBI/cleanSession.do',null, resetarRelacoes);
				    	}
					},
				   animEl: 'elId',
				   icon: Ext.MessageBox.QUESTION
				});
			});
	}
};

function optionsRelation(graph, menu, cell, evt, classe){
	
	var model = graph.getModel();

	if (cell != null)
	{
		menu.addItem('Excluir', 'images/cross_48.png', function()
		{
			var cells = [];			
			if (model.isVertex(cell)){
				if(cell.getEdgeCount()==0){
					cells.push(cell);
				}
			}else{
				cells.push(cell);
			}
			
			graph.removeCells(cells);			
			
			//var tipo_relacao = cell.id.substring(cell.id.length-1);

			graph.traverse(cell, true, function(vertex)
					{
						cells.push(vertex);					
						return true;
					},null,new Array(), true);
								
		});
	}else{
		menu.addItem('Limpar','images/refresh_48.png',function(){
			resetarRelacoes();});
		
		menu.addItem('Reset Modelagem','images/clean_16.png',function(){
			Ext.Msg.show({
				   title:'Começar de novo?',
				   msg: 'Você está prestes a perder tudo que foi feito até agora está certo disso ?',
				   buttons: Ext.Msg.YESNO,
				   fn: function(btn){
				    	if (btn == 'yes'){
				    		ajaxDivUpdate('graphContainerDiagrama','/EditorM-MOBI/cleanSession.do',null, resetarRelacoes);
				    	}
					},
				   animEl: 'elId',
				   icon: Ext.MessageBox.QUESTION
				});
			});
	}
	
	
	
	
}


