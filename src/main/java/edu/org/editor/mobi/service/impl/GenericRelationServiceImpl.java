/**
 * 
 */
package edu.org.editor.mobi.service.impl;

import mobi.core.Mobi;
import mobi.core.concept.Class;
import mobi.core.concept.Instance;
import mobi.core.relation.GenericRelation;
import edu.org.editor.mobi.service.EditorMobiConstants;
import edu.org.editor.mobi.service.GenericRelationService;
import edu.org.editor.mobi.service.MobiService;

/**
 * @author Vinícius Oliveira
 *
 */
public class GenericRelationServiceImpl implements GenericRelationService {

	
	private Mobi mobi;
	private MobiService mobiService;
	
	/**
	 * @param mockMobiService
	 */
	public GenericRelationServiceImpl(MobiService mobiService) {
		this.mobi = mobiService.getCurrentMobi();
		this.mobiService = mobiService;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#create()
	 */
	@Override
	public GenericRelation create() {
		return (GenericRelation) (mobi.getAllGenericRelations().get(EditorMobiConstants.TEMP) == null ?
				mobi.createGenericRelation(EditorMobiConstants.TEMP) : mobi.getAllGenericRelations().get(EditorMobiConstants.TEMP));
		
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#reset()
	 */
	@Override
	public GenericRelation reset() {
		mobi.getAllGenericRelations().put(EditorMobiConstants.TEMP, new GenericRelation());
		return (GenericRelation) mobi.createGenericRelation(EditorMobiConstants.TEMP);
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#addInstanceGroupA(mobi.core.concept.Instance)
	 */
	@Override
	public GenericRelation addInstanceGroupA(Instance instance) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#addInstanceGroupB(mobi.core.concept.Instance)
	 */
	@Override
	public GenericRelation addInstanceGroupB(Instance instance) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#setClassGroupA(mobi.core.concept.Class)
	 */
	@Override
	public GenericRelation setClassGroupA(Class clazz) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#setClassGroupB(mobi.core.concept.Class)
	 */
	@Override
	public GenericRelation setClassGroupB(Class clazz) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#createRelationInstance(mobi.core.concept.Instance, mobi.core.concept.Instance)
	 */
	@Override
	public GenericRelation createRelationInstance(Instance instanceGroupA,
			Instance instanceGroubB) {
		// TODO Auto-generated method stub
		return null;
	}

}
