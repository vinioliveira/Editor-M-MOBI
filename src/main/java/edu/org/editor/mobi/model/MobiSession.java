package edu.org.editor.mobi.model;

import mobi.core.Mobi;

public class MobiSession {

	private User user;
	private Mobi mobi;
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Mobi getMobi() {
		return mobi;
	}
	public void setMobi(Mobi mobi) {
		this.mobi = mobi;
	}
	
}
