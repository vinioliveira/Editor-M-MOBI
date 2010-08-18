<html>
<head>
   <title>Prototipo Editor M-MOBI</title>

   <!-- Sets the basepath for the library if not in same directory -->
   <!-- Sets the basepath for the library if not in same directory -->
   <script type="text/javascript">
      mxBasePath = '/dev/comum/js/';
   </script>

   <!-- Loads and initializes the library -->
   <script type="text/javascript" src="/dev/comum/js/mxClient.js"></script>

   <!-- Example code -->
   <script type="text/javascript">
      // Program starts here. Creates a sample graph in the
      // DOM node with the specified ID. This function is invoked
      // from the onLoad event handler of the document (see below).
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
            var editor = new mxEditor();
			var graph = editor.graph;
			var model = graph.model;

			// Disables some global features
			graph.setConnectable(true);
			graph.setCellsDisconnectable(false);
			graph.setCellsCloneable(false);
			graph.swimlaneNesting = false;
			

			// Sets the graph container and configures the editor
			editor.setGraphContainer(container);

			var outln = new mxOutline(graph, outlineContainer);
			
			addToolbarButton(editor, statusContainer, 'zoomIn', '', '/dev/images/zoom_in.png', true);
			addToolbarButton(editor, statusContainer, 'zoomOut', '', '/dev/images/zoom_out.png', true);
			addToolbarButton(editor, statusContainer, 'actualSize', '', '/dev/images/view_1_1.png', true);
			addToolbarButton(editor, statusContainer, 'fit', '', '/dev/images/fit_to_size.png', true);
				
				

            // Enables rubberband selection
            new mxRubberband(graph);
            var layoutDefault = graph.stylesheet.getDefaultVertexStyle(); 
            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            var parent = graph.getDefaultParent();
            configureStylesheet(graph);
            // Adds cells to the model in a single step
            graph.getModel().beginUpdate();
            try
            {
               var w = graph.container.offsetWidth;

               //1º nivel
               var pessoa = graph.insertVertex(parent, 'Pessoa', 'Pessoa', w/2 - 30, 20, 80, 30);
               //2º nivel
               var pessoaj = graph.insertVertex(parent, 'PessoaJ', 'PessoaJ', w/2 - 80, 100, 80, 30);
               var pessoaf = graph.insertVertex(parent, 'PessoaF', 'PessoaF', w/2 + 20, 100, 80, 30);
               //3º nivel
               var aluno = graph.insertVertex(parent, 'Aluno', 'Aluno', w/2 - 40, 180, 80, 30);
               var professor = graph.insertVertex(parent, 'Professor', 'Professor', w/2 + 80, 180, 80, 30);
               //4º nivel
               var alunoprofessor = graph.insertVertex(parent, 'AlunoProfessor', 'AlunoProfessor', w/2 + 20, 260, 80, 30);

               var discente = graph.insertVertex(parent, 'Discente', 'Discente',w/2 - 180, 20, 80, 30);

               var universidade = graph.insertVertex(parent, 'Universidade', 'Universidade',w/2 - 100, 260, 80, 30);

               var turma = graph.insertVertex(parent, 'Turma', 'Turma',w/2 - 260, 260, 80, 30);

               var array = new Array();
               array[0] = discente;
               array[1] = aluno;
               graph.alignCells(mxConstants.ALIGN_BOTTOM,array);

               

               graph.insertEdge(parent, null, '', pessoaf, pessoa);
               graph.insertEdge(parent, null, '', pessoaj, pessoa);
               graph.insertEdge(parent, null, '', aluno, pessoaf );
               graph.insertEdge(parent, null, '', professor, pessoaf );
               graph.insertEdge(parent, null, '', alunoprofessor, aluno );
               graph.insertEdge(parent, null, '', alunoprofessor, professor );
               graph.insertEdge(parent, null, '', discente,aluno,mxConstants.EDGESTYLE_TOPTOBOTTOM);
               graph.insertEdge(parent, null, '', universidade,pessoaj);
               graph.insertEdge(parent, null, 'Pertence a(1,1)->\n<-tem(1,n)', universidade,turma,mxConstants.EDGESTYLE_TOPTOBOTTOM);
               
               
               
            }
            finally
            {
               // Updates the display
               graph.getModel().endUpdate();
            }
         }
      }

      function configureStylesheet(graph)
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
		style="text-align:right;position:absolute;overflow:hidden;bottom:0px;left:0px;max-height:24px;height:36px;right:0px;color:white;padding:6px;background-image:url('/dev/images/toolbar_bg.gif');">
		<div style="font-size:10pt;float:left;">
			Created with <a href="http://www.mxgraph.com" target="_blank">mxGraph</a>
		</div>
	</div>
</body>
</html>
