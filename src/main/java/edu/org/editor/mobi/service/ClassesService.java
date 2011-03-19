package edu.org.editor.mobi.service;

import java.util.List;

import mobi.core.common.Concept;
import mobi.core.concept.Class;

public interface ClassesService {

	Class create();

	List<Class> getAll();

}
