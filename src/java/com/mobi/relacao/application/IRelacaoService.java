package com.mobi.relacao.application;

import java.util.Set;

import com.mobi.relacao.form.RelationDTO;

public interface IRelacaoService {
	
	public void processarRelacoes(Set<RelationDTO> relacoes);

}
