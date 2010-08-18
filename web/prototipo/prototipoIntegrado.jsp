<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>

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
   <script type="text/javascript" src="${pageContext.request.contextPath}/comum/js/prototype.js"></script>

   <!-- Example code -->
   <script type="text/javascript">
      // Program starts here. Creates a sample graph in the
      // DOM node with the specified ID. This function is invoked
      // from the onLoad event handler of the document (see below).
      var editor;
	  var graph;
	  var model;
	  var parent;
	  var instanciasConjuntoA = new Array();
	  var instanciasConjuntoB = new Array();
      
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

				atualizarRelacionamento(source.value,target.value);
				return mxGraph.prototype.addEdge.apply(this, arguments); // "supercall"
			}
			
			document.body.appendChild(hints);
			//Contador de intancias
			var qtdInstanciasConjuntoA = 0;
			var qtdInstanciasConjuntoB = 0;
			var qtdClasses = 0;
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
				if(qtdInstanciasConjuntoA < 5)
				{
					graph.getModel().beginUpdate();
		            try
		            {
		               var nomeInstancia = 'Instancia ' + qtdInstanciasConjuntoA;
		               var idInstancia = 'ConjuntoA ' + nomeInstancia;
		               var nameClass = '';
		               var instancia1 = graph.insertVertex(parent, idInstancia, nomeInstancia, xLeft, yLeft, widht, height);

		               if(qtdInstanciasConjuntoA == 0){
		            	   nameClass = 'Classe ' + qtdClasses;
		            	   graph.insertVertex(parent, 'ConjuntoA Classe' + qtdClasses, 'Classe ' + qtdClasses, xLeft, 360, widht, height);
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


			});
			document.body.appendChild(button);

			var button = document.createElement('button');
			mxUtils.write(button, 'Criar uma Instância');
			mxEvent.addListener(button, 'click', function(evt)
			{
				
				if(qtdInstanciasConjuntoB < 5)
				{
					graph.getModel().beginUpdate();
		            try
		            {

			           var nomeInstancia = 'Instancia ' + qtdInstanciasConjuntoB;
			           var idInstancia = 'ConjuntoB ' + nomeInstancia;
			           var nameClass = '';
		               var instancia1 = graph.insertVertex(parent, idInstancia, nomeInstancia, xRight, yRight, widht, height);

		               if(qtdInstanciasConjuntoB == 0){
			               nameClass = 'Classe ' + qtdClasses;
		            	   graph.insertVertex(parent, 'ConjuntoB Classe' + qtdClasses, nameClass, xRight, 360, widht, height);
		            	   qtdClasses++;			               
		               }
		               
		               instanciasConjuntoB[qtdInstanciasConjuntoB] = nomeInstancia;
		               qtdInstanciasConjuntoB++;
		               adcionarUmaInstancia(nomeInstancia,'ConjuntoB',nameClass);
		               yRight = yRight + 60;
		               
		            }
		            finally
		            {
		               // Updates the display
		               graph.getModel().endUpdate();
		            }
						
				}
				
			});
			document.body.appendChild(button);
				

            // Enables rubberband selection
            new mxRubberband(graph);
            var layoutDefault = graph.stylesheet.getDefaultVertexStyle(); 
            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            parent = graph.getDefaultParent();
            configureStylesheet(graph);

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

      function atualizarRelacionamento(instanciaA, instanciaB) {
    		var params = 'instanciaA=' + instanciaA + '&' + 'instanciaB=' + instanciaB;
    		new Ajax.Updater('graphContainerDiagrama', '${pageContext.request.contextPath}/ajaxDiagrama.do', 
    				{
    					method: 'get',
    					parameters:params,
    					evalScripts : true
    				});

      }

      function mainDiagrama(){
    	    var container2 = document.getElementById('teste');
    	    // Creates the graph inside the given container
            var editor2 = new mxEditor();
			var graph2 = editor2.graph;
			var model2 = graph2.model;
			var parent2 = graph2.getDefaultParent();
			configureStylesheetDiagrama(graph2);
			editor2.setGraphContainer(container2);

			  // Enables rubberband selection
            new mxRubberband(graph2);
			
			graph2.getModel().beginUpdate();
    		try
    		{
    			 var w = graph2.container.offsetWidth;

                 //1º nivel
                 var pessoa = graph2.insertVertex(parent2, 'Pessoa', 'Pessoa', w/2 - 30, 20, 80, 30);
                 //2º nivel
                 var pessoaj = graph2.insertVertex(parent2, 'PessoaJ', 'PessoaJ', w/2 - 80, 100, 80, 30);
                 var pessoaf = graph2.insertVertex(parent2, 'PessoaF', 'PessoaF', w/2 + 20, 100, 80, 30);
                 //3º nivel
                 var aluno = graph2.insertVertex(parent2, 'Aluno', 'Aluno', w/2 - 40, 180, 80, 30);
                 var professor = graph2.insertVertex(parent2, 'Professor', 'Professor', w/2 + 80, 180, 80, 30);
                 //4º nivel
                 var alunoprofessor = graph2.insertVertex(parent2, 'AlunoProfessor', 'AlunoProfessor', w/2 + 20, 260, 80, 30);

                 var discente = graph2.insertVertex(parent2, 'Discente', 'Discente',w/2 - 180, 20, 80, 30);

                 var universidade = graph2.insertVertex(parent2, 'Universidade', 'Universidade',w/2 - 100, 260, 80, 30);

                 var turma = graph2.insertVertex(parent2, 'Turma', 'Turma',w/2 - 260, 260, 80, 30);

                 var array = new Array();
                 array[0] = discente;
                 array[1] = aluno;
                 graph2.alignCells(mxConstants.ALIGN_BOTTOM,array);

                 

                 graph2.insertEdge(parent2, null, '', pessoaf, pessoa);
                 graph2.insertEdge(parent2, null, '', pessoaj, pessoa);
                 graph2.insertEdge(parent2, null, '', aluno, pessoaf );
                 graph2.insertEdge(parent2, null, '', professor, pessoaf );
                 graph2.insertEdge(parent2, null, '', alunoprofessor, aluno );
                 graph2.insertEdge(parent2, null, '', alunoprofessor, professor );
                 graph2.insertEdge(parent2, null, '', discente,aluno,mxConstants.EDGESTYLE_TOPTOBOTTOM);
                 graph2.insertEdge(parent2, null, '', universidade,pessoaj);
                 graph2.insertEdge(parent2, null, 'Pertence a(1,1)->\n<-tem(1,n)', universidade,turma,mxConstants.EDGESTYLE_TOPTOBOTTOM);
    		   
    		}
    		finally
    		{
    		   // Updates the display
    		   graph2.getModel().endUpdate();
    		}

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
			 
			var myAjax = new Ajax.Request('${pageContext.request.contextPath}/ajaxAddInstancia.do', {
				method : 'get',
				parameters : params
			});
		}

		function editarInstancia(nomeAntigo,nomeNovo,conjunto){
			var params = 'nomeAntigo=' + nomeAntigo + '&nomeNovo=' + nomeNovo + '&conjunto=' + conjunto;

			var myAjax = new Ajax.Request('${pageContext.request.contextPath}/ajaxEditarInstancia.do', {
				method : 'get',
				parameters : params
			});
			
		}

		
   </script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'),document.getElementById('outlineContainer'),document.getElementById('statusContainer'))">
	  <!-- Creates a container for the graph with a grid wallpaper -->
   <div id="graphContainer" style="position:absolute;overflow:hidden;top:36px;left:5px;bottom:36px;right:750px;">
   	</div>
   
   <div id="graphContainerDiagrama"
		style="position:absolute;overflow:hidden;top:36px;left:500px;bottom:36px;right:0px;">
   </div>
   
   <div id="statusContainer"
		style="text-align:right;position:absolute;overflow:hidden;bottom:0px;left:0px;max-height:24px;height:36px;right:0px;color:white;padding:6px;background-image:url('${pageContext.request.contextPath}/images/toolbar_bg.gif');">
		<div style="font-size:10pt;float:left;">
			Created with <a href="http://www.mxgraph.com" target="_blank">mxGraph</a>
		</div>
	</div>
 
</body>
</html>
