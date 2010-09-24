package com.mobi.comum.action;

import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.mobi.relacao.form.RelacaoForm;

public class EditarInstanciaAction extends Action {
	
	private static final String CONJUNTO_A = "ConjuntoA"; //TODO Criar uma classe para as constantes
	private static final String CONJUNTO_B = "ConjuntoB";

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		RelacaoForm relacaoForm = (RelacaoForm)form;
		
		String nomeNovo = request.getParameter("nomeNovo");
		String nomeAntigo = request.getParameter("nomeAntigo");
		String conjunto = request.getParameter("conjunto");
		
		if("ConjuntoA".equals(conjunto)){
			
			relacaoForm.getRelacaoDTO().getInstanciasA().remove(nomeAntigo);
			relacaoForm.getRelacaoDTO().getInstanciasA().add(nomeNovo);
			
			Set<String> instancias = relacaoForm.getRelacaoDTO().getRelacionamentosInstancias().get(CONJUNTO_A + " " + nomeAntigo);
			relacaoForm.getRelacaoDTO().getRelacionamentosInstancias().remove(CONJUNTO_A + " " + nomeAntigo);
			relacaoForm.getRelacaoDTO().getRelacionamentosInstancias().put(CONJUNTO_A + " " + nomeNovo, instancias);
			
			
		}else{
			
			relacaoForm.getRelacaoDTO().getInstanciasB().remove(nomeAntigo);
			relacaoForm.getRelacaoDTO().getInstanciasB().add(nomeNovo);
			
			Set<String> instancias = relacaoForm.getRelacaoDTO().getRelacionamentosInstancias().get(CONJUNTO_B + " " + nomeAntigo );
			relacaoForm.getRelacaoDTO().getRelacionamentosInstancias().remove(CONJUNTO_B + " " + nomeAntigo );
			relacaoForm.getRelacaoDTO().getRelacionamentosInstancias().put(CONJUNTO_A + " " + nomeNovo, instancias);
			
		}
		
		for(Entry<String, Set<String>> entry : relacaoForm.getRelacaoDTO().getRelacionamentosInstancias().entrySet()){

			if(entry.getValue().contains(nomeAntigo)){
				entry.getValue().remove(nomeAntigo);
				entry.getValue().add(nomeNovo);
			}
			
		}
		
		return null;
	}
	
	

}
