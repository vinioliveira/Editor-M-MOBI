<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<!-- Example code -->
<div id="diagramaClasse">
	<script type="text/javascript">

	function carregarStore() {
		<c:if test="${classes != null}">
	     	<logic:iterate name="classes" id="classe" indexId="index">
	     	mobi.classes['${index}'] = ['${classe.uri}','${classe.uri}']
	        </logic:iterate>
       	</c:if>
	  }

    var editor2;
	var umlGraph;
	var model2;
	var parent2;
	var layout2;
	
	function mainDiagrama(){
	    var container2 = document.getElementById('diagramaClasse');
        editor2 = new mxEditor();
		umlGraph = editor2.graph;
		model2 = umlGraph.model;
		parent2 = umlGraph.getDefaultParent();
		layout2;
		editor2.setGraphContainer(container2);

		umlGraph.setConnectable(false);
		umlGraph.setCellsDisconnectable(false);
		umlGraph.swimlaneNesting = false;
		umlGraph.setCellsSelectable(true);
		umlGraph.setAllowLoops(false);
		umlGraph.setCellsResizable(false);

		/* Casso ocorrer algum erro no graph relacao descomentars 
		instanceGraph.setCellsMovable(false);
		instanceGraph.setAutoSizeCells(true);
		instanceGraph.setPanning(true);
		instanceGraph.panningHandler.useLeftButtonForPanning = false;
		instanceGraph.panningHandler.selectOnPopup = false;
		instanceGraph.panningHandler.useLeftButtonForPopup = false;*/

		var keyHandler = new mxKeyHandler(instanceGraph);

		// Enables rubberband selection
        new mxRubberband(umlGraph);

        var outln = new mxOutline(umlGraph, document.getElementById('outlineContainer'));

     	// Enables automatic layout on the graph and installs
		// a tree layout for all groups who's children are
		// being changed, added or removed.
		layout2 = new mxCompactTreeLayout(umlGraph, false);
		layout2.useBoundingBox = false;
		layout2.levelDistance = 55;
		layout2.nodeDistance = 10;
		layout2.invert = true;
		var layoutMgr = new mxLayoutManager(umlGraph);
		
		layoutMgr.getLayout = function(cell)
		{
			if (cell.getChildCount() > 0)
			{
				return layout2;
			}
		};

		// Edges are not editable
		umlGraph.isCellEditable = function(cell){
			
			return !this.model.isEdge(cell);
		};

		//Adicionar evento para gerar as intancias quando clicar na relação
		umlGraph.addListener(mxEvent.DOUBLE_CLICK, function(sender, event){
			
			cell = event.getArgAt(1);
						
			if (umlGraph.model.isEdge(cell)){

				var tipo_relacao = cell.id.substring(cell.id.length-1);

				if (tipo_relacao == mobi.INHERITANCE){
					carregarRelacao(cell.target.value,cell.source.value,mobi.INHERITANCE);
				}
				
				if(tipo_relacao == mobi.EQUIVALENCE){
					carregarRelacao(cell.target.value,cell.source.value, mobi.EQUIVALENCE);
				}

				if(tipo_relacao == mobi.UNIDIRECIONAL_COMPOSITION || tipo_relacao == mobi.BIDIRECIONAL_COMPOSITION
						|| tipo_relacao == mobi.SYMMETRIC_COMPOSITION){
					carregarRelacao(cell.target.value,cell.source.value, tipo_relacao);
				}
			}
			
		});
		
		//Adicionar evento para quando Atualizar o nome da Label das Classes
		umlGraph.addListener(mxEvent.LABEL_CHANGED, function(sender, event){
			cell = event.getArgAt(0);

			params = { classeAntigo : cell.id , classeNovo :  cell.value } ;
			ajaxDivUpdate('graphContainerDiagrama', '/EditorM-MOBI/atualizarNomeClasse.do', params, resetarRelacoes);
				
		});

		umlGraph.panningHandler.factoryMethod = function(menu, cell, evt)
		{
			return createPopupMenu(umlGraph, menu, cell, evt);
		};
		
		umlGraph.getModel().beginUpdate();
		try
		{
			 var w = instanceGraph.container.offsetWidth;
			 var y = 20;
			 var x = w - 30;

			 var thing = criarCellVertex(umlGraph, 'Thing', 'Thing', w/2 - 30, 20, widht, height );
			 
			 <c:if test="${relacionamentos != null || classes != null}">
			 
			 	<c:if test="${relacionamentos == null && classes != null}">
				 
			 	 	<c:forEach items="${classes}" var="classe">
			 	 		classeA = criarCellVertex(umlGraph, '${classe.uri}', '${classe.uri}', 0, 0, widht, height );
			 			umlGraph.insertEdge(parent2, null, '', classeA, thing);
			 			umlGraph.panningHandler.factoryMethod = function(menu, cell, evt){
							return createPopupMenu(umlGraph, menu, cell, evt, classeA);
						};
			 	 	</c:forEach>

		 	 	</c:if>
			 	<c:forEach items="${relacionamentos}" var="relacao">
				 
				 	var classeA = model2.getCell('${relacao.classA.uri}');
				 	if(classeA == null){
					 	
				 		classeA = criarCellVertex(umlGraph, '${relacao.classA.uri}', '${relacao.classA.uri}', 0, 0, widht, height );
				 		umlGraph.insertEdge(parent2, null, '', classeA, thing);
				 		umlGraph.panningHandler.factoryMethod = function(menu, cell, evt)
						{
							return createPopupMenu(umlGraph, menu, cell, evt, classeA);
						};
				 	}
				 	
				 	<c:if test="${relacao.type == 4}">
				 		var classeB = criarCellVertex(umlGraph, '${relacao.classB.uri}', '${relacao.classB.uri}', 0, 0, widht, height);
				 		if(classeB.getEdgeCount()>0){
					 		var edge = classeB.getEdgeAt(0);
					 		classeB.removeEdge(edge);
				 		}
				 		umlGraph.insertEdge(parent2, '${relacao.classB.uri}'+'_'+'${relacao.type}', '', classeB,classeA);
				 		umlGraph.panningHandler.factoryMethod = function(menu, cell, evt){
							return createPopupMenu(umlGraph, menu, cell, evt, classeB);
						};
				 		
					</c:if>
		
				 	<c:if test="${relacao.type == 6}">
				 	
				 		var x1 = classeA.geometry.x + 100;
				 		var y1 = classeA.geometry.y;
				 		var classeB = umlGraph.insertVertex(parent2, '${relacao.classB.uri}', '${relacao.classB.uri}', x1, y1, widht, height);
				 		umlGraph.insertEdge(parent2,'${relacao.classB.uri}'+'_'+'${relacao.type}', 'Equivalencia', classeB, classeA,mxConstants.EDGESTYLE_TOPTOBOTTOM);
		
					</c:if>
					
				 	<c:if test="${relacao.type == 1 || relacao.type == 5 || relacao.type == 2 }"> 

				 		var cardinalityA =	mobi.PorcessCardinality('${relacao.cardinalityA}');
				 		var cardinalityB =	mobi.PorcessCardinality('${relacao.cardinalityB}');
				 		var propriedadeA = '${relacao.nameA}'.split('_')[1];
				 		var propriedadeB = '${relacao.nameB}'.split('_')[1];

				 		var stringA = '('+ cardinalityA +')'+propriedadeA;
					 	var stringB = propriedadeB == null ? '' : '\n(' + cardinalityB +')' + propriedadeB;
				 		
						var x1 = classeA.geometry.x + 100;
				 		var y1 = classeA.geometry.y;
				 		var classeB = umlGraph.insertVertex(parent2, '${relacao.classB.uri}', '${relacao.classB.uri}', x1, y1, widht, height);
				 		umlGraph.insertEdge(parent2,'${relacao.classB.uri}'+'_'+'${relacao.type}', 
				 				stringA + stringB , classeB, classeA,mxConstants.EDGESTYLE_TOPTOBOTTOM);
				 	</c:if>
	
				 	<c:if test="${relacao.type == 3}"> 

				 		var cardinalityA =	mobi.PorcessCardinality('${relacao.cardinalityA}');
			 			var cardinalityB =	mobi.PorcessCardinality('${relacao.cardinalityB}');
			 			var propriedade = '${relacao.name}'.split('_')[2];
						var x1 = classeA.geometry.x + 100;
				 		var y1 = classeA.geometry.y;
				 		var classeB = umlGraph.insertVertex(parent2, '${relacao.classB.uri}', '${relacao.classB.uri}', x1, y1, 80, 30);
				 		umlGraph.insertEdge(parent2,'${relacao.classB.uri}'+'_'+'${relacao.type}', 
				 				'('+cardinalityA +')'+propriedade +'\n ('+cardinalityB+')'+ propriedade,
				 				 classeB, classeA,mxConstants.EDGESTYLE_TOPTOBOTTOM);
			 		</c:if>
				 	
			 	</c:forEach>
			 </c:if>

		}
		finally
		{
		   // Updates the display
		   umlGraph.getModel().endUpdate();

		}
	}
	
		mainDiagrama();
		addToolbarButton(editor2,document.getElementById('statusContainer'), 'zoomIn', '', 'images/zoom_in.png', true);
		addToolbarButton(editor2,document.getElementById('statusContainer'), 'zoomOut', '', 'images/zoom_out.png', true);
		addToolbarButton(editor2,document.getElementById('statusContainer'), 'actualSize', '', 'images/view_1_1.png', true);
		addToolbarButton(editor2,document.getElementById('statusContainer'), 'fit', '', 'images/fit_to_size.png', true);
			
	</script>
</div>

<div id="outlineContainer"
	style="position:absolute;overflow:hidden;top:2px;right:0px;width:200px;height:140px;background:transparent;border-style:solid;border-color:black;">
</div>

<div id="statusContainer" style="text-align:right;position:absolute;overflow:hidden;bottom:0px;left:0px;max-height:15px;height:36px;right:0px;color:white;padding:6px;background-image:url('prototipo/imagem/layout-browser-hd-bg.gif');">
	<div style="font-size:10pt;float:left;">
	</div>
</div>
