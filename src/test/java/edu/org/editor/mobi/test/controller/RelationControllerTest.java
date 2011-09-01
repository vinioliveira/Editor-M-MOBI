package edu.org.editor.mobi.test.controller;

import static junit.framework.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import mobi.core.common.Relation;
import mobi.core.relation.CompositionRelation;
import mobi.core.relation.EquivalenceRelation;
import mobi.core.relation.InheritanceRelation;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import br.com.caelum.vraptor.util.test.MockSerializationResult;
import edu.org.editor.mobi.controller.RelationController;
import edu.org.editor.mobi.service.RelationService;
/**
 * @author Vinícius Oliveira
 *
 */
public class RelationControllerTest {
	
	MockSerializationResult result;
	@Mock RelationService relationService;
	RelationController controller;
	List<Relation> relationsExamples;
	
	@Before public void setUp(){
		
		MockitoAnnotations.initMocks(this);
		result = new MockSerializationResult();
		controller = new RelationController(relationService, result);

		relationsExamples = new ArrayList<Relation>(); 
		relationsExamples.add(new CompositionRelation("R1"));
		relationsExamples.add(new InheritanceRelation("R2"));
		relationsExamples.add(new EquivalenceRelation("R3"));
	}
	
	@Test public void shouldRetrieveAnExistentRelation() throws Exception {
		
		when(relationService.get("R1")).thenReturn(relationsExamples.get(0));
		controller.get("R1");
		String expectedResult = "{\"valid\": true,\"uri\": \"R1\",\"type\": 0,\"cardinalityA\": {\"type\": 0,\"maxCardinality\": 0,\"minCardinality\": 0},\"cardinalityB\": {\"type\": 0,\"maxCardinality\": 0,\"minCardinality\": 0},\"instanceRelationMapA\": [],\"instanceRelationMapB\": []}";
		assertEquals(expectedResult, result.serializedResult());
		
	}
	
	@Test public void shouldRetrievAllExistensRelations() throws Exception {
		
		when(relationService.getAll()).thenReturn(relationsExamples);
		controller.getAll();
		String expectedResult = "[{\"valid\": true,\"uri\": \"R1\",\"type\": 0,\"cardinalityA\": {\"type\": 0,\"maxCardinality\": 0,\"minCardinality\": 0},\"cardinalityB\": {\"type\": 0,\"maxCardinality\": 0,\"minCardinality\": 0},\"instanceRelationMapA\": [],\"instanceRelationMapB\": []},{\"valid\": true,\"uri\": \"R2\",\"type\": 0,\"cardinalityA\": {\"type\": 0,\"maxCardinality\": 0,\"minCardinality\": 0},\"cardinalityB\": {\"type\": 0,\"maxCardinality\": 0,\"minCardinality\": 0},\"instanceRelationMapA\": [],\"instanceRelationMapB\": []},{\"valid\": true,\"uri\": \"R3\",\"type\": 0,\"cardinalityA\": {\"type\": 0,\"maxCardinality\": 0,\"minCardinality\": 0},\"cardinalityB\": {\"type\": 0,\"maxCardinality\": 0,\"minCardinality\": 0},\"instanceRelationMapA\": [],\"instanceRelationMapB\": []}]";
		assertEquals(expectedResult, result.serializedResult());
		
	}
}
