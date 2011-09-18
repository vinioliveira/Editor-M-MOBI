package edu.org.editor.mobi.test.controller;


import static junit.framework.Assert.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import br.com.caelum.vraptor.util.test.MockSerializationResult;
import edu.org.editor.mobi.controller.EditorMMobiController;
import edu.org.editor.mobi.model.User;
import edu.org.editor.mobi.service.MobiService;
/**
 * @author Vinícius Oliveira
 *
 */
public class EditorMMobiControllerTest {

	MockSerializationResult result;
	EditorMMobiController controller;
	@Mock MobiService mobiService;
	
	@Before public void setUp(){
		MockitoAnnotations.initMocks(this);
		result = new MockSerializationResult();
		controller = new EditorMMobiController(mobiService, result);
	}
	
	@Test public void shouldReturnCurrentUserOfSession() throws Exception{
		when(mobiService.getCurrentUser()).thenReturn(new User("vinicius", "vinicius@oliveira.com", ""));
		controller.getCurrentUser();
		String expectedResult = "{\"name\": \"vinicius\",\"email\": \"vinicius@oliveira.com\"}";
		assertEquals(expectedResult, result.serializedResult());
	}
	
}	
