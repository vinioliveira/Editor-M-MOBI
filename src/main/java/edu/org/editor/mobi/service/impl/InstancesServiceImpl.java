/**
 * 
 */
package edu.org.editor.mobi.service.impl;

import java.util.ArrayList;
import java.util.List;

import br.com.caelum.vraptor.ioc.Component;

import mobi.core.Mobi;
import mobi.core.concept.Instance;
import edu.org.editor.mobi.service.InstancesService;
import edu.org.editor.mobi.service.MobiService;

/**
 * @author Vinícius Oliveira
 *
 */
@Component
public class InstancesServiceImpl implements InstancesService {

	
	private Mobi mobi;
	private MobiService mobiService;

	public InstancesServiceImpl(MobiService mobiService) {
		this.mobi = mobiService.getCurrentMobi();
		this.mobiService = mobiService;
	}
	
	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.InstancesService#getByName(java.lang.String)
	 */
	@Override
	public Instance getByName(String name) {
		return mobi.getInstance(name);
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.InstancesService#createWithName(java.lang.String)
	 */
	@Override
	public Instance createWithName(String name) throws Exception {
		mobi.addConcept(new Instance(name));
		return mobi.getInstance(name);
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.InstancesService#getAll()
	 */
	@Override
	public List<Instance> getAll() {
		return new ArrayList<Instance>(mobi.getAllInstances().values()); 
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.InstancesService#update(mobi.core.concept.Instance)
	 */
	@Override
	public Instance update(String uri, Instance instance) throws Exception {
		
		mobi.destroyConcept(new Instance(uri));
		mobi.addConcept(instance);
		return instance;
		
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.InstancesService#delete(mobi.core.concept.Instance)
	 */
	@Override
	public Boolean destroy(Instance instance) {
		
		mobi.destroyConcept(instance);
		return mobi.getInstance(instance) == null ? true : false;
		
	}

}
