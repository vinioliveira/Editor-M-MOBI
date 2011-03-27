package edu.org.editor.mobi.controller;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
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
		
	@Get("/home")
	public void index(){
		result.include(mobiService.getCurrentUser());
	}
		
}
