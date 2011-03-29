/**
 * 
 */
package edu.org.editor.mobi.service.impl;

import mobi.core.Mobi;
import mobi.core.concept.Class;
import mobi.core.concept.Instance;
import mobi.core.relation.GenericRelation;
import mobi.core.relation.InstanceRelation;
import br.com.caelum.vraptor.ioc.Component;
import edu.org.editor.mobi.service.EditorMobiConstants;
import edu.org.editor.mobi.service.GenericRelationService;
import edu.org.editor.mobi.service.MobiService;

/**
 * @author Vinícius Oliveira
 *
 */
@Component
public class GenericRelationServiceImpl implements GenericRelationService {

	
	private Mobi mobi;
	private MobiService mobiService;
	private GenericRelation genericRelation;
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
		return (GenericRelation) (getCurrentGenericRelation() == null ?
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
		GenericRelation genericRelation = getCurrentGenericRelation();
		if(genericRelation != null ){
			if(! genericRelation.getInstanceRelationMapA().containsKey(instance.getUri())){
				InstanceRelation instanceRelation = new InstanceRelation();
				instanceRelation.setInstance(instance);
				genericRelation.getInstanceRelationMapA().put(instance.getUri(),instanceRelation);
			}
			return genericRelation;
		}
		return null;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#addInstanceGroupB(mobi.core.concept.Instance)
	 */
	@Override
	public GenericRelation addInstanceGroupB(Instance instance) {
		genericRelation = getCurrentGenericRelation();
		if(genericRelation != null ){
			if(! genericRelation.getInstanceRelationMapA().containsKey(instance.getUri())){
				InstanceRelation instanceRelation = new InstanceRelation();
				instanceRelation.setInstance(instance);
				genericRelation.getInstanceRelationMapB().put(instance.getUri(),instanceRelation);
			}
			return genericRelation;
		}
		return null;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#setClassGroupA(mobi.core.concept.Class)
	 */
	@Override
	public GenericRelation setClassGroupA(Class clazz) {
		genericRelation = getCurrentGenericRelation();
		genericRelation.setClassA(clazz);
		return genericRelation;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#setClassGroupB(mobi.core.concept.Class)
	 */
	@Override
	public GenericRelation setClassGroupB(Class clazz) {
		genericRelation = getCurrentGenericRelation();
		genericRelation.setClassB(clazz);
		return genericRelation;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.GenericRelationService#createRelationInstance(mobi.core.concept.Instance, mobi.core.concept.Instance)
	 */
	@Override
	public GenericRelation createRelationInstance(Instance instanceGroupA, Instance instanceGroubB) {
		genericRelation = getCurrentGenericRelation();
		genericRelation.addInstanceRelation(instanceGroupA, instanceGroubB);
		return genericRelation;
	}

	private GenericRelation getCurrentGenericRelation(){
		return mobi.getAllGenericRelations().get(EditorMobiConstants.TEMP);
	}

	/**
	 * @param oldId
	 * @param instanceUpdatedA
	 * 
	 * @return GenericRelation
	 */
	public GenericRelation updateInstanceGroupA(String oldId, Instance instanceUpdatedA) {

		InstanceRelation instanceRelation = new InstanceRelation();
		instanceRelation.setInstance(instanceUpdatedA);				
		
		genericRelation = getCurrentGenericRelation();
		
		genericRelation.getInstanceRelationMapA().remove(oldId);
		genericRelation.getInstanceRelationMapA().put(instanceUpdatedA.getUri(), instanceRelation);

		return genericRelation;
	}

	/**
	 * @param oldId
	 * @param instanceUpdatedB
	 * @return
	 */
	public GenericRelation updateInstanceGroupB(String oldId, Instance instanceUpdatedB) {

		InstanceRelation instanceRelation = new InstanceRelation();
		instanceRelation.setInstance(instanceUpdatedB);				
		
		genericRelation = getCurrentGenericRelation();
		
		genericRelation.getInstanceRelationMapB().remove(oldId);
		genericRelation.getInstanceRelationMapB().put(instanceUpdatedB.getUri(), instanceRelation);

		return genericRelation;
	}
}
