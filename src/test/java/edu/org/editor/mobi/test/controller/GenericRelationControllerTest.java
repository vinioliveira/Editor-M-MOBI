package edu.org.editor.mobi.test.controller;

import static junit.framework.Assert.assertTrue;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;
import mobi.core.concept.Class;
import mobi.core.concept.Instance;
import mobi.core.relation.GenericRelation;
import mobi.core.relation.InstanceRelation;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import br.com.caelum.vraptor.util.test.MockSerializationResult;
import edu.org.editor.mobi.controller.GenericRelationController;
import edu.org.editor.mobi.service.GenericRelationService;
/**
 * @author Vinícius Oliveira
 *
 */
public class GenericRelationControllerTest {

	@Mock GenericRelationService genericRelationService;
	MockSerializationResult result;
	GenericRelationController controller;
	GenericRelation genericRelationMock;
	InstanceRelation instRelation;
	Instance instance;
	Class clazz ;
	
	@Before public void setUp(){
		
		MockitoAnnotations.initMocks(this);
		result = new MockSerializationResult();
		controller = new GenericRelationController(genericRelationService, result);
		genericRelationMock = new GenericRelation();
		instRelation = new InstanceRelation();
		instance = new Instance("anonymous");
		clazz = new Class("anonymousClass");
	}
	
	@Test public void shoudlCreateANewGenericRelation(){
		
		when(genericRelationService.create()).thenReturn(genericRelationMock);
		controller.create();
		GenericRelation resultObject = result.included("generic");
		assertThat(resultObject, is(Matchers.instanceOf(GenericRelation.class)));
		
	}
	
	@Test public void shoudlResetAGenericRelation(){
		
		when(genericRelationService.reset()).thenReturn(genericRelationMock);
		controller.reset();
		GenericRelation resultObject = result.included("generic");
		assertThat(resultObject, is(Matchers.instanceOf(GenericRelation.class)));
		
	}
	
	@Test public void shouldAddANewInstanceToGroupA(){
		
		instRelation.setInstance(instance);
		genericRelationMock.getInstanceRelationMapA().put("anonymous", instRelation);
		when(genericRelationService.addInstanceGroupA(instance)).thenReturn( genericRelationMock );
		controller.addInstanceGroupA("anonymous");
		GenericRelation genericRelationResult = result.included("generic");
		assertTrue( genericRelationResult.getInstanceRelationMapA().containsKey("anonymous") ); 
		
	}
	
	@Test public void shouldAddANewInstanceToGroupB(){
		
		instRelation.setInstance(instance);
		genericRelationMock.getInstanceRelationMapB().put("anonymous", instRelation);
		when(genericRelationService.addInstanceGroupB(instance)).thenReturn( genericRelationMock );
		controller.addInstanceGroupB("anonymous");
		GenericRelation genericRelationResult = result.included("generic");
		assertTrue( genericRelationResult.getInstanceRelationMapB().containsKey("anonymous") ); 
		
	}
	
	@Test public void shouldSetClssToGroupA(){
		
		genericRelationMock.setClassA(clazz);
		when(genericRelationService.setClassGroupA(clazz)).thenReturn(genericRelationMock);
		controller.setClassGroupA("anonymousClass");
		GenericRelation genericRelationResult = result.included("generic");
		assertEquals(clazz, genericRelationResult.getClassA());
		
	}
	
	@Test public void shouldSetClssToGroupB(){
		
		genericRelationMock.setClassB(clazz);
		when(genericRelationService.setClassGroupB(clazz)).thenReturn(genericRelationMock);
		controller.setClassGroupB("anonymousClass");
		GenericRelation genericRelationResult = result.included("generic");
		assertEquals(clazz, genericRelationResult.getClassB());
		
	}
	
	@Test public void shoudlCreateANewInstanceRelation(){
		
		Instance instance2 = new Instance("anonymous2");
		genericRelationMock.addInstanceRelation(instance, instance2);
		when(genericRelationService.createRelationInstance(instance, instance2)).thenReturn(genericRelationMock);
		controller.createInstanceRelation("anonymous","anonymous2");
		GenericRelation genericRelationResult = result.included("generic");
		assertTrue(genericRelationResult.getValid());
		
	}
}
