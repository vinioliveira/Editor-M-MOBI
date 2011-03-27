package edu.org.editor.mobi.service;

import java.util.List;

import mobi.core.concept.Class;
/**
 * @author Vinícius Oliveira
 *
 */
public interface ClassesService {


	List<Class> getAll();

	Class getByName(String string);

	Class createWithName(String name) throws Exception;

	Class update(String oldId, Class newClass) throws Exception;

	Boolean destroy(Class clazz);

}
