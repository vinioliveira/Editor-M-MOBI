package edu.org.editor.mobi.controller;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.view.Results;
import edu.org.editor.mobi.model.User;
import edu.org.editor.mobi.service.MobiService;

/**
 * @author Vinícius Oliveira
 *
 */

@Resource
public class EditorMMobiController {
	
	private Result result;
	
	private MobiService mobiService;
		
	public EditorMMobiController(MobiService mobiService, Result result){
		this.result = result;
		this.mobiService = mobiService;
	}
		
	@Get("/")
	public void index(){
		if(mobiService.getCurrentUser() != null){
			result.include(mobiService.getCurrentUser());
		}
	}
	
	@Get("/auth")
	public void auth(){}
	
	
	@Post("/auth")
	public void form(User user){
		mobiService.setUser(user);
		mobiService.mobiDomain(user.getDomain());
		result.redirectTo("/");
	}
	
	@Get("/current_user")
	public void getCurrentUser(){
		result.use(Results.json()).withoutRoot().from( mobiService.getCurrentUser()).serialize();
	}
}
