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

	private User (String name){
		this.name=name;
	}
	
	public static User withName(String name){
		  return new User(name);
	}

	public User andEmail(String email){
		
		this.email = email;
		
		return this;
	}
	
	public static User anonymousUser(){
		return User.withName("Anonymous").andEmail("anonymous@mobi.org.edu");
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
}
