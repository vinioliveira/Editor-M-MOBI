package com.mobi.relacao.form;

import java.io.Serializable;

public class RelacionamentoDTO implements Serializable{
	
	private static final long serialVersionUID = -7022237458326022823L;
	private String classeA;
	private String classeB;
	private String tipoRelacao;
	private String ida;
	private String volta;
	
	public RelacionamentoDTO(String classeA, String classeB) {
		super();
		this.classeA = classeA;
		this.classeB = classeB;
	}
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
	public String getTipoRelacao() {
		return tipoRelacao;
	}
	public void setTipoRelacao(String tipoRelacao) {
		this.tipoRelacao = tipoRelacao;
	}
	public String getIda() {
		return ida;
	}
	public void setIda(String ida) {
		this.ida = ida;
	}
	public String getVolta() {
		return volta;
	}
	public void setVolta(String volta) {
		this.volta = volta;
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
		RelacionamentoDTO other = (RelacionamentoDTO) obj;
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
