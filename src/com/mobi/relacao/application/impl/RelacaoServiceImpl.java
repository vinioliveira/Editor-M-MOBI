package com.mobi.relacao.application.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import mobi.core.Mobi;
import mobi.core.common.Relation;
import mobi.core.concept.Class;
import mobi.core.concept.Context;
import mobi.core.concept.Instance;
import mobi.exception.ExceptionURI;

import com.mobi.relacao.application.IRelacaoService;
import com.mobi.relacao.form.RelationDTO;

public class RelacaoServiceImpl implements IRelacaoService {

	@Override
	public void processarRelacoes(RelationDTO relacao) {
		
		Mobi mobi = new Mobi();
		
		//Cria dominio
		Context dominio = new Context("CampeonatoBasquete");
		
		//Cria as instancias e adciona os conceitos 
		List<Instance> instanciasConjuntoA = new ArrayList<Instance>();
		List<Instance> instanciasConjuntoB = new ArrayList<Instance>();
		
		for(String instancia : relacao.getInstanciasA()){
			Instance instance = new Instance(instancia); 
			instanciasConjuntoA.add(instance);
			mobi.getConceptManager().addConcept(instance);
		}
		
		for(String instancia : relacao.getInstanciasB()){
			Instance instance = new Instance(instancia);
			instanciasConjuntoB.add(instance);
			mobi.getConceptManager().addConcept(instance);
		}
		
		//Cria as classes
		Class classeConjuntoA = new Class(relacao.getClasseA());
		Class classeConjuntoB = new Class(relacao.getClasseB());
		
		mobi.getConceptManager().addConcept(classeConjuntoA);
		mobi.getConceptManager().addConcept(classeConjuntoB);
		
		//Relacionando Classes e Instancias
		try {
			
			for(Instance instance : instanciasConjuntoA){
				mobi.getConceptManager().isOneOf(instance.getUri(), classeConjuntoA.getUri());
			}
			
			for(Instance instance : instanciasConjuntoB){
				mobi.getConceptManager().isOneOf(instance.getUri(), classeConjuntoB.getUri());
			}
		
		} catch (ExceptionURI e) {
			e.printStackTrace();
		}
		
		//Relações de Herança
		
		if(relacao.getTipoRelacao().equalsIgnoreCase("heranca")){
			criarRelacaoHeranca(classeConjuntoA, classeConjuntoB, dominio, instanciasConjuntoA, mobi);
		}
		
		if(relacao.getTipoRelacao().equalsIgnoreCase("composicao")){
			criarRelacaoComposicao(classeConjuntoA,classeConjuntoB, dominio,mobi,relacao.getRelacionamentosInstancias());
		}
		
		if(relacao.getTipoRelacao().equalsIgnoreCase("equivalencia")){
			criarRelacaoEquivalencia(classeConjuntoA,mobi);
		}
		
	}
	
	private void criarRelacaoHeranca(Class classeA,Class classeB, Context dominio,List<Instance> instanciasConjuntoA,Mobi mobi){
		
		Relation relacaoHeranca = mobi.getRelationFactory().createInheritanceRelation(classeA.getUri() + classeB.getUri());	          
		relacaoHeranca.setClassA(classeA);
		relacaoHeranca.setClassB(classeB);
		relacaoHeranca.setContext(dominio);	       
        mobi.getConceptManager().addConcept(relacaoHeranca);
        relacaoHeranca.addInstanceRelation(instanciasConjuntoA.get(0),instanciasConjuntoA.get(0));
        relacaoHeranca.processCardinality();
		
	}
	
	private void criarRelacaoComposicao(Class classeA,Class classeB, Context dominio,Mobi mobi,Map<String, Set<String>> relacionamentosInstancias){
		
		Relation relacaoComposicao = mobi.getRelationFactory().criaRelacaoComposicaoBidirecionalTemPertence(classeA.getUri(), classeB.getUri());
		relacaoComposicao.setClassA(classeA);
		relacaoComposicao.setClassB(classeB);
		relacaoComposicao.setContext(dominio);
		relacaoComposicao.setUri(classeA.getUri() + classeB.getUri());
		mobi.getConceptManager().addConcept(relacaoComposicao);
		
		
		for (Entry<String, Set<String>> entry : relacionamentosInstancias.entrySet()){
			
			for(String instancia : entry.getValue() ){
				
				relacaoComposicao.addInstanceRelation(new Instance(entry.getKey()) , new Instance(instancia) );
				
			}
			
		}
		
	}
	
	private void criarRelacaoEquivalencia(Class classeA,Mobi mobi){
		
		mobi.getRelationFactory().createSimetricRelation(classeA.getUri());
		
	}

}
