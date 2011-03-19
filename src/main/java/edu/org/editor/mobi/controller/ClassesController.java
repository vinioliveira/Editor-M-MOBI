package edu.org.editor.mobi.controller;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.view.Results;
import edu.org.editor.mobi.service.ClassesService;


@Resource
public class ClassesController {

	private ClassesService classService;
	private Result result;
	
	public ClassesController(ClassesService classService, Result result) {
		this.result = result;
		this.classService = classService;
	}

	@Get
	public void create() {
		result.use(Results.json()).from(classService.create()).serialize();
	}

	@Get
	public void list() {
		result.use(Results.json()).from(classService.getAll(),"classes").serialize();
	}

}
