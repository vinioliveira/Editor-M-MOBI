<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript">

var w = graph.container.offsetWidth;
var	xLeft = 20; 
var	xRight = 300;
var yLeft = 20;
var yRight = 20;
var height = 30;
var widht = 80;
var qtdInstanciasConjuntoA = 1;
var qtdInstanciasConjuntoB = 1;
var editor;
var graph;
var model;
var parent;

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
	}

	configureStylesheet(graph);

	graph.addEdge = function(edge, parent, source, target, index)
	{
		atualizarRelacionamento(source.value,target.value);
		return mxGraph.prototype.addEdge.apply(this, arguments); // "supercall"
	}

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
						
						if(conjunto == 'ConjuntoA'){
							classe = Ext.getCmp("classeA").getValue();
						}else{
							classe = Ext.getCmp("classeB").getValue();
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

	  // Enables rubberband selection
    new mxRubberband(graph);
	
	graph.getModel().beginUpdate();
	try
	{
		Ext.getCmp("classeA").setValue('${relacao.classeA}');
		Ext.getCmp("classeB").setValue('${relacao.classeB}');
		Ext.getCmp("tipoRelacao").setValue('${relacao.tipoRelacao}');

		<c:forEach var="instancia" items="${relacao.instanciasA}">
		
        	var idInstancia = 'ConjuntoA ' + '${instancia}';
			graph.insertVertex(parent, idInstancia, '${instancia}', xLeft, yLeft, 80, 30);
			instanciasConjuntoA[qtdInstanciasConjuntoA] = '${instancia}';
            qtdInstanciasConjuntoA++;
			yLeft += 40;
			
		</c:forEach>

		<c:forEach var="instancia" items="${relacao.instanciasB}">
			
			var idInstancia = 'ConjuntoB ' + '${instancia}';
			graph.insertVertex(parent, idInstancia, '${instancia}', xRight, yRight, 80, 30);
			var nomeInstancia = 
			instanciasConjuntoB[qtdInstanciasConjuntoB] = '${instancia}';
            qtdInstanciasConjuntoB++;
			yRight += 40;
			
		</c:forEach>

		<c:forEach var="instancia" items="${relacao.relacionamentosInstancias}">
			var intanciaA = model.getCell('${instancia.key}');
			<c:forEach var="teste" items="${instancia.value}">
				var idInstancia = 'ConjuntoB ' + '${teste}';
				var intanciaB = model.getCell(idInstancia);
				graph.insertEdge(parent, intanciaA.value + '->' + intanciaB.value, '', intanciaA, intanciaB);
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
