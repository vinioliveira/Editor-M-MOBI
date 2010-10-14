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

mobi.colorRandom = function(nameInstancia){
	
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

    var isValid = false;
    var pick = null; 
    
    
    for(var i=0 ; i < instanciasConjuntoB.length; i++){
    	if(instanciasConjuntoB[i].name == nameInstancia){
    		pick= instanciasConjuntoB[i].style;
    		isValid = true;
    	}
    }

    for(var i=0 ; i < instanciasConjuntoA.length; i++){
    	if(instanciasConjuntoA[i].name == nameInstancia){
    		pick= instanciasConjuntoA[i].style;
    		isValid = true;
    	}
    }
    	
    pick = pick == null ? quote[pickRandom]: pick;
    
    return isBeenUsed(pick) ?  
    		isValid ? pick : mobi.colorRandom()
    				: pick ;
};

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


function atualizarNomeInstancia(nomeAntigo, nomeNovo){
	
	var params = { nomeAntigo : nomeAntigo , nomeNovo : nomeNovo}; 
	ajaxRequest('/EditorM-MOBI/ajaxEditarNomeInstancia.do', params);
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


/*
 * FIM BLOCO REQUISIÇÕES AJAX 
 */

/*
 * FUNCOES MXGRAPH   
 */

function atualizacaoLabelRotina(cell, value){
	
	var valide = true;
	
	//If do not was change
  	if(cell.value == value){
			return;
  	}
	
	var conjunto = cell.id.substring(0,5);
	//Conjunto (Classe) A
	if(conjunto == mobi.CONJUNTO_A){
		
		//Validação da cor Existente da Instancia no outro conjunto
		var temOutro = false;
		var hadChanged = false;
		for (i =0; i < instanciasConjuntoB.length ; i++){
			if(instanciasConjuntoB[i].style == cell.getStyle()){
				hadChanged = true;
			}
			if(value == instanciasConjuntoB[i].name){
				cell.setStyle(instanciasConjuntoB[i].style);
				 temOutro = true;
			}
		}
		if(!temOutro && hadChanged){
			cell.setStyle(mobi.colorRandom());
		}
	
		// Validação do nome Existente no mesmo conjunto
		for (i =0; i < instanciasConjuntoA.length ; i++){
			
			if(value == instanciasConjuntoA[i].name){
		        Ext.MessageBox.show({
		           title: 'Erro',
		           msg: 'Já Existe uma instancia com este nome para essa Classe.',
		           buttons: Ext.MessageBox.ERROR,
		           icon: Ext.MessageBox.ERROR
		        });
		        valide = false;
			}
			
			if(cell.value == instanciasConjuntoA[i].name){
				atualizarNomeInstancia(cell.value, value);
				instanciasConjuntoA[i].name = value;
				instanciasConjuntoA[i].style = cell.getStyle();
				cell.id = mobi.CONJUNTO_A+' ' + value;

			}
		}
	}else{
		//Conjunto (Classe) B
		
		//Validação da cor Existente da Instancia no outro conjunto
		var temOutro = false;
		var hadChanged = false;
		for (var i =0; i < instanciasConjuntoA.length ; i++){
			if(instanciasConjuntoA[i].style == cell.getStyle()){
				hadChanged = true;
			}
			if(value == instanciasConjuntoA[i].name){
				cell.setStyle(instanciasConjuntoA[i].style);
				 temOutro = true;
			}
		}
		if(!temOutro && hadChanged){
			cell.setStyle(mobi.colorRandom());
		}

		// Validação do nome Existente no mesmo conjunto
		for (var i =0; i < instanciasConjuntoB.length; i++ ){
			if(value == instanciasConjuntoB[i].name){
				Ext.MessageBox.show({
			           title: 'Erro',
			           msg: 'Já Existe uma instancia com este nome para essa Classe.',
			           buttons: Ext.MessageBox.ERROR,
			           icon: Ext.MessageBox.ERROR
			       });
				valide = false;
			}
			if(instanciasConjuntoB[i].name == cell.value){
				atualizarNomeInstancia(cell.value, value);
				instanciasConjuntoB[i].name = value;
				instanciasConjuntoB[i].style = cell.getStyle();
				cell.id = mobi.CONJUNTO_B+' ' + value;
				
			}
		}
	}

	valide ? instanceGraph.refresh() : null;
	return valide;
	
}


function removerRelacionamentos(cell){

	for (var i = 0; i < cells.length; i++){
		
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
}