package edu.org.editor.mobi.service;

import java.util.List;

import mobi.core.concept.Class;

public interface ClassesService {


	List<Class> getAll();

	Class getByName(String string);

	Class createWithName(String name);

	Class update(Class newClass);

	Boolean delete(Class clazz);

}
