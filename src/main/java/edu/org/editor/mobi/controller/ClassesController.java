package edu.org.editor.mobi.controller;

import java.util.List;

import net.vidageek.mirror.dsl.ClassController;

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

	@Post("/classes") public void create(String name) throws Exception {
		result.use(Results.json()).from(classService.createWithName(name)).serialize();
		result.redirectTo(ClassesController.class).list();
	}

	@Get("/classes") public List<Class> list() {
		List<Class> classes = classService.getAll();
		result.use(Results.json()).withoutRoot().from( classes).serialize();
		return classes;
	}

	@Get("/classes/{uri}") public Class show(String name) {
		Class klass = classService.getByName(name);
		result.use(Results.json()).from(klass).serialize();
		return klass;
	}

	@Put("/classes/{uri}") public void update(String oldId, Class newClass) throws Exception {
		result.use(Results.json()).from(classService.update(oldId, newClass)).serialize();
	}

	@Delete("/classes/{uri}") public void delete(Class class1) {
		result.use(Results.status()).ok();
	}

}
