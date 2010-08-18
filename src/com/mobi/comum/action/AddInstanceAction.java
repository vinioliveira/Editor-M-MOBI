package com.mobi.comum.action;

import java.util.HashSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.mobi.relacao.form.RelacaoForm;

public class AddInstanceAction extends Action {
	
	private static final String CONJUNTO_A = "ConjuntoA";
	private static final String CONJUNTO_B = "ConjuntoB";

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String nomeInstancia = request.getParameter("nomeIstancia");
		String conjuntoInstancia = request.getParameter("conjunto");
		String nomeClass = request.getParameter("nameClass");
		
		RelacaoForm diagramaForm = (RelacaoForm)form;
		
		if(CONJUNTO_A.equals(conjuntoInstancia)){
			if(diagramaForm.getRelacaoDTO().getClasseA() == null){
				diagramaForm.getRelacaoDTO().setClasseA(nomeClass);
			}
			diagramaForm.getRelacaoDTO().getInstanciasA().add(nomeInstancia);
			diagramaForm.getRelacaoDTO().getRelacionamentosInstancias().put(CONJUNTO_A + " " + nomeInstancia, new HashSet<String>());
		}
		
		if(CONJUNTO_B.equals(conjuntoInstancia)){
			if(diagramaForm.getRelacaoDTO().getClasseB() == null){
				diagramaForm.getRelacaoDTO().setClasseB(nomeClass);
			}
			diagramaForm.getRelacaoDTO().getInstanciasB().add(nomeInstancia);
			diagramaForm.getRelacaoDTO().getRelacionamentosInstancias().put(CONJUNTO_B + " " + nomeInstancia, new HashSet<String>());
		}
		
		return null;
	}

}
