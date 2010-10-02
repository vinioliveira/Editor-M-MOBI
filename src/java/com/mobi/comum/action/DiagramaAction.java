package com.mobi.comum.action;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mobi.core.Mobi;
import mobi.core.common.Relation;
import mobi.core.concept.Instance;
import mobi.core.relation.InheritanceRelation;
import mobi.core.relation.InstanceRelation;

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
		String classeA = request.getParameter("classeA");
		String classeB = request.getParameter("classeB");
		
		Relation relation = null;
		
		if( tipoRelacao.equalsIgnoreCase(EditorMMobiConstantes.HERANCA) ){
			
			relation = mobi.createInheritanceRelation(classeA + classeB);
			relation.setClassA(mobi.getClass(classeA));
			relation.setClassB(mobi.getClass(classeB));
			
			Set<Instance> instancesA =  mobi.getClassInstances(classeA);
			Set<Instance> instancesB =  mobi.getClassInstances(classeB);
			
			for(Instance instance : instancesA){
				
				relation.getInstanceRelationMapA().put(instance.getUri(), new InstanceRelation());
				
			}
			
			for(Instance instance : instancesB){
				
				relation.getInstanceRelationMapB().put(instance.getUri(), new InstanceRelation());
				
			}
			
		}
		
		mobi.addConcept(relation);
		
		List<Relation> relacionamentos = (List<Relation>)request.getSession().getAttribute("relacionamentos");
		if(relacionamentos == null){
			relacionamentos = new ArrayList<Relation>();
		}
		relacionamentos.add(relation);
		
		request.getSession().setAttribute("relacionamentos", relacionamentos);
		
		
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
		String tipoRelacao = request.getParameter("tipoRelacao");
		
		RelacaoForm diagramaForm = (RelacaoForm)form;
		Set<RelationDTO> relacoes =  (Set<RelationDTO>) request.getSession().getAttribute("listaNomeRelacoes");
		
		boolean classeEncontrada = false;
		
		if(relacoes != null){
			for(RelationDTO relacao : relacoes){
				
				if(relacao.getClasseA().equals(nomeClasse)){
					if("classeA".equals(conjunto)){
						
						diagramaForm.getRelacaoDTO().setClasseA(relacao.getClasseA());
						diagramaForm.getRelacaoDTO().setInstanciasA(relacao.getInstanciasA());
						
						for(String instanciaA : relacao.getInstanciasA()){
							diagramaForm.getRelacaoDTO().getRelacionamentosInstancias().put(CONJUNTO_A + " " + instanciaA, new HashSet<String>());
						}
						
					}else{
						
						diagramaForm.getRelacaoDTO().setClasseB(relacao.getClasseA());
						diagramaForm.getRelacaoDTO().setInstanciasB(relacao.getInstanciasA());
						
					}
					diagramaForm.getRelacaoDTO().setTipoRelacao(tipoRelacao);
					classeEncontrada = true;
					
				}
				
				if(relacao.getClasseB().equals(nomeClasse)){
					if("classeA".equals(conjunto)){
						
						diagramaForm.getRelacaoDTO().setClasseA(relacao.getClasseB());
						diagramaForm.getRelacaoDTO().setInstanciasA(relacao.getInstanciasB());
						
						for(String instanciaA : relacao.getInstanciasB()){
							diagramaForm.getRelacaoDTO().getRelacionamentosInstancias().put(CONJUNTO_A + " " + instanciaA, new HashSet<String>());
						}
						
					}else{
						
						diagramaForm.getRelacaoDTO().setClasseB(relacao.getClasseB());
						diagramaForm.getRelacaoDTO().setInstanciasB(relacao.getInstanciasB());
						
					}
					diagramaForm.getRelacaoDTO().setTipoRelacao(tipoRelacao);
					classeEncontrada = true;
				}
				
			}
		}
		
		if(!classeEncontrada){
			if("classeA".equals(conjunto)){
				diagramaForm.getRelacaoDTO().setClasseA(nomeClasse);
			}else{
				diagramaForm.getRelacaoDTO().setClasseB(nomeClasse);
			}
			diagramaForm.getRelacaoDTO().setTipoRelacao(tipoRelacao);
		}
		
		request.setAttribute("relacao", diagramaForm.getRelacaoDTO());
		
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
		
		Set<RelationDTO> relacoes =  (Set<RelationDTO>) request.getSession().getAttribute("listaNomeRelacoes");
		
		IRelacaoService relacaoService = new RelacaoServiceImpl();
		relacaoService.processarRelacoes(relacoes);
		
		return null;
		
	}
	
	
	

}
