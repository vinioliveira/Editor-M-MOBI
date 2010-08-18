package com.mobi.relacao.form;

import org.apache.struts.action.ActionForm;

public class RelacaoForm extends ActionForm {
	
	private static final long serialVersionUID = 2685916713568679283L;
	
	private RelationDTO relacaoDTO;
	
	public RelacaoForm(){
		inicializarObjetosInternos();
	}
	
	private void inicializarObjetosInternos() {
		if(this.relacaoDTO == null){
			relacaoDTO = new RelationDTO();
		}
		
	}

	public RelationDTO getRelacaoDTO() {
		return relacaoDTO;
	}

	public void setRelacaoDTO(RelationDTO relacaoDTO) {
		this.relacaoDTO = relacaoDTO;
	}
	
	public void reset(){
		this.setRelacaoDTO(new RelationDTO());
	}

}
