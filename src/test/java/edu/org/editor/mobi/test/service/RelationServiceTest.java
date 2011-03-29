package edu.org.editor.mobi.test.service;

import static org.mockito.Mockito.when;
import static junit.framework.Assert.assertEquals; 

import java.util.ArrayList;
import java.util.HashMap;


import mobi.core.Mobi;
import mobi.core.common.Relation;
import mobi.core.relation.CompositionRelation;
import mobi.core.relation.EquivalenceRelation;
import mobi.core.relation.InheritanceRelation;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import edu.org.editor.mobi.service.MobiService;
import edu.org.editor.mobi.service.impl.RelationServiceImpl;

/**
 * @author Vinícius Oliveira
 *
 */
public class RelationServiceTest {
	
	private RelationServiceImpl relationServiceImpl;
	@Mock private Mobi mockMobi;
	@Mock private MobiService mockMobiService;
	private HashMap<String, Relation> relatiobsExamples;
	
	
	@Before
	public void setUp(){
		MockitoAnnotations.initMocks(this);
		
		relatiobsExamples = new HashMap<String, Relation>();
		relatiobsExamples.put("R1", new CompositionRelation("R1"));
		relatiobsExamples.put("R2", new InheritanceRelation("R2"));
		relatiobsExamples.put("R3", new EquivalenceRelation("R3"));
		
		when(mockMobiService.getCurrentMobi()).thenReturn(mockMobi);
		when(mockMobi.getAllRelations()).thenReturn(relatiobsExamples);		
		
		relationServiceImpl = new RelationServiceImpl(mockMobiService);
	}
	
	@Test public void shouldReturnAnEspecificRelationExistent(){
		
		assertEquals(relatiobsExamples.get("R1"), relationServiceImpl.get("R1"));
		
	}
	
	@Test public void shouldReturnAllRelationsExistents(){
		
		assertEquals(new ArrayList<Relation>(relatiobsExamples.values()), relationServiceImpl.getAll());
	}
}
