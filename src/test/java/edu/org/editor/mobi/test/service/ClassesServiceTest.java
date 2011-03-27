package edu.org.editor.mobi.test.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;

import mobi.core.Mobi;
import mobi.core.concept.Class;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import edu.org.editor.mobi.service.MobiService;
import edu.org.editor.mobi.service.impl.ClassesServiceImpl;

/**
 * @author Vinícius Oliveira
 *
 */
public class ClassesServiceTest {
	
	private ClassesServiceImpl classesServiceImpl;
	@Mock private Mobi mockMobi;
	@Mock private MobiService mockMobiService;
	HashMap<String, Class> classsExamples;
	
	@Before
	public void setUp(){
		MockitoAnnotations.initMocks(this);
		when(mockMobiService.getCurrentMobi()).thenReturn(mockMobi);
		this.classesServiceImpl = new ClassesServiceImpl(mockMobiService);
		classsExamples = new HashMap<String, Class>(); 
		classsExamples.put("Anonymous 1", new Class("Anonymous 1"));
		classsExamples.put("Anonymous 2", new Class("Anonymous 2"));
		classsExamples.put("Anonymous 3", new Class("Anonymous 3"));
	}
	
	@Test public void shuldCreateANewClassOnKernel() throws Exception{
		
		when(mockMobi.getClass(classsExamples.get("Anonymous 1").getUri())).thenReturn(classsExamples.get("Anonymous 1"));
		assertNotNull(classesServiceImpl.createWithName(classsExamples.get("Anonymous 1").getUri()));
		
	}
	
	@Test public void shouldDestroyAnClassOnKernel() {
		
		when(mockMobi.getClass(classsExamples.get("Anonymous 1"))).thenReturn(null);
		assertTrue(classesServiceImpl.destroy(classsExamples.get("Anonymous 1")));
   		
	}
	
	@Test public void shouldRetrivebAnExistentClass(){
		
		when(mockMobi.getClass(classsExamples.get("Anonymous 1").getUri())).thenReturn(classsExamples.get("Anonymous 1"));
		assertNotNull(classesServiceImpl.getByName(classsExamples.get("Anonymous 1").getUri()));
		
	}
	
	@Test public void shouldUpdateAnExistenceClass() throws Exception{
		
		when(mockMobi.getClass(classsExamples.get("Anonymous 2").getUri())).thenReturn(classsExamples.get("Anonymous 2"));
		assertEquals(classsExamples.get("Anonymous 2"), classesServiceImpl.update(classsExamples.get("Anonymous 1").getUri(), classsExamples.get("Anonymous 2")));
		
	}
	
	@Test public void shouldRetrievebAllExistencesClass(){
		
		when(mockMobi.getAllClasses()).thenReturn(classsExamples);
		assertEquals(classesServiceImpl.getAll(), new ArrayList<Class>(classsExamples.values()));
		
	}
}
