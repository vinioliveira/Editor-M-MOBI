package edu.org.editor.mobi.test.controller;

import static junit.framework.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import mobi.core.concept.Instance;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import br.com.caelum.vraptor.util.test.MockSerializationResult;
import edu.org.editor.mobi.controller.InstancesController;
import edu.org.editor.mobi.service.InstancesService;
/**
 * @author Vinícius Oliveira
 *
 */
public class InstanceControllerTest {

	MockSerializationResult result;
	@Mock InstancesService instancesService;
	InstancesController controller;
	List<Instance> instancesExamples;
	
	@Before public void setUp(){
		MockitoAnnotations.initMocks(this);
		result = new MockSerializationResult();
		controller = new InstancesController(instancesService, result);

		instancesExamples = new ArrayList<Instance>(); 
		instancesExamples.add(new Instance("Anonymous 1"));
		instancesExamples.add(new Instance("Anonymous 2"));
		instancesExamples.add(new Instance("Anonymous 3"));
	}
	
	@Test public void shouldReturnAnSpecificClassByName() throws Exception {
		
		when(instancesService.getByName("anonymous")).thenReturn(new Instance("anonymous"));
		controller.getInstance("anonymous");
		String expectedResult = "{\"instance\": {\"valid\": true,\"uri\": \"anonymous\"}}";
		assertEquals(expectedResult, result.serializedResult());
	}
	
	
	@Test public void shouldReturnAJSONWithANewClass() throws Exception{
		
		when(instancesService.createWithName("Anonymous 1")).thenReturn(instancesExamples.get(0));
		controller.create("Anonymous 1");
		String expectedResult = "{\"instance\": {\"valid\": true,\"uri\": \"Anonymous 1\"}}";
		assertEquals(expectedResult, result.serializedResult());
		
	}
	
	@Test public void shoudlReturnAJSONListWithAllClasses() throws Exception {
		 
		when(instancesService.getAll()).thenReturn(instancesExamples);
		controller.list();
		String expectedResult = "{\"instances\": [{\"valid\": true,\"uri\": \"Anonymous 1\"},{\"valid\": true,\"uri\": \"Anonymous 2\"},{\"valid\": true,\"uri\": \"Anonymous 3\"}]}";
		assertEquals(expectedResult, result.serializedResult());
	
	}
	
	@Test public void shouldUpdateClassWithNewName() throws Exception { 
		
		when(instancesService.update(instancesExamples.get(1).getUri(), instancesExamples.get(0))).thenReturn(instancesExamples.get(1));
		controller.update(instancesExamples.get(1).getUri(), instancesExamples.get(0));
		String expectedResult = "{\"instance\": {\"valid\": true,\"uri\": \"Anonymous 2\"}}";
		assertEquals(expectedResult, result.serializedResult());
		
	}
	
	@Test public void shouldDeleteInstance(){
		when(instancesService.destroy(instancesExamples.get(0))).thenReturn(true);
		controller.delete(instancesExamples.get(0));
		assertTrue(result.used());
	}
}
