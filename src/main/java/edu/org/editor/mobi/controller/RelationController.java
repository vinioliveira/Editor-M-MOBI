package edu.org.editor.mobi.controller;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.view.Results;
import edu.org.editor.mobi.service.RelationService;

@Resource
public class RelationController {

	private Result result;
	private RelationService relationService;
	
	public RelationController(RelationService relationService, Result result) {
		this.relationService = relationService;
		this.result = result;
	}

	@Get public void get(String name) {
		result.use(Results.json()).from(relationService.get(name)).serialize();
	}

	@Get public void getAll() {
		result.use(Results.json()).from(relationService.getAll()).serialize();
	}

}
