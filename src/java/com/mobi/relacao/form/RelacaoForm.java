package com.mobi.relacao.form;

import org.apache.struts.action.ActionForm;
import org.apache.struts.upload.FormFile;

public class RelacaoForm extends ActionForm {
	
	private static final long serialVersionUID = 2685916713568679283L;
	
	private FormFile file;
	

	public FormFile getFile() {
		return file;
	}

	public void setFile(FormFile file) {
		this.file = file;
	}

	public RelacaoForm(){
		inicializarObjetosInternos();
	}
	
	private void inicializarObjetosInternos() {
		
	}

	
	public void reset(){
	}

}
