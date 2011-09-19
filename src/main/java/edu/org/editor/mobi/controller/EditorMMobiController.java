package edu.org.editor.mobi.controller;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.Validator;
import br.com.caelum.vraptor.validator.Validations;
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
	private Validator validator;
	private MobiService mobiService;
		
	public EditorMMobiController(MobiService mobiService, Result result, Validator validator){
		this.result = result;
		this.mobiService = mobiService;
		this.validator = validator;
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
	public void form(final User user){
		
		validator.checking(new Validations() {{
			that(!user.getDomain().isEmpty() || !user.getName().isEmpty() || !user.getEmail().isEmpty(), 
						"user.name","message.blank", i18n("message.all.elements"));
		}});
		
		validator.onErrorUsePageOf(EditorMMobiController.class).auth();
		
		mobiService.setUser(user);
		mobiService.mobiDomain(user.getDomain());
		result.redirectTo("/");
	}
	
	@Get("/current_user")
	public void getCurrentUser(){
		result.use(Results.json()).withoutRoot().from( mobiService.getCurrentUser()).serialize();
	}
}
