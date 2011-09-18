package edu.org.editor.mobi.service.impl;

import java.io.Serializable;

import javax.annotation.PostConstruct;

import mobi.core.Mobi;
import br.com.caelum.vraptor.ioc.Component;
import br.com.caelum.vraptor.ioc.SessionScoped;
import edu.org.editor.mobi.model.User;
import edu.org.editor.mobi.service.MobiService;

/**
 * @author Vinícius Oliveira
 *
 */
@SessionScoped
@Component
@SuppressWarnings("unused")
public class MobiServiceImpl implements MobiService, Serializable{

		
	private static final long serialVersionUID = -5556995386330353203L;
	
	private Mobi mobi;
	private User currentUser;

	public void setUser(User user){
		this.currentUser = user;
	}
	
	public void mobiDomain(String name){
		this.mobi = new Mobi(name);
	}
	
	public User getCurrentUser() {
		return currentUser;
	}
	
	public Mobi getCurrentMobi() {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	public Boolean isActive(){
		return (currentUser != null && mobi != null);
	}

}
