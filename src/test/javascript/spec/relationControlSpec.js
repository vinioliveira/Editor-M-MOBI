/**
 * Basic controls that will replace mxGraph.
 * First case will only take care about creation and remotion of dom elements from html.  
 */

describe('Basic controls Add/Remove Instance', function(){
	var relationContainer ;
	var setting ;
	
	beforeEach(function(){
		$("div").attr("id","main");
		relationContainer =  Raphael("main", 300, 300);
		setting = relationContainer.set(); 
	});
	
	afterEach(function(){
		relationContainer.remove();
	});
	
	it('Should add a new Element to Instance A Group' , function(){
		instance = relationContainer.circle(30, 30, 15);
		expect( $('circle').size() ).toEqual(1);
	});
	
	it('Should remove a new Element added early from Instance A Group' , function(){
		instance = relationContainer.circle(30, 30, 15);
		expect( $('circle').size() ).toEqual(1);
		instance.remove();
		expect( $('circle').size() ).toEqual(0);
	});
	
});