package edu.org.editor.mobi.test.service;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.HashMap;

import mobi.core.Mobi;
import mobi.core.concept.Instance;
import mobi.core.relation.GenericRelation;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import mobi.core.concept.Class;
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
	private GenericRelation genericRelationReturned;
	private Class simplaClass;
	
	
	
	@Before
	public void setUp(){
		
		MockitoAnnotations.initMocks(this);
		
		this.simpleInstance = new Instance("anonymous");
		this.simplaClass = new Class("anonymous");
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
		genericRelationReturned = genericRelationServiceImpl.reset();
		assertNotNull(genericRelationReturned);
   		assertNull(genericRelationReturned.getClassA());
   		assertNull(genericRelationReturned.getClassB());
   		assertTrue(genericRelationReturned.getInstanceRelationMapA().isEmpty());
   		assertTrue(genericRelationReturned.getInstanceRelationMapB().isEmpty());
   		
	}
	
	@Test public void shouldAddAnNewInstanceIntoGoupA(){

		genericRelationReturned = genericRelationServiceImpl.addInstanceGroupA(simpleInstance);
		assertFalse(genericRelationReturned.getInstanceRelationMapA().isEmpty());
		
	}
	
	@Test public void shouldAddAnNewInstanceIntoGoupB(){

		genericRelationReturned = genericRelationServiceImpl.addInstanceGroupB(simpleInstance);
		assertFalse(genericRelationReturned.getInstanceRelationMapB().isEmpty());
		
	}
	
	@Test public void shouldAddAClassToGroupA(){
		
		genericRelationReturned = genericRelationServiceImpl.setClassGroupA(simplaClass);
		assertNotNull(genericRelationReturned.getClassA());
		assertEquals(simplaClass, genericRelationReturned.getClassA());
		
	}
	
	@Test public void shouldAddAClassToGroupB(){
		
		genericRelationReturned = genericRelationServiceImpl.setClassGroupB(simplaClass);
		assertNotNull(genericRelationReturned.getClassB());
		assertEquals(simplaClass, genericRelationReturned.getClassB());
		
	}
	
	@Test public void shouldAddAnInstanceRelation(){
		
		Instance simpleInstanceB =  new Instance("B");
		genericRelationReturned =  genericRelationServiceImpl.createRelationInstance(simpleInstance, simpleInstanceB);
		assertFalse(genericRelationReturned.getInstanceRelationMapA().isEmpty());
		assertFalse(genericRelationReturned.getInstanceRelationMapB().isEmpty());
		assertTrue(genericRelationReturned.getInstanceRelationMapA().get(simpleInstance.getUri()).getAllInstances().containsKey(simpleInstanceB.getUri()));
		
	}
}
