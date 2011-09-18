package edu.org.editor.mobi.service;

import mobi.core.Mobi;
import edu.org.editor.mobi.model.User;

/**
 * @author Vinícius Oliveira
 *
 */
public interface MobiService {

	public Object getCurrentUser();
	
	public Mobi getCurrentMobi();
	
	public void setUser(User user);
	
	public void mobiDomain(String name);
	
	public Boolean isActive();

}
