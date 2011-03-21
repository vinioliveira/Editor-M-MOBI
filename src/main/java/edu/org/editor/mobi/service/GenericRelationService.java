package edu.org.editor.mobi.service;

import mobi.core.concept.Class;
import mobi.core.concept.Instance;
import mobi.core.relation.GenericRelation;

public interface GenericRelationService {

	GenericRelation create();

	GenericRelation reset();

	GenericRelation addInstanceGroupA(Instance instance);

	GenericRelation addInstanceGroupB(Instance instance);

	GenericRelation setClassGroupA(Class clazz);

	GenericRelation setClassGroupB(Class clazz);

	GenericRelation createRelationInstance(Instance instanceGroupA, Instance instanceGroubB);

}
