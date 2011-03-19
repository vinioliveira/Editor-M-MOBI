package edu.org.editor.mobi.test.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import mobi.core.concept.Class;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import br.com.caelum.vraptor.util.test.MockResult;
import edu.org.editor.mobi.controller.ClassesController;
import edu.org.editor.mobi.service.ClassesService;

public class ClassesControllerTest {

	MockResult result;
	@Mock ClassesService classesService;
	ClassesController controller;
	List<Class> classExamples;
	
	@Before
	public void setUp(){
		MockitoAnnotations.initMocks(this);
		result = new MockResult();
		controller = new ClassesController(classesService, result);
		
		result = new MockResult();
		controller = new ClassesController(classesService, result);

		classExamples = new ArrayList<Class>(); 
		classExamples.add(new Class("Annonymous 1"));
		classExamples.add(new Class("Annonymous 2"));
		classExamples.add(new Class("Annonymous 3"));
		
	}
	
	
	@Test
	public void shouldReturnAJSONWithANewClass() throws Exception{
		
		when(classesService.create()).thenReturn(classExamples.get(0));
		controller.create();
		String expectedResult = "{\"class\": {\"valid\": true,\"uri\": \"Annonymous 1\"}}";
		assertEquals(expectedResult, result.restultSerialized());
		
	}
	
	@Test 
	public void shoudlReturnAJSONListWithAllClasses() throws Exception {
		 
		when(classesService.getAll()).thenReturn(classExamples);
		controller.list();
		String expectedResult = "{\"classes\": [{\"valid\": true,\"uri\": \"Annonymous 1\"},{\"valid\": true,\"uri\": \"Annonymous 2\"},{\"valid\": true,\"uri\": \"Annonymous 3\"}]}";
		assertEquals(expectedResult, result.restultSerialized());
	
	}
	
	
}
