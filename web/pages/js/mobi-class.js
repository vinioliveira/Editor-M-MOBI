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

/* 
 * CLASSES MOBI JS
 */


Relation = function(){
	
	this.instanciasA = instanciasConjuntoA;
	this.instanciasB = instanciasConjuntoB;
	
	this.classeA = 'ClasseA';
	this.classeB = 'ClasseB';
	
	this.nomeA = '';
	this.nomeB = '';
	
	this.type = new Array();
	
	this.haveSomeRelation = function(conjunto){
		for(var i=0; i < conjunto.length ; i ++){
			if(conjunto[i].relacoes.length > 0){
				return true;
			}
		}
		return false;
	};
	
	this.removeRelacaoInstancia = function(source, target){
		//Validação dos lados que podem está invertido source ser B e não A e vice-versa
		for(var i=0;i< this.instanciasA.length;i++){
			if(this.instanciasA[i].name == source){
				for(var x=0;x< this.instanciasB.length;x++){
					if(this.instanciasB[x].name == target){
						this.instanciasA[i].relacoes.remove(x);
						return;
					}
				}
			}
			if(this.instanciasA[i].name == target){
				for(var x=0;x< this.instanciasB.length;x++){
					if(this.instanciasB[x].name == source){
						this.instanciasA[i].relacoes.remove(x);
						return;
					}
				}
			}
		}
	};
	
	this.addRelacaoInstancia = function(source, target){
		//Validação dos lados que podem está invertido source ser B e não A e vice-versa
		for(var i=0;i< this.instanciasA.length;i++){
			if(this.instanciasA[i].name == source){
				for(var x=0;x< this.instanciasB.length;x++){
					if(this.instanciasB[x].name == target){
						this.instanciasA[i].relacoes.push(x);
						return;
					}
				}
			}
			if(this.instanciasA[i].name == target){
				for(var x=0;x< this.instanciasB.length;x++){
					if(this.instanciasB[x].name == source){
						this.instanciasA[i].relacoes.push(x);
						return;
					}
				}
			}
		}
	};
	
};

mobi.RELATION = new Relation();

function inferenciaRelacao(){
	
	//Limpando as relaçõeantigas
	mobi.RELATION.type = new Array();
	
	
	this.PREMISSA_INICIAL = true;
	this.PREMISSA_HERANCA = true;
	this.PREMISSA_EQUIVALENCIA = true;
	this.PREMISSA_COMPOSICAO = true;
	
	//validação primeira premissa 
	
	this.PREMISSA_INICIAL = mobi.RELATION.classeA != null ? true : false;
	this.PREMISSA_INICIAL = mobi.RELATION.classeB != null ? true : false;
	this.PREMISSA_INICIAL = mobi.RELATION.haveSomeRelation(mobi.RELATION.instanciasA);
	
	if(this.PREMISSA_INICIAL){
		
		//Validação Heranca 
		this.PREMISSA_HERANCA = mobi.RELATION.classeA != mobi.RELATION.classeB ? true : false;
		this.PREMISSA_HERANCA = instanciasIguais();
		this.PREMISSA_HERANCA = instanciasRelacionadas();

		//Validação Equivalencia
		this.PREMISSA_EQUIVALENCIA = mobi.RELATION.classeA != mobi.RELATION.classeB ? true : false;
		this.PREMISSA_EQUIVALENCIA = mobi.RELATION.instanciasA.length == mobi.RELATION.instanciasB.length ? true : false;
		this.PREMISSA_EQUIVALENCIA = associacaoEquivalencia();
		
		this.PREMISSA_COMPOSICAO = instanciasRelacionadasDiferentes();
		
		if(this.PREMISSA_HERANCA){
			mobi.RELATION.type.push(mobi.INHERITANCE);
		}
		if(this.PREMISSA_EQUIVALENCIA){
			mobi.RELATION.type.push(mobi.EQUIVALENCE);
		}
		
		if(this.PREMISSA_COMPOSICAO){
			mobi.RELATION.type.push(mobi.COMPOSITION);
		}
	}
	
	function associacaoEquivalencia(){
		if(mobi.RELATION.instanciasA.length == mobi.RELATION.instanciasB.length){ 
			for(var i=0; i < mobi.RELATION.instanciasA.length;i++){
				if(mobi.RELATION.instanciasA[i].relacoes.length == 1){
					var index = mobi.RELATION.instanciasA[i].relacoes[0];
					if(mobi.RELATION.instanciasA[i].name != mobi.RELATION.instanciasB[index].name){
						return false;
					}
				}else{
					return false;
				}
			}
			return true;	
		}
		return false;
	};
	
	function instanciasRelacionadas(){
		for(var i=0; i < mobi.RELATION.instanciasA.length;i++){
			if(mobi.RELATION.instanciasA[i].relacoes.length == 1){
				var index = mobi.RELATION.instanciasA[i].relacoes[0];
				if(mobi.RELATION.instanciasA[i].name != mobi.RELATION.instanciasB[index].name){
					return false;
				}
			}else if(mobi.RELATION.instanciasA[i].relacoes.length != 0){
				return false;
			}
		}
		return true;
	};
	
	function instanciasRelacionadasDiferentes(){
		for(var i=0; i < mobi.RELATION.instanciasA.length;i++){
			if(mobi.RELATION.instanciasA[i].relacoes.length == 1){
				var index = mobi.RELATION.instanciasA[i].relacoes[0];
				if(mobi.RELATION.instanciasA[i].name == mobi.RELATION.instanciasB[index].name){
					return false;
				}
			}else if(mobi.RELATION.instanciasA[i].relacoes.length != 0){
				return false;
			}
		}
		return true;
	};
	
	function instanciasIguais(){
		for(var i=0; i < mobi.RELATION.instanciasA.length;i++){
			for(var x=0; x < mobi.RELATION.instanciasB.length;x++){	
				if(mobi.RELATION.instanciasA[i].name == mobi.RELATION.instanciasB[x].name){
					return true;
				}
			}
		};
	};
	
	this.popupRelacaoMalFormada = function(){
		Ext.MessageBox.alert('Erro',  'Classe/Relacao deve estar preenchida');
	}
}

mobi.Instance = function(name, style){
	this.name = name; 
	this.style = style;
	this.relacoes = new Array();
	
};

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