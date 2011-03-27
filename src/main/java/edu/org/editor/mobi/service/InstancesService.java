package edu.org.editor.mobi.service;

import java.util.List;

import mobi.core.concept.Instance;
/**
 * @author Vinícius Oliveira
 *
 */
public interface InstancesService {

	Instance getByName(String name);

	Instance createWithName(String name) throws Exception;

	List<Instance> getAll();

	Boolean destroy(Instance instance);

	Instance update(String oldId, Instance instance) throws Exception;

}
