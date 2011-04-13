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
	var index = jQuery.inArray(instance, this.instancesGroupA);
	if( index != -1){
		this.instancesGroupA.splice(index, 1);
	};
};

RelationDraw.prototype.removeInstanceGroupB = function(instance){
	var index = jQuery.inArray(instance, this.instancesGroupB);
	if( index != -1){
		this.instancesGroupB.splice(index, 1);
	};
};

RelationDraw.prototype.getAssociationsFrom = function(instance){
	var index = jQuery.inArray(instance, this.instancesGroupA);
	if(index == -1){
		index = jQuery.inArray(instance, this.instancesGroupB);
		if( index != -1 )
			return this.instancesGroupB[index].relations;
	}else{
		return this.instancesGroupA[index].relations; 
	}
};


/**
 * 
 * Class JavaScript to Draw Instances for mapping of 
 * relations between them
 * 
 */

function Instance(uri){
	
	this.uri = uri;
	this.associatedInstances = new Array();
	
};

Instance.prototype.associateWith = function(instanceToBeAssociated){
	this.associatedInstances.push(instanceToBeAssociated);
};


