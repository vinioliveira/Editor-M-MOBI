package com.mobi.comum.action;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.ServletOutputStream;
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
import com.mobi.relacao.form.RelacaoForm;
import com.mobi.relacao.form.RelationDTO;


public class EditorMMobiAction extends MappingDispatchAction {
	
	public ActionForward addRelacoesInstancia(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Mobi mobi = (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		
		Relation relacao = mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO);
		

		//validação das instancias em relação ao conjunto
		String instanciaUriA = relacao.getInstanceRelationMapA().get(request.getParameter("instanciaA")) != null ?
				request.getParameter("instanciaA") : request.getParameter("instanciaB");
		String instanciaUriB = relacao.getInstanceRelationMapB().get(request.getParameter("instanciaB")) != null ? 
				request.getParameter("instanciaB") : request.getParameter("instanciaA");
		
		
		Instance instanceA = mobi.getInstance(instanciaUriA) == null ?
				new Instance(instanciaUriA): mobi.getInstance(instanciaUriA);
		Instance instanceB = mobi.getInstance(instanciaUriB) == null ? 
				new Instance(instanciaUriB): mobi.getInstance(instanciaUriB);
		
		mobi.addConcept(instanceA);
		mobi.addConcept(instanceB);
				
		//mobi.infereRelation(relacao);
		relacao.addInstanceRelation(instanceA, instanceB);
		
		return null;

	}

	public ActionForward  alterarNomeInstancia(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Mobi mobi =  (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		
		String iAntigaUri = request.getParameter("iAntigo");
		String iNovoUri = request.getParameter("iNovo");
		String conjunto = request.getParameter("conjunto");
		
		Relation relacao = mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO) == null ?
				mobi.createGenericRelation(EditorMMobiConstantes.TEMPORARIO) : mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO);
		
		InstanceRelation iRelation = new InstanceRelation();
		
		Instance instance =  mobi.getInstance(iNovoUri)== null ? 
				new Instance(iNovoUri): mobi.getInstance(iNovoUri);
		iRelation.setInstance(instance);				
		
		if(conjunto.equals(EditorMMobiConstantes.CONJUNTO_A)){
			relacao.getInstanceRelationMapA().remove(iAntigaUri);
			relacao.getInstanceRelationMapA().put(instance.getUri(), iRelation);
		}
		if(conjunto.equals(EditorMMobiConstantes.CONJUNTO_B)){
			relacao.getInstanceRelationMapB().remove(iAntigaUri);
			relacao.getInstanceRelationMapB().put(instance.getUri(), iRelation);
		}
		
		return null;
	}
	
	public ActionForward addInstanciaRelacao(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String conjunto = request.getParameter("conjunto");
		String nameInstance = request.getParameter("nomeIstancia");
		
		Mobi mobi =  (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		
		Instance instance =  mobi.getInstance(nameInstance)== null ? 
				new Instance(nameInstance): mobi.getInstance(nameInstance);
				
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
	
	public ActionForward atualizarNomeInstancia(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Mobi mobi = (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		Relation relationGeneric = mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO);
		
		String uriAntiga = request.getParameter("nomeAntigo");
		String uriNovo = request.getParameter("nomeNovo");
		
		Instance instnacia = mobi.getInstance(uriNovo) == null ? new Instance(uriNovo) : mobi.getInstance(uriNovo);
		
		InstanceRelation iRelation =  null;
				
		if(relationGeneric.getInstanceRelationMapA().get(uriAntiga) != null){
			//Atualização do nome do conjunto que ela pertence 
			iRelation = relationGeneric.getInstanceRelationMapA().get(uriAntiga);
			iRelation.setInstance(instnacia);
			relationGeneric.getInstanceRelationMapA().remove(uriAntiga);
			relationGeneric.getInstanceRelationMapA().put(uriNovo, iRelation);
			
			//Atualizando nome de suas relações 
			for(Entry<String, InstanceRelation> relacao : relationGeneric.getInstanceRelationMapB().entrySet()){
				if( relacao.getValue().getAllInstances().get(uriAntiga) != null){
					relacao.getValue().getAllInstances().remove(uriAntiga);
					relacao.getValue().addInstance(instnacia);
				}
			}
			
		}
		
		if(relationGeneric.getInstanceRelationMapB().get(uriAntiga) != null){
			//Atualização do nome do conjunto que ela pertence 
			iRelation = relationGeneric.getInstanceRelationMapB().get(uriAntiga);
			iRelation.setInstance(instnacia);
			relationGeneric.getInstanceRelationMapB().remove(uriAntiga);
			relationGeneric.getInstanceRelationMapB().put(uriNovo, iRelation);
			
			for(Entry<String, InstanceRelation> relacao : relationGeneric.getInstanceRelationMapA().entrySet()){
				if( relacao.getValue().getAllInstances().get(uriAntiga) != null){
					relacao.getValue().getAllInstances().remove(uriAntiga);
					relacao.getValue().addInstance(instnacia);
				}
			}
			
		}
		return null;
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
			}
		}
		
		if(conjunto.equals(EditorMMobiConstantes.CONJUNTO_B)){
			relation.setClassB(classe);
			if(instances != null ){
				relation.setInstanceRelationMapB(new HashMap<String, InstanceRelation>());
				for(Instance instance : instances){
					relation.getInstanceRelationMapB().put(instance.getUri(), new InstanceRelation());
				}
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
		mobi.getAllGenericRelations().put(EditorMMobiConstantes.TEMPORARIO, new GenericRelation());
		
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
				//	mobi.isOneOf(instance, relation.getClassA());

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
	
	public ActionForward eliminarRelacionamentoInstancia(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Mobi mobi = (Mobi) request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		
		String instanciaUriA = request.getParameter("instanciaA");
		String instanciaUriB = request.getParameter("instanciaB");

		Relation relacao = mobi.getAllGenericRelations().get(EditorMMobiConstantes.TEMPORARIO);
		
		InstanceRelation iRelation = relacao.getInstanceRelationMapA().get(instanciaUriA);
		iRelation.getAllInstances().remove(instanciaUriB);
		
		iRelation = relacao.getInstanceRelationMapB().get(instanciaUriB);
		iRelation.getAllInstances().remove(instanciaUriB);		
		
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
		
		for(InstanceRelation instancia : relation.getInstanceRelationMapA().values()){
			mobi.isOneOf(instancia.getInstance(), relation.getClassA());
		}
		
		for(InstanceRelation instancia : relation.getInstanceRelationMapB().values()){
			mobi.isOneOf(instancia.getInstance(), relation.getClassB());
		}

		mobi.addConcept(relation);
		
		List relacionamentos = new ArrayList(mobi.getAllRelations().values());
		request.getSession().setAttribute("relacionamentos", relacionamentos);
		
		ArrayList classes = new ArrayList(mobi.getAllClasses().values());
		request.setAttribute("classes", classes );

		mobi.getAllGenericRelations().put(EditorMMobiConstantes.TEMPORARIO, new GenericRelation());
		
		return mapping.findForward("success");
		
	}

	
	public ActionForward gerarArquivoOWL(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Mobi mobi = (Mobi)request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		
		Mobi2OWL mobi2OWL = new Mobi2OWL("http://www.mobi.edu/", mobi);

		String path = "/home/progoz/mobi/";
		String file = "Dominio.owl";
		
		mobi2OWL.setExportPath(path);
		mobi2OWL.exportMobiToOWL(file);
		
		response.setContentType("application/xml");
		response.setHeader("Content-Disposition", "attachment; filename=" + file);
		
		FileInputStream arquivo = new FileInputStream(path+file);
		ServletOutputStream out = response.getOutputStream();
		 
        byte[] outputByte = new byte[4096];
        //copy binary content to output stream
        while(arquivo.read(outputByte, 0, 4096) != -1){
        	out.write(outputByte, 0, 4096);
        }
        
        arquivo.close();
        out.flush();
        out.close();
        
		return null;
		
	}
	
}
