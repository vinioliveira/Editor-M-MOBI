package edu.org.editor.mobi.test.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;
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
	private Mobi mobi;
	private Class classTest;
	@Mock private MobiService mockMobiService;
	
	@Before
	public void setUp() throws Exception{
		MockitoAnnotations.initMocks(this);
		mobi = new Mobi("TEST");
		classTest = new Class("TEST");
		mobi.addConcept(classTest);
		
		when(mockMobiService.getCurrentMobi()).thenReturn(mobi);
		this.classesServiceImpl = new ClassesServiceImpl(mockMobiService);

	}
	
	@Test public void shuldCreateANewClassOnKernel() throws Exception{
		
		assertEquals(classTest,classesServiceImpl.createWithName("TEST"));
		
	}
	
	@Test public void shouldDestroyAnClassOnKernel() {
		
		assertTrue(classesServiceImpl.destroy("TEST"));
   		
	}
	
	@Test public void shouldRetrivebAnExistentClass() throws Exception{
		
		assertNotNull(classesServiceImpl.getByName("TEST"));
		
	}
	
	@Test public void shouldUpdateAnExistenceClass() throws Exception{
		
		classesServiceImpl.update("TEST", "TEST2");
		assertNotNull(classesServiceImpl.getByName("TEST2"));
		
	}
	
	@Test public void shouldRetrievebAllExistencesClass() throws Exception{
		
		assertEquals(1, classesServiceImpl.getAll().size());
		
	}
}
