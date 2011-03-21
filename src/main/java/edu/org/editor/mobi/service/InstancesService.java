package edu.org.editor.mobi.service;

import java.util.List;

import mobi.core.concept.Instance;

public interface InstancesService {

	Instance getByName(String name);

	Instance createWithName(String name);

	List<Instance> getAll();

	Instance update(Instance instance);

	Boolean delete(Instance instance);

}
