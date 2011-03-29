/**
 * 
 */
package edu.org.editor.mobi.service.impl;

import java.util.ArrayList;
import java.util.List;

import mobi.core.Mobi;
import mobi.core.common.Relation;
import edu.org.editor.mobi.service.MobiService;
import edu.org.editor.mobi.service.RelationService;

/**
 * @author Vinícius Oliveira
 *
 */
public class RelationServiceImpl implements RelationService {

	
	private Mobi mobi;
	private MobiService mobiService;
	
	/**
	 * @param mockMobiService
	 */
	public RelationServiceImpl(MobiService mobiService) {
		this.mobi = mobiService.getCurrentMobi();
		this.mobiService = mobiService;
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.RelationService#get(java.lang.String)
	 */
	@Override
	public Relation get(String name) {
		return mobi.getAllRelations().get(name);
	}

	/* (non-Javadoc)
	 * @see edu.org.editor.mobi.service.RelationService#getAll()
	 */
	@Override
	public List<Relation> getAll() {
		return new ArrayList<Relation>(mobi.getAllRelations().values());
	}

}
