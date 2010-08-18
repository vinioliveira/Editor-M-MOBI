package com.mobi.relacao.form;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class RelationDTO implements Serializable {
	
	private static final long serialVersionUID = 3692563395434568337L;
	
	private String classeA;
	private String classeB;
	private Set<String> instanciasA = new HashSet<String>();
	private Set<String> instanciasB = new HashSet<String>();
	private String tipoRelacao;
	private String nomeRelacao;
	private List<RelacionamentoDTO> relacionamentoClasses = new ArrayList<RelacionamentoDTO>();
	private Map<String, Set<String>> relacionamentosInstancias = new HashMap<String, Set<String>>();
	
	public String getClasseA() {
		return classeA;
	}
	public void setClasseA(String classeA) {
		this.classeA = classeA;
	}
	public String getClasseB() {
		return classeB;
	}
	public void setClasseB(String classeB) {
		this.classeB = classeB;
	}
	public Set<String> getInstanciasA() {
		return instanciasA;
	}
	public void setInstanciasA(Set<String> instanciasA) {
		this.instanciasA = instanciasA;
	}
	public Set<String> getInstanciasB() {
		return instanciasB;
	}
	public void setInstanciasB(Set<String> instanciasB) {
		this.instanciasB = instanciasB;
	}
	public String getTipoRelacao() {
		return tipoRelacao;
	}
	public void setTipoRelacao(String tipoRelacao) {
		this.tipoRelacao = tipoRelacao;
	}
	public String getNomeRelacao() {
		return getClasseA() + " " + getClasseB();
	}
	public void setNomeRelacao(String nomeRelacao) {
		this.nomeRelacao = nomeRelacao;
	}
	public List<RelacionamentoDTO> getRelacionamentoClasses() {
		return relacionamentoClasses;
	}
	public void setRelacionamentoClasses(
			List<RelacionamentoDTO> relacionamentoClasses) {
		this.relacionamentoClasses = relacionamentoClasses;
	}
	public Map<String, Set<String>> getRelacionamentosInstancias() {
		return relacionamentosInstancias;
	}
	public void setRelacionamentosInstancias(
			HashMap<String, Set<String>> relacionamentosInstancias) {
		this.relacionamentosInstancias = relacionamentosInstancias;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((classeA == null) ? 0 : classeA.hashCode());
		result = prime * result + ((classeB == null) ? 0 : classeB.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RelationDTO other = (RelationDTO) obj;
		if (classeA == null) {
			if (other.classeA != null)
				return false;
		} else if (!classeA.equals(other.classeA))
			return false;
		if (classeB == null) {
			if (other.classeB != null)
				return false;
		} else if (!classeB.equals(other.classeB))
			return false;
		return true;
	}
	
	
}
