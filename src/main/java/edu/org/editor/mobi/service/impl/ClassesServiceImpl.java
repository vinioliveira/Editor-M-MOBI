/**
 * 
 */
package edu.org.editor.mobi.service.impl;

import java.util.ArrayList;
import java.util.List;

import mobi.core.Mobi;
import mobi.core.concept.Class;
import mobi.core.concept.Instance;
import edu.org.editor.mobi.service.ClassesService;
import edu.org.editor.mobi.service.MobiService;

/**
 * @author Vinícius Oliveira
 *
 */
public class ClassesServiceImpl implements ClassesService{

	private MobiService mobiService; 
	private Mobi mobi;
	
	/**
	 * @param mobiService
	 */
	public ClassesServiceImpl(MobiService mobiService) {
		this.mobi = mobiService.getCurrentMobi();
		this.mobiService = mobiService;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.ClassesService#getAll()
	 */
	@Override
	public List<Class> getAll() {
		return new ArrayList<Class>(mobi.getAllClasses().values());
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.ClassesService#getByName(java.lang.String)
	 */
	@Override
	public Class getByName(String name) {
		return mobi.getClass(name);
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.ClassesService#createWithName(java.lang.String)
	 */
	@Override
	public Class createWithName(String name) throws Exception {
		mobi.addConcept(new Class(name));
		return mobi.getClass(name);
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.ClassesService#delete(mobi.core.concept.Class)
	 */
	@Override
	public Boolean destroy(Class clazz) {
		mobi.destroyConcept(clazz);
		return mobi.getClass(clazz) == null ? true : false;

	}


	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.ClassesService#update(mobi.core.concept.Class)

	 */
	@Override
	public Class update(String uri, Class clazz) throws Exception {
		mobi.destroyConcept(new Class(uri));
		mobi.addConcept(clazz);
		return clazz;
	}

}