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
	
	Ext.getCmp(mobi.CLASSEA).setValue('');
	Ext.getCmp(mobi.CLASSEB).setValue('');

	Ext.getCmp('fieldSetRadioGroup').remove('form');
	Ext.getCmp('fieldSetRadioGroup').doLayout();
	
	instanciasConjuntoA = new Array();
	instanciasConjuntoB = new Array();
	
	mobi.RELATION = new Relation();
	
	ajaxRequest('/EditorM-MOBI/cleanRelation.do');
	
	disabledAll();
	
	carregarStore();
	Ext.getCmp(mobi.CLASSEA).getStore().loadData(mobi.classes, false);
	Ext.getCmp(mobi.CLASSEB).getStore().loadData(mobi.classes, false);
	Ext.getCmp('tipoRelacao').reset();	
}

function atualizarRelacionamento(instanciaA, instanciaB) {
	
	var params = { instanciaA : instanciaA , instanciaB : instanciaB};
	ajaxRequest('/EditorM-MOBI/ajaxAddRelacao.do', params);

}

function eliminarRelacionamento(instanciaA,instanciaB){
	var params = { instanciaA: instanciaA , instanciaB : instanciaB};
	
	ajaxRequest('/EditorM-MOBI/ajaxEliminarRelacionamento.do', params);
}

function eliminarInstancia(instancia,conjunto){
	var params = { conjunto : conjunto , instancia : instancia};
	ajaxDivUpdate('relaco-div','/EditorM-MOBI/ajaxEliminarInstancia.do', params, function(){});
}


function criarCellVertex(graph, id, nome, x, y, width, height, style ){
	
	var parent = graph.getDefaultParent();
	/*var model = umlGraph.model;
	var vertex = model2.getCell(id);
	
	if(vertex == null || id == 'Novo'){*/
		return graph.insertVertex(parent, id, nome, x, y, width, height, style);
//	}
//	
//	return vertex; 
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


function ajaxManipularDados(action, params){
	
	$.ajax({
		type: 'POST',
		url : action,
		data: params
	//	complete: functions
	});
	
	
}


/*
 * FIM BLOCO REQUISIÇÕES AJAX 
 */

/*
 * FUNCOES MXGRAPH   
 */

function getCellGraph(graph, cellId){
	
	var listOfCells = graph.getChildCells();
	
	for(var i=0; i < listOfCells.length; i++){
		if(listOfCells[i].getId() == cellId){
			return listOfCells[i]; 
		}
	}
	return null;
}

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

	validarRelacionamentos();
	valide ? instanceGraph.refresh() : null;
	return valide;
	
}


function removerRelacionamentos(cells){

	for (var i = 0; i < cells.length; i++){
		
		var cell = cells[i];
		if (this.model.isEdge(cell))
		{
			eliminarRelacionamento(cell.source.value,cell.target.value);
			mobi.RELATION.removeRelacaoInstancia(cell.source.value,cell.target.value);
			this.model.remove(cell);
			
		}else{
			var conjunto = cell.id.substring(0,5);
			eliminarInstancia(cell.value,conjunto);
			instanciasConjuntoA = new Array();
			instanciasConjuntoB = new Array();
			mobi.RELATION.instanciasA = instanciasConjuntoA;
			mobi.RELATION.instanciasB = instanciasConjuntoB;
		}
	}
	
	validarRelacionamentos();
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
};

function validarRelacionamentos(){
	inferenciaRelacao();
	disabledAll()
	if(mobi.RELATION.type.length == 0){
		//Desabilitar também

	}else{
		if(mobi.RELATION.type.length == 1){
			removerFieldTextDaComposicao('fieldSetRadioGroup');
			Ext.getCmp(mobi.RELATION.type[0]).setDisabled(false);
			Ext.getCmp(mobi.RELATION.type[0]).setValue(true);
		}else{
			
			for(var i=0; i< mobi.RELATION.type.length; i++){
				Ext.getCmp(mobi.RELATION.type[i]).setDisabled(false);
			}
		}
	}
}

function disabledAll(){
	
	Ext.getCmp(mobi.COMPOSITION).setDisabled(true);
	Ext.getCmp(mobi.EQUIVALENCE).setDisabled(true);
	Ext.getCmp(mobi.INHERITANCE).setDisabled(true);
	Ext.getCmp(mobi.INHERITANCE).setValue(false);
	Ext.getCmp(mobi.EQUIVALENCE).setValue(false);
	Ext.getCmp(mobi.COMPOSITION).setValue(false);
	removerFieldTextDaComposicao('fieldSetRadioGroup');
}

function adcionarFieldTextDaComposicao(){
	
	var ida =  new Ext.form.TextField({
    	id : 'ida',
    	fieldLabel : 'Ida',
		listeners : {
			change : function (text,newValue,oldValue){
				volta = Ext.getCmp('volta').getValue();
				mobi.RELATION.nomeA = newValue;
				detectorTipoComposicao(newValue, volta, 'label-type', mobi.COMPOSITION);
				}
			}
    });
	
	var volta =  new Ext.form.TextField({
    	id : 'volta',
    	fieldLabel : 'Volta',
		listeners : {
			change : function (text,newValue,oldValue){
					ida = Ext.getCmp('ida').getValue();
					mobi.RELATION.nomeB = newValue;
					detectorTipoComposicao(ida , newValue, 'label-type', mobi.COMPOSITION);
					}
				}
    });
	
	var label = new Ext.form.Label({
		id: 'label-type',
		text: '',
		  style: {
				width: '50px' 
			}
	});
	
	var fp = new Ext.FormPanel({
				id: 'form',
				bodyBorder : false,
				items: [ida,volta,label]
	});
	
	Ext.getCmp('fieldSetRadioGroup').add(fp);
	Ext.getCmp('fieldSetRadioGroup').doLayout();
	
}

function removerFieldTextDaComposicao(componete){
	
	Ext.getCmp('fieldSetRadioGroup').remove('form');
	Ext.getCmp('fieldSetRadioGroup').doLayout();
	
}