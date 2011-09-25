/**
 * 
 */
package edu.org.editor.mobi.service.impl;

import java.util.ArrayList;
import java.util.List;

import br.com.caelum.vraptor.ioc.Component;

import mobi.core.Mobi;
import mobi.core.concept.Class;
import edu.org.editor.mobi.service.ClassesService;
import edu.org.editor.mobi.service.MobiService;

/**
 * @author Vinícius Oliveira
 *
 */
@Component
public class ClassesServiceImpl implements ClassesService{

	private MobiService mobiService; 
	private Mobi mobi;
	
	/**
	 * @param mobiService
	 */
	public ClassesServiceImpl(MobiService mobiService) {
		this.mobiService = mobiService;
		this.mobi = this.mobiService.getCurrentMobi();
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.ClassesService#getAll()
	 */
	public List<Class> getAll() {
		return new ArrayList<Class>(mobi.getAllClasses().values());
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.ClassesService#getByName(java.lang.String)
	 */
	public Class getByName(String uri) {
		return mobi.getClass(uri);
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.ClassesService#createWithName(java.lang.String)
	 */
	public Class createWithName(String uri) throws Exception {
		mobi.addConcept(new Class(uri));
		return mobi.getClass(uri);
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.ClassesService#delete(mobi.core.concept.Class)
	 */
	public Boolean destroy(String uri) {
		mobi.destroyConcept(mobi.getClass(uri));
		return mobi.getClass(uri) == null; 

	}


	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.ClassesService#update(mobi.core.concept.Class)

	 */
	public Class update(String oldUri, String newUri) throws Exception {
		mobi.destroyConcept(new Class(oldUri));
		Class klass = new Class(newUri);
		mobi.addConcept(klass);
		return klass;
	}

}
