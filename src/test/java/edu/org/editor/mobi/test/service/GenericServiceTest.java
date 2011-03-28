package edu.org.editor.mobi.test.service;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.when;

import java.util.HashMap;

import mobi.core.Mobi;
import mobi.core.concept.Instance;
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
	private GenericRelation mockGenericRelation;
	HashMap<String, GenericRelation> genericRelationExamples;
	private Instance simpleInstance;
	private GenericRelation genericRelationReturn;
	
	
	
	@Before
	public void setUp(){
		
		MockitoAnnotations.initMocks(this);
		
		this.simpleInstance = new Instance("anonymous");
		this.mockGenericRelation = new GenericRelation(EditorMobiConstants.TEMP);

		genericRelationExamples = new HashMap<String, GenericRelation>(); 
		genericRelationExamples.put("Anonymous 1", new GenericRelation("Anonymous 1"));
		genericRelationExamples.put("Anonymous 2", new GenericRelation("Anonymous 2"));
		genericRelationExamples.put("Anonymous 3", new GenericRelation("Anonymous 3"));
		genericRelationExamples.put(EditorMobiConstants.TEMP, mockGenericRelation);

		when(mockMobiService.getCurrentMobi()).thenReturn(mockMobi);
		when(mockMobi.getAllGenericRelations()).thenReturn(genericRelationExamples);
		
		this.genericRelationServiceImpl = new GenericRelationServiceImpl(mockMobiService);
	}
	
	@Test public void shuldCreateANewGenericRelationOnKernel() throws Exception{
		
		assertNotNull(genericRelationServiceImpl.create());
	
	}
	
	@Test public void shouldResteTheGenericRelationOnKernel() {
		
		when(mockMobi.createGenericRelation(EditorMobiConstants.TEMP)).thenReturn(new GenericRelation());
		genericRelationReturn = genericRelationServiceImpl.reset();
		assertNotNull(genericRelationReturn);
   		assertNull(genericRelationReturn.getClassA());
   		assertNull(genericRelationReturn.getClassB());
   		assertTrue(genericRelationReturn.getInstanceRelationMapA().isEmpty());
   		assertTrue(genericRelationReturn.getInstanceRelationMapB().isEmpty());
   		
	}
	
	@Test public void shouldAddAnNewInstanceIntoGoupA(){

		genericRelationReturn = genericRelationServiceImpl.addInstanceGroupA(simpleInstance);
		assertFalse(genericRelationReturn.getInstanceRelationMapA().isEmpty());
		
	}
	
	@Test public void shouldAddAnNewInstanceIntoGoupB(){

		genericRelationReturn = genericRelationServiceImpl.addInstanceGroupB(simpleInstance);
		assertFalse(genericRelationReturn.getInstanceRelationMapB().isEmpty());
		
	}
}
