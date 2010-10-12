/* 
 * CONSTANTES JS 
 * 
 */
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

mobi.CONJUNTO_A = 'conja';
mobi.CONJUNTO_B = 'conjb';


mobi.colorRandom = function(){
	var pickRandom = Math.floor(Math.random()*10);

	var quote= []; 
    
	quote[0]='strokeColor= #4B8A08;fillColor=#4B8A08';
    quote[1]='strokeColor=#A9F5A9;fillColor=#A9F5A9';
    quote[2]='strokeColor=#D0A9F5;fillColor=#D0A9F5';   
    quote[3]='strokeColor=#7401DF;fillColor=#7401DF';
    quote[4]='strokeColor=#F5A9A9;fillColor=#F5A9A9';
    quote[5]='strokeColor=#FAAC58;fillColor=#FAAC58';
    quote[6]='strokeColor=#FE2E2E;fillColor=#FE2E2E';
    quote[7]='strokeColor=#AEB404;fillColor=#AEB404';
    quote[8]='strokeColor=#A4A4A4;fillColor=#A4A4A4';
    quote[9]='strokeColor=#0B3861;fillColor=#0B3861;fontColor=#FFFFFF';
    
    pick = quote[pickRandom];
    return isBeenUsed(pick) == true ? mobi.colorRandom() : pick ;
};

function mobiInstance(name, color){
	this.name = name;
	this.color = color;
}


function isBeenUsed(style){
	
	instances = instanceGraph.getChildCells();
	
	var isUsed = false;
	
	for(var i = 0 ; i < instances.length ; i++ ){
		if (instances[i].getStyle() == style){
			isUsed = true;
		}
	}
	
	return isUsed;
}

/*
 * FIM BLOCO CONSTANTES 
 */
/*
 * VARIAVEIS GLOBAIS JS 
 */
var editor;
var instanceGraph;
var model;
var parent;
var instanciasConjuntoA = new Array();
var instanciasConjuntoB = new Array();

mobi.Instance = function(name, style){
	this.name = name; 
	this.style = style;
}


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
var widhtInstance = 80;
var heightInstance = 50;

mxBasePath = 'comum/mxgraph';

/*
 * FIM BLOCO VARIAVIES GLOBAIS JS
 */



/*	
 * BEGIN - BLOCK  actions of the class 
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
	Ext.getCmp('tipoRelacao').reset();

	Ext.getCmp('fieldSetRadioGroup').remove('form');
	Ext.getCmp('fieldSetRadioGroup').doLayout();

	
}

function atualizarRelacionamento(instanciaA, instanciaB) {
	
	var params = { instanciaA : instanciaA , instanciaB : instanciaB};
	ajaxRequest('/EditorM-MOBI/ajaxAddRelacao.do', params);

}

function eliminarRelacionamento(instanciaA,instanciaB){
	var params = { instanciaA: instanciaA , instanciaB : instanciaB};
	
	ajaxRequest('/EditorM-MOBI/ajaxEliminarRelacionamento.do', params);
}

function eliminarInstancia(instancia,classe){
	var params = { idClasse : classe , instancia : instancia};
	
	ajaxRequest('/EditorM-MOBI/ajaxEliminarInstancia.do', params);
}


function criarCellVertex(graph, id, nome, x, y, width, height, style ){
	
	parent = graph.getDefaultParent();
	return graph.insertVertex(parent, id, nome, x, y, width, height, style);
}
/*
 * END BLOCK  actions of the class
 */

/*
 * BLOCO REQUISIÇÕES AJAX 
 */

function ajaxDivUpdate(div, action, params, callback){
	
	$.ajax({
		type: 'POST',
		url : action,
		data: params,
		success : function (data){ 
			$('#'+div).html(data);
			callback();
		}
	});
	
}

function ajaxRequest(action, params){
	
	$.ajax({
		type: 'POST',
		url : action,
		data : params
	});
}


function ajaxManipularDados(action, params, functions){
	$.ajax({
		type: 'POST',
		url : action,
		data: params,
		success: functions
	});
}


