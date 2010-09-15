package com.mobi.comum.action;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.MappingDispatchAction;

import com.mobi.relacao.application.IRelacaoService;
import com.mobi.relacao.application.impl.RelacaoServiceImpl;
import com.mobi.relacao.form.RelacaoForm;
import com.mobi.relacao.form.RelacionamentoDTO;
import com.mobi.relacao.form.RelationDTO;


public class DiagramaAction extends MappingDispatchAction {
	
	private static final String CONJUNTO_A = "ConjuntoA";

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
		
		diagramaForm.reset();
		
		return mapping.findForward("success");
		
	}
	
	@SuppressWarnings("unchecked")
	public ActionForward salvarRelacoes(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String tipoRelacao = request.getParameter("tipoRelacao");
		String classeA = request.getParameter("classeA");
		String classeB = request.getParameter("classeB");
		RelacaoForm diagramaForm = (RelacaoForm)form;
		diagramaForm.getRelacaoDTO().setTipoRelacao(tipoRelacao);
		diagramaForm.getRelacaoDTO().setClasseA(classeA);
		diagramaForm.getRelacaoDTO().setClasseB(classeB);
		
		IRelacaoService relacaoService = new RelacaoServiceImpl();
		relacaoService.processarRelacoes(diagramaForm.getRelacaoDTO());
		
		List<RelacionamentoDTO> relacionamentos = (List<RelacionamentoDTO>)request.getSession().getAttribute("relacionamentos");
		
		if(relacionamentos == null){
			relacionamentos = new ArrayList<RelacionamentoDTO>();
		}
		
		RelationDTO relacao = diagramaForm.getRelacaoDTO();  
		RelacionamentoDTO relacao0 = new RelacionamentoDTO(relacao.getClasseA(),relacao.getClasseB());
		relacao0.setTipoRelacao(relacao.getTipoRelacao());
		
		if(!relacionamentos.contains(relacao0)){
			relacionamentos.add(relacao0);
		}
		
		request.getSession().setAttribute("relacionamentos", relacionamentos);
		
		Set<RelationDTO> relacoes =  (Set<RelationDTO>) request.getSession().getAttribute("listaNomeRelacoes");
		if(relacoes == null){
			relacoes = new HashSet<RelationDTO>();
		}
		
		relacoes.add(diagramaForm.getRelacaoDTO());
		
		request.getSession().setAttribute("listaNomeRelacoes", relacoes);
		
		diagramaForm.reset();
		
		return mapping.findForward("success");
		
	}
	
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
	
	@SuppressWarnings("unchecked")
	public ActionForward carregarRelacao(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		RelacaoForm diagramaForm = (RelacaoForm)form;
 		String classeA = request.getParameter("classeA");
		String classeB = request.getParameter("classeB");
		String tipoRelacao = request.getParameter("tipoRelacao");
		Set<RelationDTO> relacoes =  (Set<RelationDTO>) request.getSession().getAttribute("listaNomeRelacoes");
		
		RelationDTO relacao = new RelationDTO();
		relacao.setClasseA(classeA);
		relacao.setClasseB(classeB);
		relacao.setTipoRelacao(tipoRelacao);
		
		List<RelationDTO> relacoesAux = new ArrayList<RelationDTO>(relacoes);
		relacao = relacoesAux.get(relacoesAux.indexOf(relacao));
		diagramaForm.setRelacaoDTO(relacao);
		request.setAttribute("relacao", relacao);
		
		return mapping.findForward("success");
		
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
	

}
