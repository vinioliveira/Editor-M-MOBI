package edu.org.editor.mobi.model;

import java.io.Serializable;

/**
 * @author Vinícius Oliveira
 *
 */

public class User implements Serializable {

	
	
	private static final long serialVersionUID = 8256351799387628267L;
	private String name;
	private String email;
	private String domain;

	public User() {}
	
	public User(String name, String email, String domain) {
		this.name = name;
		this.email = email;
		this.domain = domain;
	}
	
	
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}



	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}



	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}



	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	
	/**
	 * @return the domain
	 */
	public String getDomain() {
		return domain;
	}



	/**
	 * @param email the email to set
	 */
	public void setDomain(String domain) {
		this.domain = domain;
	}
}
