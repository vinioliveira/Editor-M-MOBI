package com.mobi.comum.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mobi.core.Mobi;
import mobi.core.common.Relation;
import mobi.core.concept.Class;
import mobi.core.concept.Instance;
import mobi.core.relation.GenericRelation;
import mobi.core.relation.InstanceRelation;
import mobi.extension.export.owl.Mobi2OWL;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.MappingDispatchAction;

import com.mobi.comum.util.EditorMMobiConstantes;
import com.mobi.relacao.application.IRelacaoService;
import com.mobi.relacao.application.impl.RelacaoServiceImpl;
import com.mobi.relacao.form.RelacaoForm;
import com.mobi.relacao.form.RelacionamentoDTO;
import com.mobi.relacao.form.RelationDTO;


public class DiagramaAction extends MappingDispatchAction {
	
	private static final String CONJUNTO_A = "ConjuntoA";
	private static final String CONJUNTO_B = "ConjuntoB";

	public ActionForward addRelacoes(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		RelacaoForm diagramaForm = (RelacaoForm)form;
		
		String instanciaA = request.getParameter("instanciaA");
		String instanciaB = request.getParameter("instanciaB");
		
		Set<String> instancias = diagramaForm.getRelacaoDTO().getRelacionamentosInstancias().get(CONJUNTO_A + " " +instanciaA);
		instancias.add(instanciaB);
		diagramaForm.getRelacaoDTO().getRelacionamentosInstancias().put(CONJUNTO_A + " " + instanciaA, instancias);
		
		return null;

	}

	public ActionForward visualizarRelacoes(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		RelacaoForm diagramaForm = (RelacaoForm)form;
		
		Mobi mobi = new Mobi("Dominio");
		
		request.getSession().setAttribute("mobi", mobi);
		
		diagramaForm.reset();
		
		return mapping.findForward("success");
		
	}
	
	@SuppressWarnings("unchecked")
	public ActionForward salvarRelacoes(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Mobi mobi =  (Mobi) request.getSession().getAttribute("mobi");
		
		String tipoRelacao = request.getParameter("tipoRelacao");
		String classeAUri = request.getParameter("classeA");
		String classeBUri = request.getParameter("classeB");
		
		Relation relation = mobi.createGenericRelation(classeAUri + classeBUri);
		
		Class classeA = mobi.getClass(classeAUri) != null ?  mobi.getClass(classeAUri) : new Class(classeAUri) ;
		Class classeB = mobi.getClass(classeBUri) != null ?  mobi.getClass(classeBUri) : new Class(classeBUri) ;

		mobi.addConcept(classeA);
		mobi.addConcept(classeB);
		
		relation.setClassA(classeA);
		relation.setClassB(classeB);

		Set<Instance> instancesA =  mobi.getClassInstances(classeA);
		Set<Instance> instancesB =  mobi.getClassInstances(classeB);
		
		if (instancesA != null ){
			for(Instance instance : instancesA){
				
				relation.getInstanceRelationMapA().put(instance.getUri(), new InstanceRelation());
				
			}
		}
		if(instancesB != null){
			for(Instance instance : instancesB){
				
				relation.getInstanceRelationMapB().put(instance.getUri(), new InstanceRelation());
				
			}
		}
		
		if( tipoRelacao.equalsIgnoreCase(EditorMMobiConstantes.HERANCA) ){
			
			relation = mobi.convertToInheritanceRelation(relation, classeAUri + classeBUri);

		}
		
		if (tipoRelacao.equalsIgnoreCase(EditorMMobiConstantes.EQUIVALENCIA)){
			relation = mobi.convertToEquivalenceRelation(relation, relation.getUri());
		}
		
		if(tipoRelacao.equalsIgnoreCase(EditorMMobiConstantes.COMPOSICAO)){
			//
		}
		
		mobi.addConcept(relation);
		
		List<Relation> relacionamentos = (List<Relation>)request.getSession().getAttribute("relacionamentos");
		if(relacionamentos == null){
			relacionamentos = new ArrayList<Relation>();
		}
		relacionamentos.add(relation);
		
		request.getSession().setAttribute("relacionamentos", relacionamentos);
		
		ArrayList classes = new ArrayList(mobi.getAllClasses().values());
		//Collections.sort(classes);
		request.setAttribute("classes", classes );
		mobi.getAllGenericRelations().put("temp", new GenericRelation());

		
		
		return mapping.findForward("success");
		
	}
	
	@SuppressWarnings("unchecked")
	public ActionForward atualizarNomeClasse(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String nomeClasseAntigo = request.getParameter("classeAntigo");
		String nomeClasseNovo = request.getParameter("classeNovo");
		
		List<RelacionamentoDTO> todasRelacoes =  (List<RelacionamentoDTO>) request.getSession().getAttribute("relacionamentos");
		Set<RelationDTO> listaRelacaoNomeClasse =  (Set<RelationDTO>) request.getSession().getAttribute("listaNomeRelacoes");
		
		boolean classeEncontrada = false;
		
		if(todasRelacoes != null){
			for(RelacionamentoDTO relacionamento : todasRelacoes){
				
				if(relacionamento.getClasseA().equals(nomeClasseAntigo)){
					
					relacionamento.setClasseA(nomeClasseNovo);
				}
				
				if(relacionamento.getClasseB().equals(nomeClasseAntigo)){
				
					relacionamento.setClasseB(nomeClasseNovo);
				}
				
			}
			for(RelationDTO relacao : listaRelacaoNomeClasse){
				
				if(relacao.getClasseA().equals(nomeClasseAntigo)){
					
					relacao.setClasseA(nomeClasseNovo);
				}
				
				if(relacao.getClasseB().equals(nomeClasseAntigo)){
				
					relacao.setClasseB(nomeClasseNovo);
				}
				
			}
			
		}
		
		if(classeEncontrada){
			request.getSession().setAttribute("relacionamentos", todasRelacoes);
			request.getSession().setAttribute("listaNomeRelacoes", listaRelacaoNomeClasse);
		}
					
		return mapping.findForward("success");
	}
	
	@SuppressWarnings("unchecked")
	public ActionForward atualizarInstancias(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String nomeClasse = request.getParameter("nomeClasse");
		String conjunto = request.getParameter("conjunto");
		
		Mobi mobi =  (Mobi) request.getSession().getAttribute("mobi");
		Relation relation = mobi.getAllGenericRelations().get("temp") != null ? mobi.getAllGenericRelations().get("temp") : mobi.createGenericRelation("temp");
		
		Class classe = mobi.getClass(nomeClasse) != null ? mobi.getClass(nomeClasse) : new Class(nomeClasse);
		Set<Instance> instances  = mobi.getClassInstances(classe);
		
		if(conjunto.equals("classeA")){
			relation.setClassA(classe);
			if(instances != null ){
				relation.setInstanceRelationMapA(new HashMap<String, InstanceRelation>());
				for(Instance instance : instances){
					relation.getInstanceRelationMapA().put(instance.getUri(), new InstanceRelation());
				}
			}else{
				relation.setInstanceRelationMapA(new HashMap<String, InstanceRelation>());
			}
		}else{
			relation.setClassB(classe);
			if(instances != null ){
				relation.setInstanceRelationMapB(new HashMap<String, InstanceRelation>());
				for(Instance instance : instances){
					relation.getInstanceRelationMapB().put(instance.getUri(), new InstanceRelation());
				}
			}else{
				relation.setInstanceRelationMapB(new HashMap<String, InstanceRelation>());
			}
		}
		
		
		request.getSession().setAttribute("relacao", relation);
		mobi.addConcept(relation);
		return mapping.findForward("success");
		
	}
	
	public ActionForward listarRelacoes(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		
		return mapping.findForward("success");
		
	}
	
	public ActionForward carregarRelacao(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
 		String classeA = request.getParameter("classeA");
		String classeB = request.getParameter("classeB");
		String tipoRelacao = request.getParameter("tipoRelacao");
		
		Mobi mobi =  (Mobi) request.getSession().getAttribute("mobi");
		Relation relation = null;
		
		if(EditorMMobiConstantes.HERANCA.equalsIgnoreCase(tipoRelacao)){
			
			relation = mobi.getInheritanceRelation(classeA + classeB);
			
		}
		
		
		request.getSession().setAttribute("relacao", relation);
		
		//criarInstanciasRelacacao(relacoesAux,relacao);
		
		return mapping.findForward("success");
		
	}
	
	private void criarInstanciasRelacacao(List<RelationDTO> listaRelacacoes, RelationDTO relacao){
		if (relacao.getInstanciasB().isEmpty()){
			List<String> nomeInstanciasB = new ArrayList<String>();
			for(RelationDTO relacaoTemp : listaRelacacoes){
				if(relacaoTemp.getClasseA().equals(relacao.getClasseA())){
					nomeInstanciasB.add(relacaoTemp.getClasseB());
				}
				
			}
			
			for(String nomeInstancia : nomeInstanciasB){
				addInstancia("I"+nomeInstancia, CONJUNTO_A, nomeInstancia , relacao);
			}
			
			addInstancia("I"+relacao.getClasseB(), CONJUNTO_B, relacao.getClasseA() , relacao);
			
			Set<String> instancias = relacao.getRelacionamentosInstancias().get(CONJUNTO_A + " " +"I"+relacao.getClasseB());
			instancias.add("I"+relacao.getClasseB());
			relacao.getRelacionamentosInstancias().put(CONJUNTO_A + " " +"I"+relacao.getClasseB(), instancias);
			
		}
		
	}
	
	
	private void addInstancia(String nomeInstancia, String conjuntoInstancia, String nomeClass, RelationDTO relacao){
		
		
		if(CONJUNTO_A.equals(conjuntoInstancia)){
			if(relacao.getClasseA() == null){
				relacao.setClasseA(nomeClass);
			}
			relacao.getInstanciasA().add(nomeInstancia);
			relacao.getRelacionamentosInstancias().put(CONJUNTO_A + " " + nomeInstancia, new HashSet<String>());
		}
		
		if(CONJUNTO_B.equals(conjuntoInstancia)){
			if(relacao.getClasseB() == null){
				relacao.setClasseB(nomeClass);
			}
			relacao.getInstanciasB().add(nomeInstancia);
			relacao.getRelacionamentosInstancias().put(CONJUNTO_B + " " + nomeInstancia, new HashSet<String>());
		}
	}

	public ActionForward eliminarRelacionamento(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		RelacaoForm relacaoForm = (RelacaoForm)form;
		
		String instanciaA = request.getParameter("instanciaA");
		String instanciaB = request.getParameter("instanciaB");
		
		for(Entry<String, Set<String>> entry : relacaoForm.getRelacaoDTO().getRelacionamentosInstancias().entrySet()){

			if(entry.getKey().contains(instanciaA)){
				entry.getValue().remove(instanciaB);
			}
			
		}
		
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public ActionForward eliminarInstancia(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		
		RelacaoForm relacaoForm = (RelacaoForm)form;
		String instancia = request.getParameter("instancia");
		String classe = request.getParameter("idClasse");
		RelationDTO relacaoDTO = relacaoForm.getRelacaoDTO();
		
		if(relacaoDTO.getClasseA().equals(classe)){
			relacaoDTO.getInstanciasA().remove(instancia);
		}
		
		if(relacaoDTO.getClasseB().equals(classe)){
			relacaoDTO.getInstanciasB().remove(instancia);
		}
		
		Set<RelationDTO> relacoes =  (Set<RelationDTO>) request.getSession().getAttribute("listaNomeRelacoes");
		if(relacoes != null){
			relacoes.remove(relacaoDTO);
			relacoes.add(relacaoDTO);
		}
		
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public ActionForward gerarArquivoOWL(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Mobi mobi = (Mobi)request.getSession().getAttribute("mobi");
		
		Mobi2OWL mobi2OWL = new Mobi2OWL("http://www.mobi.edu/", mobi);
		
		mobi2OWL.setExportPath("/home/progoz/mobi");
		mobi2OWL.exportMobiToOWL("mobi.owl");
		
		return null;
		
	}
	
	
	

}
