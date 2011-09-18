package edu.org.editor.mobi.test.intercpetors;

import static org.mockito.Mockito.when;
import static junit.framework.Assert.assertEquals;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import br.com.caelum.vraptor.core.InterceptorStack;
import br.com.caelum.vraptor.resource.ResourceMethod;
import edu.org.editor.mobi.interceptors.UserInterceptor;

public class UserInterceptorTest {

	
	@Mock HttpServletRequest request; 
	@Mock HttpServletResponse response; 
	UserInterceptor userInterceptor;
	@Mock InterceptorStack stack;
	@Mock ResourceMethod method; 
    @Mock Object resourceInstance;
	
	
	@Before public void setUp(){
		MockitoAnnotations.initMocks(this);
		userInterceptor = new UserInterceptor(request, response);
	}
	
	//TODO implement tests to session creation with interceptors
	@Test public void shouldProcedTheRequestWithouRedirect(){
		when(request.getRequestURI()).thenReturn("/auth");
		userInterceptor.intercept(stack, method, resourceInstance);
		assertEquals("", "");
	}
}

