function mobi(){}

mobi.classes = [];
mobi.GENERIC_RELATION = 0;
mobi.BIDIRECIONAL_COMPOSITION = 1;
mobi.BIDIRECIONAL_COMPOSITION_HAS_BELONGS_TO = 2;
mobi.SYMMETRIC_COMPOSITION = 3;
mobi.INHERITANCE = 4;
mobi.UNIDIRECIONAL_COMPOSITION = 5;
mobi.EQUIVALENCE = 6;
mobi.COMPOSITION = 7;


mobi.CLASSEA = 'classeA';
mobi.CLASSEB = 'classeB';

var editor;
var graph;
var model;
var parent;
var instanciasConjuntoA = new Array();
var instanciasConjuntoB = new Array();

//Contador de intancias
var qtdInstanciasConjuntoA = 1;
var qtdInstanciasConjuntoB = 1;
var qtdClasses = 0;

var	xLeft = 60; 
var yLeft = 10;

var	xRight = 280;
var yRight = 10;

//tamanho caixas diagrama
var height = 30;
var widht = 80;

//tamanho nuvens instancias
var widhtInstance = 70;
var heightInstance = 50;

mxBasePath = 'comum/mxgraph';


function atualizarRelacionamento(instanciaA, instanciaB) {
	
	var params = { instanciaA : instanciaA , instanciaB : instanciaB};
	ajaxRequest('/EditorM-MOBI/ajaxAddRelacao.do', params);

}


/*	
 * BEGIN - Block of actions from the class 
 */

function adcionarUmaInstancia(nomeInstancia,conjunto,nameClass){
	
	var params = { nomeIstancia : nomeInstancia , conjunto : conjunto};
	
	if(nameClass != ''){
		params['nameClass']=  nameClass ;
	}

	ajaxRequest('/EditorM-MOBI/ajaxAddInstancia.do', params);

}

function editarInstancia(nomeAntigo,nomeNovo,conjunto){
	
	var params = {nomeAntigo : nomeAntigo, nomeNovo :nomeNovo, conjunto : conjunto};
	
	ajaxRequest('/EditorM-MOBI/ajaxAddInstancia.do', params);
	
}

function resetarRelacoes(){
	
	editor.destroy();
	main();
	//Contador de intancias
	xLeft = 60;  
	yLeft = 20;
	
	yRight = 20;
	xRight = 280;

	height = 30;
	widht = 80;
	
	qtdInstanciasConjuntoA = 1;
	qtdInstanciasConjuntoB = 1;

	carregarStore();
	
	Ext.getCmp(mobi.CLASSEA).setValue('');
	Ext.getCmp(mobi.CLASSEB).setValue('');
	Ext.getCmp(mobi.CLASSEA).getStore().loadData(mobi.classes, false);
	Ext.getCmp(mobi.CLASSEB).getStore().loadData(mobi.classes, false);

	Ext.getCmp('fieldSetRadioGroup').remove('form');
	Ext.getCmp('fieldSetRadioGroup').doLayout();

	
}

function eliminarRelacionamento(instanciaA,instanciaB){
	var params = { instanciaA: instanciaA , instanciaB : instanciaB};
	
	ajaxRequest('/EditorM-MOBI/ajaxEliminarRelacionamento.do', params);
}

function eliminarInstancia(instancia,classe){
	var params = { idClasse : classe , instancia : instancia};
	
	ajaxRequest('/EditorM-MOBI/ajaxEliminarInstancia.do', params);
}


function criarCellVertex(graph, id, nome, x, y, width, height, shape ){
	
	parent = graph.getDefaultParent();
	return graph.insertVertex(parent, id, nome, x, y, width, height, shape);
}

