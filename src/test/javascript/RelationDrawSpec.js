/**
 * 
 */

describe('RelationDraw', function(){
	
	var relationDraw;
	var instance; 
	
	beforeEach(function () {
		
	    relationDraw = new RelationDraw();
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
	
});