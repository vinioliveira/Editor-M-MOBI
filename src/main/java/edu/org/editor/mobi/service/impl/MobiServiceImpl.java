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
	
	@PostConstruct
	public void create(){
		mobi = new Mobi("AnonimoDomain");
		currentUser = User.anonymousUser();
	}
	
	@Override
	public User getCurrentUser() {
		return currentUser;
	}

	@Override
	public Mobi getCurrentMobi() {
		// TODO Auto-generated method stub
		return null;
	}
}
