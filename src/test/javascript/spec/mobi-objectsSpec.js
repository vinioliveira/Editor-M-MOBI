/**
 * Test suite for RelatiosDraw
 * 
 * @author Vinícius Oliveira
 */

describe('RelationDraw', function(){
	
	var relationDraw;
	var instance; 
	
	beforeEach(function () {
		mockRaphael = {};
	    relationDraw = new Relation(mockRaphael);
	    instance = new Instance("Teste");
	
	});
	
	
	it('Should create a new Instance to Group A', function() {
		relationDraw.addInstanceGroupA(instance);
		expect( relationDraw.instancesGroupA.length ).toEqual(1);
	});
	
	it('Should create a new Instance to Group B', function(){
		relationDraw.addInstanceGroupB(instance);
		expect( relationDraw.instancesGroupB.length ).toEqual(1);
	});
	
	it('Should remove an Instance from Group A', function(){
		relationDraw.addInstanceGroupA(instance);
		expect( relationDraw.instancesGroupA.length ).toEqual(1);
		relationDraw.removeInstanceGroupA(instance);
		expect( relationDraw.instancesGroupA.length ).toEqual(0);
	});
	
	it('Should remove an Instance from Group B', function(){
		relationDraw.addInstanceGroupB(instance);
		expect( relationDraw.instancesGroupB.length ).toEqual(1);
		relationDraw.removeInstanceGroupB(instance);
		expect( relationDraw.instancesGroupB.length ).toEqual(0);
	});
	
	/*it('Should create a relation from An Instance from A to B',function(){
		relationDraw.addInstanceGroupA(instance);
		relationDraw.addInstanceGroupB(instance);
		relations = relationDraw.getAssociationsFrom(instance);
		expect( relations.length ).toEqual(1);
		
	});*/
	
});


/**
 * Test suite for Instances 
 * 
 * @author Vinícius Oliveira
 */

describe('InstanceDraw', function(){
	var instance;
	var instance_associated;
	beforeEach(function(){
		instance = new Instance();
		instance_associated = new Instance();
	});
	
	it('Shoud add an association',function(){
		instance.associateWith(instance_associated);
		expect( instance.associatedInstances.length ).toEqual(1);
	});
});