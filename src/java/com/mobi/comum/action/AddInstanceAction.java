package com.mobi.comum.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mobi.core.Mobi;
import mobi.core.concept.Class;
import mobi.core.concept.Instance;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.mockito.internal.verification.NoMoreInteractions;

public class AddInstanceAction extends Action {
	
	private static final String CONJUNTO_A = "ConjuntoA";
	private static final String CONJUNTO_B = "ConjuntoB";

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		//String instanceSet = request.getParameter("conjunto");
		String nameInstance = request.getParameter("nomeIstancia");
		String nameClass = request.getParameter("nameClass");
		
		Mobi mobi =  (Mobi) request.getSession().getAttribute("mobi");
		
		Instance instance = new Instance(nameInstance);
		Class clazz = mobi.getClass(nameClass) != null ?  mobi.getClass(nameClass) : new Class(nameClass) ; 

		mobi.addConcept(instance);
		mobi.addConcept(clazz);
		mobi.isOneOf(instance, clazz);
		
		request.getSession().setAttribute("mobi", mobi);
		
		return null;
	}

}
