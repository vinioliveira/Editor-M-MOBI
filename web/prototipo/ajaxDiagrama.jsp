<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- Example code -->
<div id="teste">
	<script type="text/javascript"><!--
	function mainDiagrama(){
	    var container2 = document.getElementById('teste');
	    // Creates the graph inside the given container
        var editor2 = new mxEditor();
		var graph2 = editor2.graph;
		var model2 = graph2.model;
		var parent2 = graph2.getDefaultParent();
		var layout2;
		editor2.setGraphContainer(container2);

		  // Enables rubberband selection
        new mxRubberband(graph2);

     	// Enables automatic layout on the graph and installs
		// a tree layout for all groups who's children are
		// being changed, added or removed.
		layout2 = new mxCompactTreeLayout(graph2, false);
		layout2.useBoundingBox = false;
		layout2.levelDistance = 30;
		layout2.nodeDistance = 10;
		var layoutMgr = new mxLayoutManager(graph2);
		
		layoutMgr.getLayout = function(cell)
		{
			if (cell.getChildCount() > 0)
			{
				return layout2;
			}
		};

		// Edges are not editable
		graph2.isCellEditable = function(cell)
		{
			return !this.model.isEdge(cell);
		}
		
		graph2.getModel().beginUpdate();
		try
		{
			 var w = graph.container.offsetWidth;
			 var y = 20;
			 var x = w - 30;

			 var thing = graph.insertVertex(parent2, 'Thing', 'Thing', w/2 - 30, 20, 80, 30);
			 
			 <c:forEach items="${relacionamentos}" var="relacao">
			 
			 	var classeA = model2.getCell('${relacao.classeA}');

			 	if(classeA == null){
			 		classeA = graph2.insertVertex(parent2, '${relacao.classeA}', '${relacao.classeA}', 0, 0, 80, 30);
			 		graph2.insertEdge(parent2, null, '', thing, classeA);
			 	}

			 	if('${relacao.tipoRelacao}' == 'Heranca'){
			 		var classeB = graph2.insertVertex(parent2, '${relacao.classeB}', '${relacao.classeB}', 0, 0, 80, 30);
			 		graph2.insertEdge(parent2, null, '', classeA, classeB);
			 	}

			 	if('${relacao.tipoRelacao}' == 'Composicao'){
			 		var x1 = classeA.geometry.x + 100;
			 		var y1 = classeA.geometry.y;
			 		var classeB = graph2.insertVertex(parent2, '${relacao.classeB}', '${relacao.classeB}', x1, y1, 80, 30);
			 		graph2.insertEdge(parent2, null, 'Pertence a(1,1)->\n<-tem(1,n)', classeB, classeA,mxConstants.EDGESTYLE_TOPTOBOTTOM);
			 	}

			 	if('${relacao.tipoRelacao}' == 'Equivalencia'){
			 		var x1 = classeA.geometry.x + 100;
			 		var y1 = classeA.geometry.y;
			 		var classeB = graph2.insertVertex(parent2, '${relacao.classeB}', '${relacao.classeB}', x1, y1, 80, 30);
			 		graph2.insertEdge(parent2, null, 'Equivalencia', classeB, classeA,mxConstants.EDGESTYLE_TOPTOBOTTOM);
			 		
			 	}
		 		
			 </c:forEach>

		}
		finally
		{
		   // Updates the display
		   graph2.getModel().endUpdate();
		}

	}
	
		mainDiagrama();	
	--></script>
</div>

