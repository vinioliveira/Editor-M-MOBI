/**
 * @author : Vinícius Oliveira 
 */

(function($){
	
	//Override
	// Backbone.Model.prototype.url = function() {
	// 	return this.urlRoot + '/' + (this.get("uri") || '');
	// };
	
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
		 *      uriClassA
		 *      uriClassB
		 *      instancesGroupA 
		 *      instancesGroupB
		 *      classA
		 *      classB 
		 */ 
		
		urlRoot : '/relations',
		
		initialize : function() {
			this.set({ instancesGroupA : new Instances() });
			this.set({ instancesGroupB : new Instances() });
			this.set({ classA : new Class({uri : "new class A"}) });
			this.set({ classB : new Class({uri : "new class B"}) });

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
			this.prepareClassA();
			this.prepareClassB();
			this.prepareInstancesA();
			this.prepareInstancesB();
		},
		
		prepareInstancesA : function() {
			self = this;
			if(this.get('instanceRelationMapA') != null){
				this.get('instanceRelationMapA').forEach(function(mapInst) {
					self.get('instancesGroupA' ).add( new Instance(mapInst[1]));
				});				
			}
		},
		
		prepareInstancesB : function() {
			self = this;
			if(this.get('instanceRelationMapB') != null){
				self.get('instanceRelationMapB').forEach(function(mapInst) {
					self.get('instancesGroupB' ).add(new Instance(mapInst[1]));
				});				
			}
		},
		
		prepareClassA : function() {
			if(this.get("cardinalityA") != null ){
				this.set({ classA : new Class(this.get("cardinalityA").mobiClass )});
			}
		},		
		
		prepareClassB : function() {
			if(this.get('cardinalityB') != null){
				this.set({ classB : new Class(this.get("cardinalityB").mobiClass )});
			}
		}
		
	});
	
	window.Instance = Backbone.Model.extend({
		
		initialize : function() {
			this.set({ uri : ( this.get('uri') || '' )});
			this.set({instances : new Instances()});
			this.prepare(); 
		},
		
		prepare : function() {
			this.prepareUri();
			this.prepareInstences();
		},
		
		prepareUri : function() {
			if(this.get('instance') != null ){
				this.set({ uri : this.get('instance').uri});				
			}
		},
		
		prepareInstences : function() {
			//Don't change name of this variable, that can cause error with callback functions
			selfInst = this;
			if(this.get('instanceMap') != null){
				this.get('instanceMap').forEach(function(map) {
					selfInst.get('instances').add(new Instance(map[1]));
				});				
			}
		}
		
	});
	
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
		},
		
		render : function() {
			var renderContent = $.tmpl(Templates.instance, this.model.toJSON());
			$(this.el).html(renderContent);
			return this;
		}
	})
	
	window.ClassView = Backbone.View.extend({
		
		initialize : function() {
			_.bindAll(this, 'render');
			this.model.bind("change",this.render);
		},
		
		render : function() {
			var renderContent = $.tmpl(Templates.class, this.model.toJSON());
			$(this.el).html(renderContent);
			return this;
		},
		
	})
	
	window.ClassesView = Backbone.View.extend({
		
		initialize : function() {
			_.bindAll(this, 'render');
		},
		
		render : function() {
			var renderContet = $.tmpl(Templates.class_form_input,{ list : this.collection.toJSON() });
			$(this.el).html(renderContet);
			return this;
		}
	})
	
	window.RelationView = Backbone.View.extend({
				
		initialize: function() {

            _.bindAll(this, 'render');
            this.model.get('instancesGroupA').bind("add",this.render);
            this.model.get('instancesGroupB').bind("add",this.render);

        },
        
        render: function() {
            
            $(this.el).html($.tmpl(Templates.relation, this.model.toJSON()));

            var $instancesA = this.$('.instancesA'),
            	$instancesB = this.$('.instancesB');
                       
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
			$container.append(this.relationView.render().el);
			attchClassFormEvent();
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