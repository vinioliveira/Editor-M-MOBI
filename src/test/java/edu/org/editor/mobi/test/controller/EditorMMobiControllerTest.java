package edu.org.editor.mobi.test.controller;


import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import br.com.caelum.vraptor.util.test.MockResult;
import edu.org.editor.mobi.controller.EditorMMobiController;
import edu.org.editor.mobi.model.User;
import edu.org.editor.mobi.service.MobiService;
/**
 * @author Vinícius Oliveira
 *
 */
public class EditorMMobiControllerTest {

	MockResult result;
	@Mock MobiService mobiService;
	
	@Before public void setUp(){
		MockitoAnnotations.initMocks(this);
		result = new MockResult();
	}
	
	@Test public void shouldStartAnNewSessionToTheCurrentUser(){
		
		when(mobiService.getCurrentUser()).thenReturn(User.anonymousUser());
		EditorMMobiController editorController = new EditorMMobiController(mobiService, result);
		editorController.index();
		User userSession = result.included("User");
		assertThat(userSession, is(Matchers.instanceOf(User.class)));
			
	}
	
}	
