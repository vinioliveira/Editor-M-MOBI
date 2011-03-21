package edu.org.editor.mobi.controller;

import mobi.core.concept.Class;
import mobi.core.concept.Instance;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Put;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import edu.org.editor.mobi.service.GenericRelationService;

@Resource
public class GenericRelationController {

	private GenericRelationService genericRelationService;
	private Result result;
	
	public GenericRelationController(GenericRelationService genericRelationService,	Result result) {
		this.result = result ;
		this.genericRelationService = genericRelationService;
	}

	@Post public void create() {
		result.include("generic",genericRelationService.create());
	}

	@Put public void reset() {
		result.include("generic",genericRelationService.reset());
	}

	@Post public void addInstanceGroupA(String name) {
		result.include("generic", genericRelationService.addInstanceGroupA(new Instance(name)));		
	}

	@Post public void addInstanceGroupB(String name) {
		result.include("generic", genericRelationService.addInstanceGroupB(new Instance(name)));
	}

	@Post public void setClassGroupA(String name) {
		result.include("generic", genericRelationService.setClassGroupA(new Class(name)));
	}

	@Post public void setClassGroupB(String name) {
		result.include("generic", genericRelationService.setClassGroupB(new Class(name)));
	}

	@Post public void createInstanceRelation(String instanceGroupA, String instanceGroupB) {
		result.include("generic", genericRelationService.createRelationInstance(new Instance(instanceGroupA), new Instance(instanceGroupB)));
	}

}
