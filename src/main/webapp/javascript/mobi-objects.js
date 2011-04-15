/**
 * Class JavaScript to Draw Relations for mapping of 
 * relations between them
 * 
 * @author Vinícius Oliveira 
 */
function RelationDraw() {
	this.instancesGroupA = new Array();
	this.instancesGroupB = new Array();
};

RelationDraw.prototype.addInstanceGroupA = function(instance){
	this.instancesGroupA.push(instance);
};

RelationDraw.prototype.addInstanceGroupB = function(instance){
	this.instancesGroupB.push(instance);
};

RelationDraw.prototype.removeInstanceGroupA = function(instance){
	if( this.instancesGroupA.contain(instance) ){
		this.instancesGroupA.remove(this.instancesGroupA.getIndex(instance));
	};
};

RelationDraw.prototype.removeInstanceGroupB = function(instance){
	if( this.instancesGroupB.contain(instance) ){
		this.instancesGroupB.remove(this.instancesGroupB.getIndex(instance));
	};
};

RelationDraw.prototype.getAssociationsFrom = function(instance){
	if( this.instancesGroupA.contain(instance) ){
		return this.instancesGroupA[index].relations;
	}else{
		if( this.instancesGroupB.contain(instance) )
			return this.instancesGroupB[index].relations;
	}
};


/**
 * 
 * Class JavaScript to Draw Instances for mapping of 
 * relations between them
 * 
 * @author Vinícius Oliveira
 */

function Instance(uri){
	
	this.uri = uri;
	this.associatedInstances = new Array();
	
};

Instance.prototype.associateWith = function(instanceToBeAssociated){
	if( ! this.associatedInstances.contain(instanceToBeAssociated) ){ 
		this.associatedInstances.push(instanceToBeAssociated);
		instanceToBeAssociated.associateWith(this);
	}
};


