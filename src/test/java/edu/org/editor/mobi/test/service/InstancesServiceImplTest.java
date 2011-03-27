package edu.org.editor.mobi.test.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;

import mobi.core.Mobi;
import mobi.core.concept.Instance;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import edu.org.editor.mobi.service.MobiService;
import edu.org.editor.mobi.service.impl.InstancesServiceImpl;

/**
 * @author Vinícius Oliveira
 *
 */
public class InstancesServiceImplTest {
	
	private InstancesServiceImpl instanceServiceImpl;
	@Mock private Mobi mockMobi;
	@Mock private MobiService mockMobiService;
	HashMap<String, Instance> instancesExamples;
	
	@Before
	public void setUp(){
		MockitoAnnotations.initMocks(this);
		when(mockMobiService.getCurrentMobi()).thenReturn(mockMobi);
		this.instanceServiceImpl = new InstancesServiceImpl(mockMobiService);
		instancesExamples = new HashMap<String, Instance>(); 
		instancesExamples.put("Anonymous 1", new Instance("Anonymous 1"));
		instancesExamples.put("Anonymous 2", new Instance("Anonymous 2"));
		instancesExamples.put("Anonymous 3", new Instance("Anonymous 3"));
	}
	
	@Test public void shuldCreateANewInstanceOnKernel() throws Exception{
		
		when(mockMobi.getInstance(instancesExamples.get("Anonymous 1").getUri())).thenReturn(instancesExamples.get("Anonymous 1"));
		assertNotNull(instanceServiceImpl.createWithName(instancesExamples.get("Anonymous 1").getUri()));
		
	}
	
	@Test public void shouldDestroyAnInstanceOnKernel() {
		
		when(mockMobi.getInstance(instancesExamples.get("Anonymous 1"))).thenReturn(null);
		assertTrue(instanceServiceImpl.destroy(instancesExamples.get("Anonymous 1")));
		
	}
	
	@Test public void shouldRetrivebAnExistentInstance(){
		
		when(mockMobi.getInstance(instancesExamples.get("Anonymous 1").getUri())).thenReturn(instancesExamples.get("Anonymous 1"));
		assertNotNull(instanceServiceImpl.getByName(instancesExamples.get("Anonymous 1").getUri()));
		
	}
	
	@Test public void shouldUpdateAnExistenceInstance() throws Exception{
		
		when(mockMobi.getInstance(instancesExamples.get("Anonymous 2").getUri())).thenReturn(instancesExamples.get("Anonymous 2"));
		assertEquals(instancesExamples.get("Anonymous 2"), instanceServiceImpl.update(instancesExamples.get("Anonymous 1").getUri(), instancesExamples.get("Anonymous 2")));
		
	}
	
	@Test public void shouldRetrievebAllExistencesInstance(){
		
		when(mockMobi.getAllInstances()).thenReturn(instancesExamples);
		assertEquals(instanceServiceImpl.getAll(), new ArrayList<Instance>(instancesExamples.values()));
		
	}
}
