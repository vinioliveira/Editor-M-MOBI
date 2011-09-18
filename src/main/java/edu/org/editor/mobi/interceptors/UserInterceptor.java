package edu.org.editor.mobi.interceptors;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.caelum.vraptor.InterceptionException;
import br.com.caelum.vraptor.Intercepts;
import br.com.caelum.vraptor.core.InterceptorStack;
import br.com.caelum.vraptor.interceptor.Interceptor;
import br.com.caelum.vraptor.ioc.RequestScoped;
import br.com.caelum.vraptor.resource.ResourceMethod;
import edu.org.editor.mobi.model.MobiSession;
import edu.org.editor.mobi.service.MobiService;


@Intercepts
@RequestScoped
public class UserInterceptor implements Interceptor{
	
	private final String AUTH_URL = "/auth";
	private final HttpServletRequest request;
	private HttpServletResponse response; 
	
	public UserInterceptor(HttpServletRequest request, HttpServletResponse response) {
		this.request  = request;
		this.response = response;
	}
	
	 public boolean accepts(ResourceMethod method) {
	        return true; 
	 }
	 
	 public void intercept(InterceptorStack stack, ResourceMethod method, 
             Object resourceInstance) throws InterceptionException {

		System.out.println("Interceptando " + request.getRequestURI());
		
		if( proced() ){
		  stack.next(method, resourceInstance);
		}else{
			redirect();
		}
	 }
	 
	private void redirect() {
		try {
			response.sendRedirect(AUTH_URL);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private Boolean proced(){
		if(! request.getRequestURI().equals(AUTH_URL)){
			if( ( getCurrentUser() == null) || (! getCurrentUser().isActive())){
				return false;
			}
		}
		return true;
	}
	
	private MobiService getCurrentUser(){
		return (MobiService) request.getSession().getAttribute("mobiServiceImpl");
	}
}
