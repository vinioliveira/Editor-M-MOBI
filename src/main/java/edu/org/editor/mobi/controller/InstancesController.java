package edu.org.editor.mobi.controller;

import mobi.core.concept.Instance;
import br.com.caelum.vraptor.Delete;
import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Put;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.view.Results;
import edu.org.editor.mobi.service.InstancesService;

/**
 * @author Vinícius Oliveira
 *
 */
@Resource
public class InstancesController {

	private Result result; 
	private InstancesService instanceService;
	
	public InstancesController(InstancesService instanceService, Result result) {
		this.result=  result; 
		this.instanceService = instanceService;
	}

	@Get public void getInstance(String name) {
		result.use(Results.json()).from(instanceService.getByName(name)).serialize();
	}

	@Post public void create(String name) throws Exception {
		result.use(Results.json()).from(instanceService.createWithName(name)).serialize();
	}

	@Get public void list() {
		result.use(Results.json()).from(instanceService.getAll(), "instances").serialize();
	}

	@Put public void update(String oldId,Instance instance) throws Exception {
		result.use(Results.json()).from(instanceService.update(oldId,instance)).serialize();
	}

	@Delete	public void delete(Instance instance) {
		result.use(Results.status()).ok();
	}

}
