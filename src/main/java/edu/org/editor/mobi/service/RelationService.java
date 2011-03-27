package edu.org.editor.mobi.service;

import java.util.List;

import mobi.core.common.Relation;
/**
 * @author Vinícius Oliveira
 *
 */
public interface RelationService {

	Relation get(String string);

	List<Relation> getAll();

}
