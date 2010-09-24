package com.mobi.relacao.application.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import mobi.core.Mobi;
import mobi.core.common.Relation;
import mobi.core.concept.Class;
import mobi.core.concept.Instance;
import mobi.extension.export.owl.Mobi2OWL;

import com.mobi.comum.util.EditorMMobiConstantes;
import com.mobi.relacao.application.IRelacaoService;
import com.mobi.relacao.form.RelationDTO;

public class RelacaoServiceImpl implements IRelacaoService {
	
	
	public void processarRelacoes(Set<RelationDTO> relacoes) {
		
		Mobi mobi = new Mobi("CampeonatoBasquete");
		
		
		for(RelationDTO relacao : relacoes){
			
			//Cria as instancias e adciona os conceitos 
			List<Instance> instanciasConjuntoA = new ArrayList<Instance>();
			List<Instance> instanciasConjuntoB = new ArrayList<Instance>();
			
			for(String instanciaA : relacao.getInstanciasA()){
				
				Instance instancia = null;
				
				if(mobi.getInstance(instanciaA) != null){
					instancia = mobi.getInstance(instanciaA);
					
				}else{
					instancia = new Instance(instanciaA);
					mobi.addConcept(instancia);
				}
				
				instanciasConjuntoA.add(instancia);
				
			}
			
			for(String instanciaB : relacao.getInstanciasB()){
				
				Instance instancia = null;
				
				if(mobi.getInstance(instanciaB) != null){
					instancia = mobi.getInstance(instanciaB);
				}else{
					instancia = new Instance(instanciaB);
					mobi.addConcept(instancia);
				}
				
				instanciasConjuntoB.add(instancia);
				
			}
			
			//Cria as classes
			Class classeConjuntoA = new Class(relacao.getClasseA());
			Class classeConjuntoB = new Class(relacao.getClasseB());
			
			mobi.addConcept(classeConjuntoA);
			mobi.addConcept(classeConjuntoB);
			
			//Relacionando Classes e Instancias
			try {
				mobi.linkInstances(new HashSet<Instance>(instanciasConjuntoA), classeConjuntoA);
				mobi.linkInstances(new HashSet<Instance>(instanciasConjuntoB), classeConjuntoB);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			
			//Relaçõeses de Herança
			
			if(relacao.getTipoRelacao().equalsIgnoreCase(EditorMMobiConstantes.HERANCA)){
				criarRelacaoHeranca(classeConjuntoA, classeConjuntoB,relacao.getRelacionamentosInstancias(), mobi);
			}
			
			if(relacao.getTipoRelacao().equalsIgnoreCase(EditorMMobiConstantes.COMPOSICAO)){
				criarRelacaoComposicao(classeConjuntoA,classeConjuntoB,relacao.getRelacionamentosInstancias(),mobi);
			}
			
			if(relacao.getTipoRelacao().equalsIgnoreCase(EditorMMobiConstantes.EQUIVALENCIA)){
				criarRelacaoEquivalencia(classeConjuntoA,classeConjuntoB,mobi);
			}
			
		}
		
		Mobi2OWL mobi2OWL = new Mobi2OWL("http://www.mobi.org/", mobi);
		mobi2OWL.setExportPath("/home/diego/");
		mobi2OWL.exportMobiToOWL("Teste.owl");
		
		System.out.println("Fim da Exportação");
		
		
	}
	
	private void criarRelacaoHeranca(Class classeA,Class classeB, Map<String, Set<String>> relacionamentosInstancias,Mobi mobi){
		
		Relation rHeranca = mobi.createInheritanceRelation(classeA.getUri() + classeB.getUri());
        
        rHeranca.setClassA(classeA);
        rHeranca.setClassB(classeB);
     
        for (Entry<String, Set<String>> entry : relacionamentosInstancias.entrySet()){
			
			for(String instancia : entry.getValue() ){
				
				rHeranca.addInstanceRelation(mobi.getInstance(entry.getKey().substring(10)),mobi.getInstance(instancia));
				
			}
			
		}
        
        rHeranca.processCardinality();
        mobi.addConcept(rHeranca);
		
	}
	
	private void criarRelacaoComposicao(Class classeA,Class classeB,Map<String, Set<String>> relacionamentosInstancias,Mobi mobi){
		
		Relation relacaoComposicao = mobi.createBidirecionalCompositionRelationship(classeA.getUri(),classeB.getUri());
		relacaoComposicao.setClassA(classeA);
		relacaoComposicao.setClassB(classeB);
		relacaoComposicao.setUri(classeA.getUri() + classeB.getUri());
		
		for (Entry<String, Set<String>> entry : relacionamentosInstancias.entrySet()){
			
			for(String instancia : entry.getValue() ){
				
				relacaoComposicao.addInstanceRelation(mobi.getInstance(entry.getKey()),mobi.getInstance(instancia));
				
			}
			
		}
		
		relacaoComposicao.processCardinality();
		mobi.addConcept(relacaoComposicao);
		
		
	}
	
	private void criarRelacaoEquivalencia(Class classeA, Class classeB,Mobi mobi){
		
		Relation relacaoSimetrica =mobi.createSymmetricRelation(classeA.getUri() + classeB.getUri());
		relacaoSimetrica.setClassA(classeA);
        relacaoSimetrica.setClassB(classeB);
        mobi.addConcept(relacaoSimetrica);
		
	}

}
