package edu.org.editor.mobi.service;

import java.util.List;

import mobi.core.common.Relation;

public interface RelationService {

	Relation get(String string);

	List<Relation> getAll();

}
