/**
 * Test suite for RelatiosDraw
 * 
 * @author Vinícius Oliveira
 */

describe('Mobi', function(){

	describe('Relation', function() {
		
		beforeEach(function() {
			window.relation = this.relation = new Relation(MobiFixture[0].compositionRelation);
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
			
			it('Should return html with relation class', function() {
				expect($(this.relationView.render().el).hasClass('relation')).toBeTruthy();
			});
			
			it('Should return html with classes class for childrens', function() {
				$element = $(this.relationView.render().el);
				
				expect($element.children().hasClass('classesA')).toBeTruthy();
				expect($element.find('.classesA').children().size()).toEqual(3);

				expect($element.children().hasClass('classesB')).toBeTruthy();
				expect($element.find('.classesB').children().size()).toEqual(3);
			});
			
			it('Should return html with 4 childrens to 4 of instances add to Classes Variable', function() {
				this.relation.get('instancesGroupA').add(new Instance({}));
				$element = $(this.relationView.render().el);
				
				expect($element.children().hasClass('classesA')).toBeTruthy();
				expect($element.find('.classesA').children().size()).toEqual(4);
			});
		})
	});
	
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
			
			it('Should return a div with class corespondent to Side of the current Class', function() {
				// expect($(this.classView.render().el).hasClass('.')).toBeTruthy();
			});
		})
	});
});
