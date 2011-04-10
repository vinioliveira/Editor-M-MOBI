/**
 * Class JavaScript to Draw Instances for mapping of 
 * relations between instances
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

