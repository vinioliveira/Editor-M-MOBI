<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<!-- Example code -->
<div id="diagramaClasse">
	<script type="text/javascript">
		
	function carregarStore() {
     	<logic:iterate name="classes" id="classe" indexId="index">
     	mobi.classes['${index}'] = ['${classe.uri}','${classe.uri}']
        </logic:iterate>
	  }

    var editor2;
	var graph2;
	var model2;
	var parent2;
	var layout2;
	
	function mainDiagrama(){
	    var container2 = document.getElementById('diagramaClasse');
        editor2 = new mxEditor();
		graph2 = editor2.graph;
		model2 = graph2.model;
		parent2 = graph2.getDefaultParent();
		layout2;
		editor2.setGraphContainer(container2);

		graph2.setConnectable(false);
		graph2.setCellsDisconnectable(false);
		graph2.swimlaneNesting = false;
		graph2.setCellsSelectable(true);
		graph2.setAllowLoops(false);
		graph2.setCellsResizable(false);
		graph.setCellsMovable(false);
		graph.setAutoSizeCells(true);
		graph.setPanning(true);
		graph.panningHandler.useLeftButtonForPanning = true;

		  // Enables rubberband selection
        new mxRubberband(graph2);

        var outln = new mxOutline(graph2, document.getElementById('outlineContainer'));

     	// Enables automatic layout on the graph and installs
		// a tree layout for all groups who's children are
		// being changed, added or removed.
		layout2 = new mxCompactTreeLayout(graph2, false);
		layout2.useBoundingBox = false;
		layout2.levelDistance = 40;
		layout2.nodeDistance = 10;
		layout2.invert = true;
		var layoutMgr = new mxLayoutManager(graph2);
		
		layoutMgr.getLayout = function(cell)
		{
			if (cell.getChildCount() > 0)
			{
				return layout2;
			}
		};

		// Edges are not editable
		graph2.isCellEditable = function(cell){
			
			return !this.model.isEdge(cell);
		};

		//Adicionar evento para gerar as intancias quando clicar na relação
		graph2.addListener(mxEvent.DOUBLE_CLICK, function(sender, event){
			
			cell = event.getArgAt(1);
						
			if (graph2.model.isEdge(cell)){

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
		graph2.addListener(mxEvent.LABEL_CHANGED, function(sender, event){
			cell = event.getArgAt(0);

			params = { classeAntigo : cell.id , classeNovo :  cell.value } ;
			ajaxDivUpdate('graphContainerDiagrama', '/EditorM-MOBI/atualizarNomeClasse.do', params, resetarRelacoes);
				
		});

		
		graph2.getModel().beginUpdate();
		try
		{
			 var w = graph.container.offsetWidth;
			 var y = 20;
			 var x = w - 30;

			 var thing = graph.insertVertex(parent2, 'Thing', 'Thing', w/2 - 30, 20, 80, 30);
			 
			 <c:forEach items="${relacionamentos}" var="relacao">
			 
			 	var classeA = model2.getCell('${relacao.classA.uri}');

			 	if(classeA == null){
				 	
			 		classeA = criarCellVertex(graph2, '${relacao.classA.uri}', '${relacao.classA.uri}', 0, 0, widht, height );
			 		graph2.insertEdge(parent2, null, '', classeA,thing);
			 		graph2.panningHandler.factoryMethod = function(menu, cell, evt)
					{
						return createPopupMenu(graph2, menu, cell, evt, classeB);
					};
			 	}
			 	
			 	<c:if test="${relacao.type == 4}">
	
			 		var classeB = criarCellVertex(graph2, '${relacao.classB.uri}', '${relacao.classB.uri}', 0, 0, widht, height);
			 		graph2.insertEdge(parent2, '${relacao.classB.uri}'+'_'+'${relacao.type}', '', classeB,classeA);
			 		graph2.panningHandler.factoryMethod = function(menu, cell, evt){
						return createPopupMenu(graph2, menu, cell, evt, classeB);
					};
			 		
				</c:if>
	
			 	<c:if test="${relacao.type == 6}">
			 	
			 		var x1 = classeA.geometry.x + 100;
			 		var y1 = classeA.geometry.y;
			 		var classeB = graph2.insertVertex(parent2, '${relacao.classB.uri}', '${relacao.classB.uri}', x1, y1, 80, 30);
			 		graph2.insertEdge(parent2,'${relacao.classB.uri}'+'_'+'${relacao.type}', 'Equivalencia', classeB, classeA,mxConstants.EDGESTYLE_TOPTOBOTTOM);
	
				</c:if>
			 	<c:if test="${relacao.type == 1 || relacao.type == 5 || relacao.type == 2 }"> 
	
					var x1 = classeA.geometry.x + 100;
			 		var y1 = classeA.geometry.y;
			 		var classeB = graph2.insertVertex(parent2, '${relacao.classB.uri}', '${relacao.classB.uri}', x1, y1, 80, 30);
			 		graph2.insertEdge(parent2,'${relacao.classB.uri}'+'_'+'${relacao.type}', 
			 				'${relacao.nameA} '+'(${relacao.cardinalityA})'+'  '+'(${relacao.cardinalityB}) '+'${relacao.nameB} ',
			 				 classeB, classeA,mxConstants.EDGESTYLE_TOPTOBOTTOM);
			 	</c:if>

			 	<c:if test="${relacao.type == 3}"> 

					var x1 = classeA.geometry.x + 100;
			 		var y1 = classeA.geometry.y;
			 		var classeB = graph2.insertVertex(parent2, '${relacao.classB.uri}', '${relacao.classB.uri}', x1, y1, 80, 30);
			 		graph2.insertEdge(parent2,'${relacao.classB.uri}'+'_'+'${relacao.type}', 
			 				'${relacao.name} '+'(${relacao.cardinalityA})'+'  '+'(${relacao.cardinalityB}) '+'${relacao.name} ',
			 				 classeB, classeA,mxConstants.EDGESTYLE_TOPTOBOTTOM);
		 		</c:if>
			 	
			 </c:forEach>

		}
		finally
		{
		   // Updates the display
		   graph2.getModel().endUpdate();

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
