package com.mobi.comum.action;

import java.util.HashSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mobi.core.Mobi;
import mobi.core.concept.Class;
import mobi.core.concept.Instance;

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
		
		
		/*Mobi mobi =  (Mobi) request.getSession().getAttribute("mobi");
		
		//TODO Refatorar para que o o objeto mobi nunca esteja nulo
		if(mobi == null){
			mobi = new Mobi("Dominio");
		}
		
		String nameInstance = request.getParameter("nomeIstancia");
		String nameClass = request.getParameter("nameClass");
		
		Instance instance = new Instance(nameInstance);
		mobi.addConcept(instance);
		
		if(mobi.getClass(nameClass) == null){
			mobi.addConcept(new Class(nameClass));
		}
		
		
		request.getSession().setAttribute("mobi", mobi);*/
		
		RelacaoForm diagramaForm = (RelacaoForm)form;
		String instanceSet = request.getParameter("conjunto");
		String nameInstance = request.getParameter("nomeIstancia");
		String nameClass = request.getParameter("nameClass");
		
		if(CONJUNTO_A.equals(instanceSet)){
			
			if(diagramaForm.getRelacaoDTO().getClasseA() == null){
				diagramaForm.getRelacaoDTO().setClasseA(nameClass);
			}
			diagramaForm.getRelacaoDTO().getInstanciasA().add(nameInstance);
			diagramaForm.getRelacaoDTO().getRelacionamentosInstancias().put(CONJUNTO_A + " " + nameInstance, new HashSet<String>());
		}
		
		if(CONJUNTO_B.equals(instanceSet)){
			
			if(diagramaForm.getRelacaoDTO().getClasseB() == null){
				diagramaForm.getRelacaoDTO().setClasseB(nameClass);
			}
			diagramaForm.getRelacaoDTO().getInstanciasB().add(nameInstance);
			diagramaForm.getRelacaoDTO().getRelacionamentosInstancias().put(CONJUNTO_B + " " + nameInstance, new HashSet<String>());
		}
		
		return null;
	}

}
