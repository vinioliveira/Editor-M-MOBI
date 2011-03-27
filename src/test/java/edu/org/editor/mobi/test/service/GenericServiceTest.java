package edu.org.editor.mobi.test.service;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.when;

import java.util.HashMap;

import mobi.core.Mobi;
import mobi.core.relation.GenericRelation;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import edu.org.editor.mobi.service.EditorMobiConstants;
import edu.org.editor.mobi.service.MobiService;
import edu.org.editor.mobi.service.impl.GenericRelationServiceImpl;

/**
 * @author Vinícius Oliveira
 *
 */
public class GenericServiceTest {
	
	private GenericRelationServiceImpl genericRelationServiceImpl;
	@Mock private Mobi mockMobi;
	@Mock private MobiService mockMobiService;
	HashMap<String, GenericRelation> genericRelationExamples;
	
	@Before
	public void setUp(){
		
		MockitoAnnotations.initMocks(this);
		when(mockMobiService.getCurrentMobi()).thenReturn(mockMobi);
		this.genericRelationServiceImpl = new GenericRelationServiceImpl(mockMobiService);
		genericRelationExamples = new HashMap<String, GenericRelation>(); 
		genericRelationExamples.put("Anonymous 1", new GenericRelation("Anonymous 1"));
		genericRelationExamples.put("Anonymous 2", new GenericRelation("Anonymous 2"));
		genericRelationExamples.put("Anonymous 3", new GenericRelation("Anonymous 3"));
		genericRelationExamples.put(EditorMobiConstants.TEMP, new GenericRelation(EditorMobiConstants.TEMP));
	
	}
	
	@Test public void shuldCreateANewGenericRelationOnKernel() throws Exception{
		
		when(mockMobi.getAllGenericRelations()).thenReturn(genericRelationExamples);
		assertNotNull(genericRelationServiceImpl.create());
	
	}
	
	@Test public void shouldResteTheGenericRelationOnKernel() {
		
		when(mockMobi.createGenericRelation(EditorMobiConstants.TEMP)).thenReturn(new GenericRelation());
		GenericRelation genericRelationReturn = genericRelationServiceImpl.reset();
		assertNotNull(genericRelationReturn);
   		assertNull(genericRelationReturn.getClassA());
   		assertNull(genericRelationReturn.getClassB());
   		assertTrue(genericRelationReturn.getInstanceRelationMapA().isEmpty());
   		assertTrue(genericRelationReturn.getInstanceRelationMapB().isEmpty());
   		
	}
	 
}
