<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript">

var w = instanceGraph.container.offsetWidth;

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
	instanceGraph = editor.graph;
	model = instanceGraph.model;
	parent = instanceGraph.getDefaultParent();
	editor.setGraphContainer(container);

	instanceGraph.setConnectable(true);
	instanceGraph.setCellsDisconnectable(false);
	instanceGraph.swimlaneNesting = false;
	instanceGraph.setCellsSelectable(true);
	instanceGraph.setAllowLoops(false);
	instanceGraph.setCellsResizable(false);

	var config = mxUtils.load(
	'comum/keyhandler-minimal.xml').
		getDocumentElement();
	editor.configure(config);

	instanceGraph.cellsMovable = false;

	// Edges are not editable
	instanceGraph.isCellEditable = function(cell)
	{
		return !this.model.isEdge(cell);
	};

	configureStylesheet(instanceGraph);

	instanceGraph.addEdge = function(edge, parent, source, target, index){
		if(target != null ){
			atualizarRelacionamento(source.value,target.value);
			return mxGraph.prototype.addEdge.apply(this, arguments); // "supercall"
		}
	};

	instanceGraph.panningHandler.factoryMethod = function(menu, cell, evt)
	{
		return createPopupMenu(instanceGraph, menu, cell, evt);
	};
	
	instanceGraph.addListener(mxEvent.REMOVE_CELLS, function(sender, evt){
				var cells = evt.getArgAt(0);
				removerRelacionamentos(cells);});

	
	// Text label changes will go into the name field of the user object
	instanceGraph.model.valueForCellChanged = function(cell, value){

		if(atualizacaoLabelRotina(cell, value)){		
			return mxGraphModel.prototype.valueForCellChanged.apply(this, arguments);
		}
	}

	  // Enables rubberband selection
    new mxRubberband(instanceGraph);
	
	instanceGraph.getModel().beginUpdate();
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
        	var vertexA = criarCellVertex(instanceGraph, idInstancia, '${instancia.key}',xLeft, yLeft, widhtInstance, heightInstance, mobi.colorRandom('${instancia.key}'));
        	instanciasConjuntoA[qtdInstanciasConjuntoA-1]= new mobi.Instance('${instancia.key}' , vertexA.getStyle());

            qtdInstanciasConjuntoA++;
			yLeft += 60;
			
		</c:forEach>

		<c:forEach var="instancia" items="${relacao.instanceRelationMapB}">
			
			var idInstancia = mobi.CONJUNTO_B + ' ${instancia.key}';
			var vertexB = criarCellVertex(instanceGraph, idInstancia, '${instancia.key}', xRight, yRight, widhtInstance, heightInstance,mobi.colorRandom('${instancia.key}'));
			var nomeInstancia =	instanciasConjuntoB[qtdInstanciasConjuntoB-1]= new mobi.Instance('${instancia.key}', vertexB.getStyle());
            qtdInstanciasConjuntoB++;
			yRight += 60;
			
		</c:forEach>
		
		<c:forEach var="instancia" items="${relacao.instanceRelationMapA}">
		
			var intanciaA = model.getCell(mobi.CONJUNTO_A +' ${instancia.key}');

			<c:forEach var="relacionado" items="${instancia.value.allInstances}">
			
				var idInstancia = mobi.CONJUNTO_B + ' ${relacionado.key}';
				var intanciaB = model.getCell(idInstancia);
				instanceGraph.insertEdge(parent, intanciaA.value + intanciaB.value +'${relacao.type}' , '', intanciaA, intanciaB);

			</c:forEach>
	</c:forEach>

	}
	finally
	{
	   // Updates the display
	   instanceGraph.getModel().endUpdate();
	   
	}

}

</script>
<div id="graphContainer">

<script type="text/javascript">
	carregar('graphContainer');
</script>


</div>
