<html>
<head>
   <title>Prototipo Editor M-MOBI</title>

   <!-- Sets the basepath for the library if not in same directory -->
   <!-- Sets the basepath for the library if not in same directory -->
   <script type="text/javascript">
      mxBasePath = '/dev/comum/js/';
   </script>

   <!-- Loads and initializes the library -->
   <script type="text/javascript" src="${pageContext.request.contextPath}/comum/js/mxClient.js"></script>

   <!-- Example code -->
   <script type="text/javascript">
      // Program starts here. Creates a sample graph in the
      // DOM node with the specified ID. This function is invoked
      // from the onLoad event handler of the document (see below).
      
      var editor;
	  var graph;
	  var model;
      
      function main(container,outlineContainer,statusContainer)
      {
         // Checks if the browser is supported
         if (!mxClient.isBrowserSupported())
         {
            mxUtils.error('Browser is not supported!', 200, false);
         }
         else
         {
            // Creates the graph inside the given container
            editor = new mxEditor();
			graph = editor.graph;
			model = graph.model;

			// Disables some global features
			graph.setConnectable(true);
			graph.setCellsDisconnectable(false);
			graph.setCellsCloneable(false);
			graph.swimlaneNesting = false;
			graph.setCellsSelectable(false);

			mxConnectionHandler.prototype.connectImage = new mxImage('${pageContext.request.contextPath}/images/connector.gif', 16, 16);
			

			// Sets the graph container and configures the editor
			editor.setGraphContainer(container);


			var outln = new mxOutline(graph, outlineContainer);
			
			addToolbarButton(editor, statusContainer, 'zoomIn', '', '${pageContext.request.contextPath}/images/zoom_in.png', true);
			addToolbarButton(editor, statusContainer, 'zoomOut', '', '${pageContext.request.contextPath}/images/zoom_out.png', true);
			addToolbarButton(editor, statusContainer, 'actualSize', '', '${pageContext.request.contextPath}/images/view_1_1.png', true);
			addToolbarButton(editor, statusContainer, 'fit', '', '${pageContext.request.contextPath}/images/fit_to_size.png', true);

			// Displays useful hints in a small semi-transparent box.
			var hints = document.createElement('div');
			hints.style.position = 'absolute';
			hints.style.overflow = 'hidden';
			hints.style.width = '250px';
			hints.style.bottom = '56px';
			hints.style.height = '40px';
			hints.style.right = '20px';
			
			hints.style.background = 'black';
			hints.style.color = 'white';
			hints.style.fontFamily = 'Arial';
			hints.style.fontSize = '10px';
			hints.style.padding = '4px';

			mxUtils.setOpacity(hints, 50);
			
			mxUtils.writeln(hints, '- Duplo clique sobre a instância para inserir o nome');
			mxUtils.writeln(hints, '- Relacione as Instâncias');
			mxUtils.writeln(hints, '- O diagrama será criado automaticamente');

			// Adds child columns for new connections between tables
			graph.addEdge = function(edge, parent, source, target, index)
			{
				mxUtils.toString(edge);
				mxUtils.toString(parent);
				alert(source.value);
				alert(target.value);
				mxUtils.toString(index);
				
				return mxGraph.prototype.addEdge.apply(this, arguments); // "supercall"
				
			}
		

			
			
			document.body.appendChild(hints);
			//Contador de intancias
			var qtdInstanciasConjuntoA = 0;
			var qtdInstanciasConjuntoB = 0;
			var	xLeft = 50; 
			var	xRight = 300;
			var yLeft = 50;
			var yRight = 50;
			var height = 30;
			var widht = 80;

			var button = document.createElement('button');
			mxUtils.write(button, 'Criar uma Instância');
			mxEvent.addListener(button, 'click', function(evt)
			{
				graph.getModel().beginUpdate();
	            try
	            {
	               document.createElement('input type="text"');
	               var instancia1 = graph.insertVertex(parent, 'Instancia ' + qtdInstanciasConjuntoA, 'Instancia ' + qtdInstanciasConjuntoA, xLeft, yLeft, widht, height);
						               
	               qtdInstanciasConjuntoA++;
	               
	               yLeft = yLeft + 60;
	               
	            }
	            finally
	            {
	               // Updates the display
	               graph.getModel().endUpdate();
	            }

			});
			document.body.appendChild(button);

			var button = document.createElement('button');
			mxUtils.write(button, 'Criar uma Instância');
			mxEvent.addListener(button, 'click', function(evt)
			{
				graph.getModel().beginUpdate();
	            try
	            {
	               
	               var instancia1 = graph.insertVertex(parent, 'Instancia ' + qtdInstanciasConjuntoB, 'Instancia ' + qtdInstanciasConjuntoB, xRight, yRight, widht, height);
	               qtdInstanciasConjuntoB++;
	               yRight = yRight + 60;
	               
	            }
	            finally
	            {
	               // Updates the display
	               graph.getModel().endUpdate();
	            }

			});
			document.body.appendChild(button);
				

            // Enables rubberband selection
            new mxRubberband(graph);
            var layoutDefault = graph.stylesheet.getDefaultVertexStyle(); 
            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            var parent = graph.getDefaultParent();
            configureStylesheet(graph);
            
           
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

			style = graph.stylesheet.getDefaultEdgeStyle();
			style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
			style[mxConstants.STYLE_STROKEWIDTH] = '1';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
			

		}

	  function criarRelacionamento(){
		  graph.getModel().beginUpdate();
          try
          {
             var w = graph.container.offsetWidth;
             var parent = graph.getDefaultParent();
             var pessoa = graph.insertVertex(parent, 'Pessoa', 'Pessoa', w/2 - 30, 20, 80, 30);
          }
          finally
          {
             // Updates the display
             graph.getModel().endUpdate();
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
   </script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'),document.getElementById('outlineContainer'),document.getElementById('statusContainer'))">

   <!-- Creates a container for the graph with a grid wallpaper -->
   <div id="graphContainer"
      style="overflow:hidden;">
      
   </div>
   
   <!-- Creates a container for the outline -->
	<div id="outlineContainer"
		style="position:absolute;overflow:hidden;top:36px;right:0px;width:200px;height:140px;background:transparent;border-style:solid;border-color:black;">
			
	</div>
	
   <div id="statusContainer"
		style="text-align:right;position:absolute;overflow:hidden;bottom:0px;left:0px;max-height:24px;height:36px;right:0px;color:white;padding:6px;background-image:url('${pageContext.request.contextPath}/images/toolbar_bg.gif');">
		<div style="font-size:10pt;float:left;">
			Created with <a href="" target="_blank">mxGraph</a>
		</div>
	</div>
</body>
</html>
