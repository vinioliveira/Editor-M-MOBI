package com.mobi.comum.action.test;

import static org.junit.Assert.*;

import mobi.core.Mobi;
import mobi.core.concept.Instance;

import org.junit.Test;
import org.mockito.Mockito;

public class AddInstanceActionTest {

	@Test
	public void testAddInstance(){
		
		Mobi mobi = Mockito.mock(Mobi.class,Mockito.CALLS_REAL_METHODS);
		Instance instance = new Instance("Pessoa");
		mobi.addConcept(instance);
		
		
		
		
		
	}

}
