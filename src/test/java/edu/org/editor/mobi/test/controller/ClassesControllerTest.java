package edu.org.editor.mobi.test.controller;

import static junit.framework.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import mobi.core.concept.Class;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import br.com.caelum.vraptor.util.test.MockSerializationResult;
import edu.org.editor.mobi.controller.ClassesController;
import edu.org.editor.mobi.service.ClassesService;
/**
 * @author Vinícius Oliveira
 *
 */
public class ClassesControllerTest {

	MockSerializationResult result;
	@Mock ClassesService classesService;
	ClassesController controller;
	List<Class> classesExamples;
	
	@Before public void setUp(){
		
		MockitoAnnotations.initMocks(this);
		result = new MockSerializationResult();
		controller = new ClassesController(classesService, result);

		classesExamples = new ArrayList<Class>(); 
		classesExamples.add(new Class("Anonymous 1"));
		classesExamples.add(new Class("Anonymous 2"));
		classesExamples.add(new Class("Anonymous 3"));
	}
	
	@Test public void shouldReturnAnSpecificClassByName() throws Exception {
		
		when(classesService.getByName("anonymous")).thenReturn(new Class("anonymous"));
		controller.show("anonymous");
		String expectedResult = "{\"class\": {\"valid\": true,\"uri\": \"anonymous\"}}";
		assertEquals(expectedResult, result.serializedResult());
		
	}
	
	
	@Test public void shouldReturnAJSONWithANewClass() throws Exception{
		
		when(classesService.createWithName("Anonymous 1")).thenReturn(classesExamples.get(0));
		controller.create("Anonymous 1");
		String expectedResult = "{\"class\": {\"valid\": true,\"uri\": \"Anonymous 1\"}}";
		assertEquals(expectedResult, result.serializedResult());
		
	}
	
	@Test public void shoudlReturnAJSONListWithAllClasses() throws Exception {
		 
		when(classesService.getAll()).thenReturn(classesExamples);
		controller.list();
		String expectedResult = "[{\"valid\": true,\"uri\": \"Anonymous 1\"},{\"valid\": true,\"uri\": \"Anonymous 2\"},{\"valid\": true,\"uri\": \"Anonymous 3\"}]";
		assertEquals(expectedResult, result.serializedResult());
	
	}
	
	@Test public void shouldUpdateClassWithNewName() throws Exception { 
		when(classesService.update(classesExamples.get(1).getUri(), classesExamples.get(0).getUri())).thenReturn(classesExamples.get(0));
		
		controller.update(classesExamples.get(1).getUri(),classesExamples.get(0).getUri());
		String expectedResult = "{\"class\": {\"valid\": true,\"uri\": \"Anonymous 1\"}}";
		assertEquals(expectedResult, result.serializedResult());
		
	}
	
	@Test public void shouldDeleteInstance(){
		when(classesService.destroy(classesExamples.get(0).getUri())).thenReturn(true);
		controller.delete(classesExamples.get(0));
		assertTrue(result.used());
	}
}
