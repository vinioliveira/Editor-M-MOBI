/**
 * @author : Vin’cius Oliveira 
 */

(function($){
	
	//Override
	Backbone.Model.prototype.url = function() {
		return this.urlRoot + '/' + (this.get("uri") || '');
	};
	
	//Models 
	window.Class = Backbone.Model.extend({
		/**
		 *  attributs 
		 *      uri 	
		 */ 
		urlRoot : '/classes',

		isFirstInstance : function(index) {
			return index == 0;
		}
	});
	
	window.Relation = Backbone.Model.extend({

		/**
		 *  attributs 
		 *      uri 	
		 *      instancesGroupA 
		 *      instancesGroupB
		 *      classA
		 *      classB 
		 */ 
		
		urlRoot : '/relations',
		
		initialize : function() {
			this.set({ instancesGroupA : new Instances() });
			this.set({ instancesGroupB : new Instances() });
			this.prepare();
		},
		
		fetchPrepare : function(){
			self = this
			this.fetch({
				success : function(model, xhr){
					self.prepare();		
				}
			});
		},
		
		prepare : function() {
			this.prepareInstancesA();
			this.prepareInstancesB();
			this.prepareClasseA();
			this.prepareClasseB();
		},
		
		prepareInstancesA : function() {
			self = this;
			if(this.get('instanceRelationMapA') != null){
				self.get('instanceRelationMapA').forEach(function(map) {
					self.get('instancesGroupA' ).add( new Instance(map[1].instance));
				});				
			}
		},
		
		prepareInstancesB : function() {
			self = this;
			if(this.get('instanceRelationMapB') != null){
				self.get('instanceRelationMapB').forEach(function(map) {
					self.get('instancesGroupB' ).add(new Instance(map[1].instance));
				});				
			}
		},
		
		prepareClasseA : function() {
			if(this.get("cardinalityA") != null ){
				self.set({ classA : new Class(this.get("cardinalityA").mobiClass )});
			}
		},		
		
		prepareClasseB : function() {
			if(this.get('cardinalityB') != null){
				self.set({ classB : new Class(this.get("cardinalityB").mobiClass )});
			}
		}
		
	});
	
	window.Instance = Backbone.Model.extend({});
	
	//Collections
	window.Classes = Backbone.Collection.extend({
		model : Class,
		url   : '/classes'
	});
	
	window.Instances = Backbone.Collection.extend({
		model : Instance,
		url   : '/instances'
	});
	
	
	window.Relations = Backbone.Collection.extend({
		model : Relation,
		url	  : '/relations'
	});
	
	window.relations = new Relations();
	window.classes = new Classes();
	
	//Views 	
	window.InstanceView = Backbone.View.extend({
		initialize :  function(){
			_.bindAll(this, 'render');
			this.model.bind('change', this.render);
			this.template = $('#instance-template');
		},
		
		render : function() {
			var renderContent = this.template.tmpl(this.model.toJSON());
			$(this.el).html(renderContent);
			return this;
		}
	})
	
	window.ClassView = Backbone.View.extend({
		
		className : "class",
		
		initialize : function() {
			_.bindAll(this, 'render');
			this.model.bind("change",this.render);
			this.template = $('#class-template');
		},
		
		render : function() {
			var renderContent = this.template.tmpl(this.model.toJSON());
			$(this.el).html(renderContent);
			return this;
		}
	})
	
	window.RelationView = Backbone.View.extend({
				
		initialize: function() {

            _.bindAll(this, 'render');
            this.template = $('#relation-template');
            this.model.get('instancesGroupA').bind("add",this.render);
            this.model.get('instancesGroupB').bind("add",this.render);

        },
        
        render: function() {
            
            $(this.el).html(this.template.tmpl({ uri : this.model.get('uri')}));

            var $instancesA = this.$('.instancesA'),
            	$instancesB = this.$('.instancesB'),
            	$classA   = this.$('.classA'),
	            $classB   = this.$('.classB');
            
            this.model.get('instancesGroupA').each(function(instance) {
                var view = new InstanceView({ model: instance });
                $instancesA.append(view.render().el);
            });

            this.model.get('instancesGroupB').each(function(instance) {
                var view = new InstanceView({ model: instance });
                $instancesB.append(view.render().el);
            });

			
			
            return this;
        }

		
	});
	
	
	//Routers
	window.Mobi = Backbone.Router.extend({
		routes : {
			''  : 'home',
			'blank' : 'blank',
		},
		
		initialize: function() {
			window.relation = this.relation = new Relation({uri : "R1"}); 
			this.relationView = new RelationView({
				model : this.relation 
			});
		},
		
		home: function() {
			var $container = $('#relation');
			$container.empty();
			$container.append(this.relationView.render().el)
		},
		
		blank : function() {
			$("#graph_relation").empty();
		}
		
	});
		
	$(function() {
		window.App = new Mobi();
		Backbone.history.start();
	})
	
})(jQuery);