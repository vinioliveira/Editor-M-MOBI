package edu.org.editor.mobi.controller;

import mobi.core.concept.Class;
import br.com.caelum.vraptor.Delete;
import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Put;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.view.Results;
import edu.org.editor.mobi.service.ClassesService;

/**
 * @author Vinícius Oliveira
 *
 */

@Resource
public class ClassesController {

	private ClassesService classService;
	private Result result;
	
	public ClassesController(ClassesService classService, Result result) {
		this.result = result;
		this.classService = classService;
	}

	@Post public void create(String name) throws Exception {
		result.use(Results.json()).from(classService.createWithName(name)).serialize();
	}

	@Get public void list() {
		result.use(Results.json()).from(classService.getAll(),"classes").serialize();
	}

	@Get public void getClass(String name) {
		result.use(Results.json()).from(classService.getByName(name)).serialize();
	}

	@Put public void update(String oldId, Class newClass) throws Exception {
		result.use(Results.json()).from(classService.update(oldId, newClass)).serialize();
	}

	@Delete public void delete(Class class1) {
		result.use(Results.status()).ok();
	}

}
