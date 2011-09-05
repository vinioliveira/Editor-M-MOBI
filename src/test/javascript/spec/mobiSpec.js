/**
 * Test suite for Mobi BackBone.js
 * 
 * @author Vinícius Oliveira
 */

describe('Mobi', function(){

	describe('Relation', function() {
		
		beforeEach(function() {
			this.relation = new Relation(MobiFixture[0].compositionRelation);
		});
		
		it('Creation works fine',function() {
			expect(this.relation.get('uri')).toEqual('R1');
		});
		
		describe('Relation Model', function() {
			
			it('should return two class', function() {
				expect(this.relation.get('classA').get("uri")).toEqual('Class A');
				expect(this.relation.get('classB').get("uri")).toEqual('Class B');
			});
			
			it('should return instances for class MapA', function() {
				expect(this.relation.get('instancesGroupA').length).toEqual(3);
			});
			
			it('should return instances for class MapB', function() {
				expect(this.relation.get('instancesGroupB').length).toEqual(3);
			});
		});
		
		describe('Relation View', function() {
			
			beforeEach(function() {
				this.relationView = new RelationView({ model : this.relation });
			});
			
			it('Should return html with map-relation id', function() {
				expect($(this.relationView.render().el).find('#map-relation').toArray().length).toBeGreaterThan(0);
			});
			
			it('Should return html with classes class for childrens', function() {
				$element = $(this.relationView.render().el);
				
				expect($element.find('instancesA')).toBeTruthy();
				expect($element.find('.instancesA').children().size()).toEqual(3);

				expect($element.find('.instancesB')).toBeTruthy();
				expect($element.find('.instancesB').children().size()).toEqual(3);
			});
			
			it('Should return html with 4 childrens to 4 of instances add to Classes Variable', function() {
				this.relation.get('instancesGroupA').add(new Instance({}));
				$element = $(this.relationView.render().el);
				
				expect($element.find('instancesA')).toBeTruthy();
				expect($element.find('.instancesA').children().size()).toEqual(4);
			});
		})
	});
	
	describe('Instance', function() {
		
		beforeEach(function() {
			window.instance = this.instance = new Instance(MobiFixture[0].compositionRelation.instanceRelationMapA[0][1])
		});
		
		it('Creation works fine', function() {
			expect(this.instance.get('uri')).toEqual('Anonymous 3');
		});
		
		describe('Instance Model', function() {
			
			it('Should return all of relations for this Instance', function() {
				expect(this.instance.get('instances').length).toEqual(1);
				expect(this.instance.get('instances').first().get('uri')).toEqual('Anonymous 4');
			});
			
		});
		
		describe('Instance View', function() {
			
			beforeEach(function() {
				this.instanceView = new InstanceView({model : this.instance});
			});
			
			it('Should return html with instance class', function() {
				expect($(this.instanceView.render().el).find('.instance').toArray().length).toBeGreaterThan(0);
			});
		})
		
		
		
	})
	
	describe('Class',function() {
		
		beforeEach(function() {
			this.class = new Class(MobiFixture[0].compositionRelation.cardinalityA.mobiClass);
		});
		
		it('Creation works fine ', function() {
			expect(this.class.get('uri')).toEqual('Class A');
		});
		
		describe('Class View', function() {
			
			beforeEach(function() {
				this.classView = new ClassView({ model : this.class });
			});
			
			it('Should return html with classA class', function() {
				expect($(this.classView.render().el).find('input.class').toArray().length).toBeGreaterThan(0);
			});
		})
	});
});
