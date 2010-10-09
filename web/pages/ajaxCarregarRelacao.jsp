<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript">

var w = graph.container.offsetWidth;

//Iniciando os valores do gráfico de instancia
xLeft = 60; 
xRight = 280;
yLeft = 20;
yRight = 20;
height = 30;
widht = 80;
qtdInstanciasConjuntoA = 1;
qtdInstanciasConjuntoB = 1;


function carregar(){
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
	graph.setAllowLoops(false);
	graph.setCellsResizable(false);

	var config = mxUtils.load(
	'comum/keyhandler-minimal.xml').
		getDocumentElement();
	editor.configure(config);

	graph.cellsMovable = false;

	// Edges are not editable
	graph.isCellEditable = function(cell)
	{
		return !this.model.isEdge(cell);
	};

	configureStylesheet(graph);

	graph.addEdge = function(edge, parent, source, target, index)
	{
		atualizarRelacionamento(source.value,target.value);
		return mxGraph.prototype.addEdge.apply(this, arguments); // "supercall"
	};

	graph.addListener(mxEvent.REMOVE_CELLS, function(sender, evt)
			{
				
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
						
						if(conjunto ==  mobi.CONJUNTO_A){
							classe = Ext.getCmp(mobi.CLASSEA).getValue();
						}else{
							classe = Ext.getCmp(mobi.CLASSEB).getValue();
						}
						eliminarInstancia(cell.value,classe);
					}
				}
			});

	// Text label changes will go into the name field of the user object
	graph.model.valueForCellChanged = function(cell, value)
	{
		//Não houve alteração no nome
  	if(cell.value == value){
			return;
  	}
		
		var conjunto = cell.id.substring(0,9);
		//Conjunto A
		if(conjunto == mobi.CONJUNTO_A){
			for (var name in instanciasConjuntoA){
				if(value == instanciasConjuntoA[name]){
					mxUtils.error('Já Existe uma instancia com este nome',200,true);
					return;
				}
				
				if(instanciasConjuntoA[name] == cell.value){
					editarInstancia(cell.value,value, mobi.CONJUNTO_A);
					instanciasConjuntoA[name] = value;
					cell.id = mobi.CONJUNTO_A+' ' + value;				
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
					editarInstancia(cell.value,value,mobi.CONJUNTO_B);
					instanciasConjuntoB[name] = value;
					cell.id = mobi.CONJUNTO_B+' '+ value;				
				}
			}
		}

		
		return mxGraphModel.prototype.valueForCellChanged.apply(this, arguments);
	}

	  // Enables rubberband selection
    new mxRubberband(graph);
	
	graph.getModel().beginUpdate();
	try
	{
		Ext.getCmp(mobi.CLASSEA).setValue('${relacao.classA.uri}');
		Ext.getCmp(mobi.CLASSEB).setValue('${relacao.classB.uri}');
		
		if('${relacao.type}' != 0){
			if('${relacao.type}'== mobi.INHERITANCE || '${relacao.type}' == mobi.EQUIVALENCE){
				Ext.getCmp('${relacao.type}').setValue(true);
			}else {
				Ext.getCmp(mobi.COMPOSITION).setValue(true);
			}
			
			<c:if test="${relacao.type == 1 || relacao.type == 5 || relacao.type == 2 }">
				Ext.getCmp('ida').setValue('${relacao.nameA}');
				Ext.getCmp('volta').setValue('${relacao.nameB}');
			</c:if>
			
			<c:if test="${relacao.type == 3}">
				Ext.getCmp('ida').setValue('${relacao.name}');
				Ext.getCmp('volta').setValue('${relacao.name}');
			</c:if>
		}

		<c:forEach var="instancia" items="${relacao.instanceRelationMapA}">
        	var idInstancia = mobi.CONJUNTO_A + ' ${instancia.key}';
        	criarCellVertex(graph, idInstancia, '${instancia.key}',xLeft, yLeft, widhtInstance, heightInstance, 'shape=cloud');
			instanciasConjuntoA[qtdInstanciasConjuntoA] = '${instancia.key}';
            qtdInstanciasConjuntoA++;
			yLeft += 60;
			
		</c:forEach>

		<c:forEach var="instancia" items="${relacao.instanceRelationMapB}">
			
			var idInstancia = mobi.CONJUNTO_B + ' ${instancia.key}';
			criarCellVertex(graph, idInstancia, '${instancia.key}', xRight, yRight, widhtInstance, heightInstance, 'shape=cloud');
			
			var nomeInstancia =	instanciasConjuntoB[qtdInstanciasConjuntoB] = '${instancia.key}';
            qtdInstanciasConjuntoB++;
			yRight += 60;
			
		</c:forEach>
		
		<c:forEach var="instancia" items="${relacao.instanceRelationMapA}">
		
			var intanciaA = model.getCell(mobi.CONJUNTO_A +' ${instancia.key}');

			<c:forEach var="relacionado" items="${instancia.value.allInstances}">
			
				var idInstancia = mobi.CONJUNTO_B + ' ${relacionado.key}';
				var intanciaB = model.getCell(idInstancia);
				graph.insertEdge(parent, intanciaA.value + intanciaB.value +'${relacao.type}' , '', intanciaA, intanciaB);

			</c:forEach>
	</c:forEach>

	}
	finally
	{
	   // Updates the display
	   graph.getModel().endUpdate();
	   
	}

}

</script>
<div id="graphContainer">

<script type="text/javascript">
	carregar('graphContainer');
</script>


</div>
