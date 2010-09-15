package com.mobi.relacao.application.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import mobi.Classe;
import mobi.Dominio;
import mobi.FabricaRelacao;
import mobi.Instancia;
import mobi.Mobi;
import mobi.Relacao;

import com.mobi.relacao.application.IRelacaoService;
import com.mobi.relacao.form.RelationDTO;

public class RelacaoServiceImpl implements IRelacaoService {
	
	
	public void processarRelacoes(RelationDTO relacao) {
		
		Mobi mobi = Mobi.getInstancia();
		
		Dominio dominio = new Dominio();
		dominio.setUri("Teste");
		
		//Cria as instancias e adciona os conceitos 
		List<Instancia> instanciasConjuntoA = new ArrayList<Instancia>();
		List<Instancia> instanciasConjuntoB = new ArrayList<Instancia>();
		
		for(String instanciaA : relacao.getInstanciasA()){
			Instancia instancia = new Instancia();
			instancia.setUri(instanciaA);
			instanciasConjuntoA.add(instancia);
			mobi.vinculaConceito(instancia);
		}
		
		for(String instanciaB : relacao.getInstanciasB()){
			Instancia instancia = new Instancia();
			instancia.setUri(instanciaB);
			instanciasConjuntoB.add(instancia);
			mobi.vinculaConceito(instancia);
		}
		
		//Cria as classes
		Classe classeConjuntoA = new Classe();
		Classe classeConjuntoB = new Classe();
		classeConjuntoA.setUri(relacao.getClasseA());
		classeConjuntoB.setUri(relacao.getClasseB());
		
		mobi.vinculaConceito(classeConjuntoA);
		mobi.vinculaConceito(classeConjuntoB);
		
		//Relacionando Classes e Instancias
		try {
			
			for(Instancia instance : instanciasConjuntoA){
				mobi.e_um(instance.getUri(), classeConjuntoA.getUri());
			}
			
			for(Instancia instance : instanciasConjuntoB){
				mobi.e_um(instance.getUri(), classeConjuntoB.getUri());
			}
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//Relaçõeses de Herança
		
		if(relacao.getTipoRelacao().equalsIgnoreCase("heranca")){
			criarRelacaoHeranca(classeConjuntoA, classeConjuntoB, dominio, relacao.getRelacionamentosInstancias(), mobi);
		}
		
		if(relacao.getTipoRelacao().equalsIgnoreCase("composicao")){
			criarRelacaoComposicao(classeConjuntoA,classeConjuntoB, dominio,mobi,relacao.getRelacionamentosInstancias());
		}
		
		if(relacao.getTipoRelacao().equalsIgnoreCase("equivalencia")){
			criarRelacaoEquivalencia(classeConjuntoA,classeConjuntoB,dominio,mobi);
		}
		
	}
	
	private void criarRelacaoHeranca(Classe classeA,Classe classeB, Dominio dominio,Map<String, Set<String>> relacionamentosInstancias,Mobi mobi){
		
		
		Relacao rHeranca =FabricaRelacao.getInstancia().criaRelacaoHeranca(classeA.getUri() + classeB.getUri());
        
        rHeranca.setClasseA(classeA);
        rHeranca.setClasseB(classeB);
        rHeranca.setDominio(dominio);
     
        mobi.vinculaConceito(rHeranca);
        
        for (Entry<String, Set<String>> entry : relacionamentosInstancias.entrySet()){
			
			for(String instancia : entry.getValue() ){
				
				rHeranca.adicionaRelacaoInstancia(entry.getKey(),instancia);
				
			}
			
		}
        
        rHeranca.processaCardinalidade();
		
		
	}
	
	private void criarRelacaoComposicao(Classe classeA,Classe classeB, Dominio dominio,Mobi mobi,Map<String, Set<String>> relacionamentosInstancias){
		
		Relacao relacaoComposicao =FabricaRelacao.getInstancia().criaRelacaoComposicaoBidirecionalTemPertence(classeA.getUri(),classeB.getUri());
		relacaoComposicao.setClasseA(classeA);
		relacaoComposicao.setClasseB(classeB);
		relacaoComposicao.setDominio(dominio);
		relacaoComposicao.setUri(classeA.getUri() + classeB.getUri());
		
		mobi.vinculaConceito(relacaoComposicao);
		
		
		for (Entry<String, Set<String>> entry : relacionamentosInstancias.entrySet()){
			
			for(String instancia : entry.getValue() ){
				
				relacaoComposicao.adicionaRelacaoInstancia(entry.getKey(),instancia);
				
			}
			
		}
		
	}
	
	private void criarRelacaoEquivalencia(Classe classeA, Classe classeB,Dominio dominio, Mobi mobi){
		
		Relacao relacaoSimetrica =FabricaRelacao.getInstancia().criaRelacaoComposicaoSimetrica(classeA.getUri() + classeB.getUri());
		relacaoSimetrica.setClasseA(classeA);
        relacaoSimetrica.setClasseB(classeB);
        relacaoSimetrica.setDominio(dominio);
      
        mobi.vinculaConceito(relacaoSimetrica);
		
	}

}
