package com.mobi.comum.action.download;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mobi.core.Mobi;
import mobi.core.concept.Instance;
import mobi.extension.export.owl.Mobi2OWL;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DownloadAction;

import com.mobi.comum.util.EditorMMobiConstantes;

public class MobiDownloadAction extends DownloadAction{

	@Override
    protected StreamInfo getStreamInfo(ActionMapping mapping, ActionForm form, HttpServletRequest request,
            HttpServletResponse response) throws Exception {
		
		Mobi mobi = (Mobi)request.getSession().getAttribute(EditorMMobiConstantes.MOBI);
		
		String email = request.getParameter("email");
		String dominio = request.getParameter("dominio");
		
		
		//limpar instancias exemplos 
		List<Instance> listInstances = new ArrayList<Instance>(mobi.getAllInstances().values());
		for(Instance instance : listInstances){
			if(mobi.getInstanceClasses(instance) == null){
				mobi.destroyConcept(instance);
			}
		}
		
		Mobi2OWL mobi2OWL = new Mobi2OWL("http://www.mobi.edu/", mobi);

		String path = getServlet().getServletContext().getRealPath("/")+"owl/";
		String fileName = email+"-"+dominio+".owl";
		
		mobi2OWL.setExportPath(path);
		mobi2OWL.exportMobiToOWL(fileName);
		
        File file = new File(path+fileName);
		
		return new FileStreamInfo("text/xml", file);
        
	}
	

}
		
