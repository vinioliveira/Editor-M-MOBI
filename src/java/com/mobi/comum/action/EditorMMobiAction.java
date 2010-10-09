package com.mobi.comum.action;

import java.util.ArrayList;
import java.util.HashMap;
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
import mobi.core.relation.InheritanceRelation;
import mobi.core.relation.InstanceRelation;
import mobi.extension.export.owl.Mobi2OWL;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.MappingDispatchAction;

import com.mobi.comum.util.EditorMMobiConstantes;
import com.mobi.relacao.form.RelacaoForm;
import com.mobi.relacao.form.RelationDTO;


public class EditorMMobiAction extends MappingDispatchAction {
	
	public ActionForward addRelacoes(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Mobi mobi = (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		
		String instanciaUriA = request.getParameter("instanciaA");
		String instanciaUriB = request.getParameter("instanciaB");

		Relation relacao = mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO);
		
		Instance instanceA = mobi.getInstance(instanciaUriA) == null ?
				new Instance(instanciaUriA): mobi.getInstance(instanciaUriA);
		Instance instanceB = mobi.getInstance(instanciaUriB) == null ? 
				new Instance(instanciaUriB): mobi.getInstance(instanciaUriB);
		
		mobi.addConcept(instanceA);
		mobi.addConcept(instanceB);
				
		relacao.addInstanceRelation(instanceA, instanceB);
		
		return null;

	}

	public ActionForward addInstanciaRelacao(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String conjunto = request.getParameter("conjunto");
		String nameInstance = request.getParameter("nomeIstancia");
		
		Mobi mobi =  (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		
		Instance instance = new Instance(nameInstance);
		mobi.addConcept(instance);
		
		Relation relacao = mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO) == null ?
				mobi.createGenericRelation(EditorMMobiConstantes.TEMPORARIO) : mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO);

		InstanceRelation iRelation = new InstanceRelation();
		iRelation.setInstance(instance);
		
		if(conjunto.equals(EditorMMobiConstantes.CONJUNTO_A)){

			relacao.getInstanceRelationMapA().put(instance.getUri(), iRelation);
		}
		if(conjunto.equals(EditorMMobiConstantes.CONJUNTO_B)){

			relacao.getInstanceRelationMapB().put(instance.getUri(), iRelation);
		} 
		
		mobi.addConcept(relacao);
		request.getSession().setAttribute(EditorMMobiConstantes.MOBI, mobi);
		
		return null;
	}
	
	public ActionForward visualizarRelacoes(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		RelacaoForm diagramaForm = (RelacaoForm)form;
		
		Mobi mobi = new Mobi("Dominio");
		
		request.getSession().setAttribute(EditorMMobiConstantes.MOBI, mobi);
		
		diagramaForm.reset();
		
		return mapping.findForward("success");
		
	}
	
	@SuppressWarnings("unchecked")
	public ActionForward salvarRelacoes(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Mobi mobi =  (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		
		int tipoRelacao = Integer.valueOf(request.getParameter("tipoRelacao"));
		String classeAUri = request.getParameter("classeA");
		String classeBUri = request.getParameter("classeB");
		String nomeA = request.getParameter("ida");
		String nomeB = request.getParameter("volta");
		
		
		Relation relation = mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO) == null ? 
				mobi.createGenericRelation(EditorMMobiConstantes.TEMPORARIO): mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO);
		
		Class classeA = mobi.getClass(classeAUri) != null ?  mobi.getClass(classeAUri) : new Class(classeAUri) ;
		Class classeB = mobi.getClass(classeBUri) != null ?  mobi.getClass(classeBUri) : new Class(classeBUri) ;

		mobi.addConcept(classeA);
		mobi.addConcept(classeB);
		
		relation.setClassA(classeA);
		relation.setClassB(classeB);

		if( tipoRelacao == Relation.INHERITANCE ){
			relation.setUri(classeA.getUri() + classeB.getUri() + Relation.INHERITANCE);
			relation = mobi.convertToInheritanceRelation(relation, relation.getUri());
		}
		
		if( tipoRelacao ==  Relation.EQUIVALENCE ){
			relation.setUri(classeA.getUri() + classeB.getUri() + Relation.EQUIVALENCE);
			relation = mobi.convertToEquivalenceRelation(relation, relation.getUri());
		}
		
		if( tipoRelacao == Relation.BIDIRECIONAL_COMPOSITION){
			relation.setUri(classeA.getUri() + classeB.getUri() + Relation.BIDIRECIONAL_COMPOSITION);
			relation = mobi.convertToBidirecionalCompositionRelationship(relation,nomeA ,nomeB );
		}
		
		if( tipoRelacao == Relation.UNIDIRECIONAL_COMPOSITION ){
			relation.setUri(classeA.getUri() + classeB.getUri() + Relation.UNIDIRECIONAL_COMPOSITION);
			relation = mobi.convertToUnidirecionalCompositionRelationship(relation, nomeA);
		}
		
		if( tipoRelacao == Relation.SYMMETRIC_COMPOSITION){
			relation.setUri(classeA.getUri() + classeB.getUri() + Relation.SYMMETRIC_COMPOSITION);
			relation = mobi.convertToSymmetricRelation(relation, nomeA);
		}

		mobi.addConcept(relation);
		
		List relacionamentos = new ArrayList(mobi.getAllRelations().values());
		request.getSession().setAttribute("relacionamentos", relacionamentos);
		
		ArrayList classes = new ArrayList(mobi.getAllClasses().values());
		request.setAttribute("classes", classes );

		mobi.getAllGenericRelations().put(EditorMMobiConstantes.TEMPORARIO, new GenericRelation());
		
		return mapping.findForward("success");
		
	}
	
	@SuppressWarnings("unchecked")
	public ActionForward atualizarNomeClasse(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String nomeClasseAntigo = request.getParameter("classeAntigo");
		String nomeClasseNovo = request.getParameter("classeNovo");
		
		Mobi mobi = (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		Relation relationRemoved = null;
		
		Class classe = mobi.getClass(nomeClasseAntigo);
		
		mobi.removeConcept(classe);
		
		classe.setUri(nomeClasseNovo);

		mobi.addConcept(classe);

		List<Relation> relacionamentosClasse = mobi.getAllClassRelations(classe);

		//Atualização uris das relações das classes
		for(Relation relation : relacionamentosClasse ){
			
			relationRemoved = mobi.getAllRelations().get(nomeClasseAntigo + relation.getClassB().getUri() + relation.getType());

			relationRemoved = relationRemoved == null ? 
					mobi.getAllRelations().get(relation.getClassA().getUri() + nomeClasseAntigo + relation.getType()): relationRemoved;
			
			mobi.removeConcept(relationRemoved);
			relation.setUri(relation.getClassA().getUri() + relation.getClassB().getUri() + relation.getType());
			mobi.addConcept(relation);
		}
		
		List relacionamentos = new ArrayList(mobi.getAllRelations().values());
		request.getSession().setAttribute("relacionamentos", relacionamentos);
		
		ArrayList classes = new ArrayList(mobi.getAllClasses().values());
		request.setAttribute("classes", classes );
					
		return mapping.findForward("success");
	}
	
	public ActionForward atualizarInstancias(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String nomeClasse = request.getParameter("nomeClasse");
		String conjunto = request.getParameter("conjunto");
		
		Mobi mobi =  (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		Relation relation = mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO) != null ? 
				mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO) : mobi.createGenericRelation(EditorMMobiConstantes.TEMPORARIO);
		
		Class classe = mobi.getClass(nomeClasse) != null ? mobi.getClass(nomeClasse) : new Class(nomeClasse);
		Set<Instance> instances  = mobi.getClassInstances(classe);
		
		if(conjunto.equals(EditorMMobiConstantes.CONJUNTO_A)){
			relation.setClassA(classe);
			if(instances != null ){
				relation.setInstanceRelationMapA(new HashMap<String, InstanceRelation>());
				for(Instance instance : instances){
					relation.getInstanceRelationMapA().put(instance.getUri(), new InstanceRelation());
				}
			}else{
				relation.setInstanceRelationMapA(new HashMap<String, InstanceRelation>());
			}
		}
		if(conjunto.equals(EditorMMobiConstantes.CONJUNTO_B)){
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
		int tipoRelacao = Integer.valueOf(request.getParameter("tipoRelacao"));
		
		Mobi mobi =  (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		Relation relation = null;
			
		if(tipoRelacao == Relation.INHERITANCE){
			relation = mobi.getInheritanceRelation(classeA + classeB + tipoRelacao);
		}
		
		if(tipoRelacao == Relation.EQUIVALENCE){
			relation = mobi.getEquivalenceRelation(classeA + classeB + tipoRelacao);
		}
		
		if(tipoRelacao == Relation.UNIDIRECIONAL_COMPOSITION || tipoRelacao == Relation.BIDIRECIONAL_COMPOSITION){
			relation = mobi.getCompositionRelation(classeA + classeB + tipoRelacao);
		}

		if( tipoRelacao == Relation.SYMMETRIC_COMPOSITION ){
			relation = mobi.getSymmetricRelation(classeA + classeB + tipoRelacao);
		}
		
		//mobi.getAllGenericRelations().put(EditorMMobiConstantes.TEMPORARIO, relation);
		
		criarInstanciasRelacacao(relation, mobi);
		request.getSession().setAttribute("relacao", relation);
		return mapping.findForward("success");
		
	}
	
	private void criarInstanciasRelacacao(Relation relation, Mobi mobi){
		
		if(relation.getInstanceRelationMapB().isEmpty()){
		
			if(relation.getType() == Relation.INHERITANCE){

				 List<Relation> relationsInheritance = mobi.getAllClassInheritanceRelations(relation.getClassA());

				Instance instance = null; 
				
				for(Relation relaionTemp : relationsInheritance){
					
					String classeInstancia =  relaionTemp.getClassA().getUri().equals( relation.getClassA().getUri()) 
						? relaionTemp.getClassB().getUri() :  relaionTemp.getClassA().getUri() ;
					instance = new Instance("i" + classeInstancia +'1');
					
					mobi.addConcept(instance);
					
					InstanceRelation iRelation = new InstanceRelation();
					iRelation.setInstance(instance);
					
					relation.getInstanceRelationMapA().put(instance.getUri(), iRelation );
					
				}
				
				Instance instanceB = mobi.getInstance("i"+relation.getClassB().getUri()+ "1");

				relation.addInstanceRelation(instanceB, instanceB);
				
			}
			
			if(relation.getType() ==  Relation.EQUIVALENCE){
				
				Instance instanceA = mobi.getInstance("i"+relation.getClassA().getUri()+ "1") == null ?
						new Instance("i"+relation.getClassA().getUri()+ "1")  : mobi.getInstance("i"+relation.getClassA().getUri()+ "1");
				
				Instance instanceB = mobi.getInstance("i"+relation.getClassB().getUri()+ "1") == null ? 
						new Instance("i"+relation.getClassB().getUri()+ "1") : mobi.getInstance("i"+relation.getClassB().getUri()+ "1");
						
				relation.addInstanceRelation(instanceA, instanceB);
				
			}
			if(relation.getType() == Relation.UNIDIRECIONAL_COMPOSITION || relation.getType() == Relation.BIDIRECIONAL_COMPOSITION
					|| relation.getType() == Relation.SYMMETRIC_COMPOSITION ){
				
				if(mobi.getClassInstances(relation.getClassA()) == null ){
					for( int i=0; i < 3; i++){
						Instance instanceA = mobi.getInstance("i"+relation.getClassA().getUri() + i) == null ?
								new Instance("i"+relation.getClassA().getUri()+ i)  : mobi.getInstance("i"+relation.getClassA().getUri()+ i);
						
						relation.getInstanceRelationMapA().put(instanceA.getUri(), new InstanceRelation());

					}
				}else{
					for(Instance instance : mobi.getClassInstances(relation.getClassA())){
						relation.getInstanceRelationMapA().put(instance.getUri(), new InstanceRelation());
					}
				}
				
				if(mobi.getClassInstances(relation.getClassB()) == null ){
					for( int i=0; i < 3; i++){
						Instance instanceB = mobi.getInstance("i"+relation.getClassB().getUri() + i) == null ?
								new Instance("i"+relation.getClassB().getUri()+ i)  : mobi.getInstance("i"+relation.getClassB().getUri()+ i);
						
						relation.getInstanceRelationMapB().put(instanceB.getUri(), new InstanceRelation());

					}
				}else{
					for(Instance instance : mobi.getClassInstances(relation.getClassB())){
						relation.getInstanceRelationMapB().put(instance.getUri(), new InstanceRelation());
					}
				}
			}
			
			
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
	
	public ActionForward gerarArquivoOWL(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Mobi mobi = (Mobi)request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		
		Mobi2OWL mobi2OWL = new Mobi2OWL("http://www.mobi.edu/", mobi);
		
		mobi2OWL.setExportPath("/home/progoz/mobi");
		mobi2OWL.exportMobiToOWL("mobi.owl");
		
		return null;
		
	}
	
}
