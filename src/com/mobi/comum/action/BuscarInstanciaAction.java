package com.mobi.comum.action;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.mobi.relacao.form.RelacaoForm;
import com.mobi.relacao.form.RelationDTO;

public class BuscarInstanciaAction extends Action {
	
	private static final String CONJUNTO_A = "ConjuntoA"; //TODO Criar uma classe para as constantes
	
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String nomeClasse = request.getParameter("nomeClasse");
		String conjunto = request.getParameter("conjunto");
		RelacaoForm diagramaForm = (RelacaoForm)form;
		
		Set<RelationDTO> relacoes =  (Set<RelationDTO>) request.getSession().getAttribute("listaNomeRelacoes");
		
		for(RelationDTO relacao : relacoes){
			
			if(relacao.getClasseA().equals(nomeClasse)){
				
				if(CONJUNTO_A.equals(conjunto)){
					diagramaForm.getRelacaoDTO().setClasseA(relacao.getClasseA());
					diagramaForm.getRelacaoDTO().setInstanciasA(relacao.getInstanciasA());
				}else{
					diagramaForm.getRelacaoDTO().setClasseB(relacao.getClasseB());
					diagramaForm.getRelacaoDTO().setInstanciasB(relacao.getInstanciasB());
				}
				
			}
			
		}
		
		return mapping.findForward("sucess");
	}
	
}
