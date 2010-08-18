<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
	<title>Editor M-MOBI</title>
	<!-- Sets the basepath for the library if not in same directory -->
   <script type="text/javascript">
      mxBasePath = 'comum/js/';
   </script>

   <!-- Loads and initializes the library -->
   <script type="text/javascript" src="comum/js/mxClient.js"></script>
   
	<script type="text/javascript">

		// Program starts here. Creates a sample graph in the
		// DOM node with the specified ID. This function is invoked
		// from the onLoad event handler of the document (see below).
		
		var editor;
		var graph;
		var model;
		var root;
		var layout; 
		
		function main(container, outline, status)
		{
		
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
			
				editor = new mxEditor();
				graph = editor.graph;
				model = graph.model;
				

				// Enables rubberband selection
				new mxRubberband(graph);
				
				// Disables some global features
				graph.setCellsDisconnectable(false);
				graph.setCellsCloneable(false);
				
				// Sets the graph container and configures the editor
				editor.setGraphContainer(container);
				
				// Enables automatic layout on the graph and installs
				// a tree layout for all groups who's children are
				// being changed, added or removed.
				layout = new mxCompactTreeLayout(graph, false);
				layout.useBoundingBox = false;
				layout.levelDistance = 30;
				layout.nodeDistance = 10;
				var layoutMgr = new mxLayoutManager(graph);
				
				layoutMgr.getLayout = function(cell)
				{
					if (cell.getChildCount() > 0)
					{
						return layout;
					}
				};


				// Gets the default parent for inserting new cells. This
				// is normally the first child of the root (ie. layer 0).
				var parent = graph.getDefaultParent();
				
				var outln = new mxOutline(graph, outline);
				
				addToolbarButton(editor, status, 'zoomIn', '', 'images/zoom_in.png', true);
				addToolbarButton(editor, status, 'zoomOut', '', 'images/zoom_out.png', true);
				addToolbarButton(editor, status, 'actualSize', '', 'images/view_1_1.png', true);
				addToolbarButton(editor, status, 'fit', '', 'images/fit_to_size.png', true);

				graph.setAutoSizeCells(true);
				
				// Adds cells to the model in a single step
				graph.getModel().beginUpdate();
				try
				{
				   var w = graph.container.offsetWidth;
				   root = graph.insertVertex(parent, 'Thing', 'Thing', w/2 - 30, 20, 80, 30);

				   var pessoa = graph.insertVertex(parent, 'PessoaF', 'PessoaF', 0, 0, 80, 30);
				   var aluno = graph.insertVertex(parent, 'Aluno', 'Aluno', w/2 - 0, 0, 80, 30);
				   var professor = graph.insertVertex(parent, 'Professor', 'Professor', 0, 0, 80, 30);
										   

				   graph.insertEdge(parent, null, '', root, pessoa);	
				   graph.insertEdge(parent, null, '', pessoa, aluno);
				   graph.insertEdge(parent, null, '', pessoa, professor);


				   
				}
				finally
				{
				   // Updates the display
				   graph.getModel().endUpdate();
				}				
				
			}
		
		}
		
		function addToolbarButton(editor, toolbar, action, label, image, isTransparent)
		{
			var button = document.createElement('button');
			button.style.fontSize = '10';
			if (image != null)
			{
				var img = document.createElement('img');
				img.setAttribute('src', image);
				img.style.width = '16px';
				img.style.height = '16px';
				img.style.verticalAlign = 'middle';
				img.style.marginRight = '2px';
				button.appendChild(img);
			}
			if (isTransparent)
			{
				button.style.background = 'transparent';
				button.style.color = '#FFFFFF';
				button.style.border = 'none';
			}
			mxEvent.addListener(button, 'click', function(evt)
			{
				editor.execute(action);
			});
			mxUtils.write(button, label);
			toolbar.appendChild(button);
		}
		
		function makeAnInstance(nameClass,nameSubclass,composicao){

			var parent = graph.getDefaultParent();
			var childs = graph.getChildCells(parent,true,false);
			
			var cellRoot = root;
			if(nameSubclass != ''){
				for(var i=0; i < childs.length; i++){
					if(childs[i].id == nameSubclass.value){
						cellRoot = childs[i]; 						
					} 	
				}
			}

				

			graph.getModel().beginUpdate();
			try
			{
			  
			   if(eval(composicao.checked)){
					var v1 = graph.insertVertex(parent, nameClass.value, nameClass.value, geometry.x - 120, geometry.y, 80, 30);
				    graph.insertEdge(parent, null, '', cellRoot,v1,mxConstants.EDGESTYLE_TOPTOBOTTOM);
			   }else{
					var v1 = graph.insertVertex(parent, nameClass.value, nameClass.value, 0, 0, 80, 30);
				    graph.insertEdge(parent, null, '', cellRoot, v1);
				    alert(v1.geometry.x);
				    alert(v1.geometry.y);
				    
			   } 
			   
			}
			finally
			{
			   // Updates the display
			   graph.getModel().endUpdate();
			}
		}
		
	</script>
</head>

<!-- Page passes the container for the graph to the grogram -->
<body onload="main(document.getElementById('graphContainer'),
			document.getElementById('outlineContainer'),
			document.getElementById('statusContainer'));">
	
	

	<!-- Creates a container for the graph -->
	<div id="graphContainer"
		style="position:absolute;overflow:hidden;top:36px;left:60px;bottom:36px;right:0px;">
		Classe: <input type="text" id="nameClass" /> <br />
		Subclasse:<input type="text" id="nameSubClass" /> <br />
		Composição:<input type="checkbox" id="composicao" /> 
		<input type="button" value="Criar uma Classe" onclick="makeAnInstance(nameClass,nameSubClass,composicao)" />
	
	
	</div>
	

	<!-- Creates a container for the outline -->
	<div id="outlineContainer"
		style="position:absolute;overflow:hidden;top:36px;right:0px;width:200px;height:140px;background:transparent;border-style:solid;border-color:black;">
	</div>
		
	<!-- Creates a container for the sidebar -->
	<div id="statusContainer"
		style="text-align:right;position:absolute;overflow:hidden;bottom:0px;left:0px;max-height:24px;height:36px;right:0px;color:white;padding:6px;background-image:url('images/toolbar_bg.gif');">
		<div style="font-size:10pt;float:left;">
			Created with <a href="http://www.mxgraph.com" target="_blank">mxGraph</a>
		</div>
	</div>
</body>
</html>
