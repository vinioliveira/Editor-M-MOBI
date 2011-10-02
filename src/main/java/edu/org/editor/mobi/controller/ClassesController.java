package edu.org.editor.mobi.controller;

import java.util.List;

import mobi.core.concept.Class;
import br.com.caelum.vraptor.Consumes;
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
	
	@Consumes("application/json")
	@Post("/classes") public void create(String uri) throws Exception {
		classService.createWithName(uri);
		result.forwardTo(this).show(uri);
	}

	@Get("/classes") public List<Class> list() {
		List<Class> classes = classService.getAll();
		result.use(Results.json()).withoutRoot().from( classes).serialize();
		return classes;
	}

	@Get("/classes/{uri}") public void show(String uri) {
		Class klass = classService.getByName(uri);
		result.use(Results.json()).withoutRoot().from(klass).serialize();
	}

	@Put("/classes/{uri}") public void update(String oldUri, String newUri) throws Exception {
		result.use(Results.json()).from(classService.update(oldUri, newUri )).serialize();
	}

	@Delete("/classes/{uri}") public void delete(Class class1) {
		result.use(Results.status()).ok();
	}

}
