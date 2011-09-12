(function() {
	
	 r = function(options) {
	
		if( options == null && options.holder == null){
			throw "No holder specified.";
		}
	
		var settings = {
			holder     : options.holder,
			width      : (options.width || 450),
			height 	   : (options.height || 450),
			r 	   	   :  options.raphael ,
			collection : (options.collection || []),
			attrs	   : {
				fill: '#fff', 
				stroke: '#fff', 
				"fill-opacity": 0, 
				"stroke-width": 1
			}
		};
	
		this.paper = settings.r;
  
		this.init = function() {
			settings.r = settings.r || new Raphael(settings.holder, settings.width, settings.height);
		};		
	
		/**
		 *  Pass the element that you want to create with cordenates x, y, coreespond
		 *  If you want to create a new Rect, pass the name of element in the first param 
		 *
		 *  rAssociation.include('rect', 100, 90, 80, 60 );
		 *  
		 *  If you want a circle, just 
		 *  
		 *  rAssociation.include('circle', 100, 200, 40);
		 * 
		 *  to see which params correspond to you object see 
		 *  http://raphaeljs.com/reference.html
		 * 
		 **/
		this.include = function(svg) {
			var args 	= Array.prototype.slice.call(arguments, 1),
				element = settings.r[svg].apply(settings.r, args);
			
			element.attr(settings.attrs);
			defaultEvents(element);
			return element;
		};
	
		/**
		 * Pass the event and the element that you want attach some calback, the first argument is the
		 * event that you want to attach the callback or callbacks. 
		 * 
		 * Simple usage. 
		 * rAssociation.append('click', element, function(){ alert('this is a callback')});
		 * 
	     * See http://raphaeljs.com/reference.html#events to all events available.
		 * 
		 */
		this.append = function(event, collection) {

			var args =  Array.prototype.slice.call(arguments, 2);
			if( collection instanceof Array) {
				for (var i = 0; i < collection.length; i++) {
			        collection[i][event].apply(collection[i], args);
			    };
			}else{
				collection[event].apply(collection, args);
			}
		};
	
		// private methods
		var stageWork = {
			source :  null, 
			target : null
		};

		self = this;
		var defaultEvents = function(element) {
		
			el = (element || settings.collection);
		
			self.append('drag', el, move, dragger, drop);
			self.append('hover', el, on, down);
		};	
	
		var exists = function(target, source, reverse) {
				for (var i = settings.collection.length - 1; i >= 0; i--){
					if(settings.collection[i].from == target && settings.collection[i].to == source){
						return true;
					} else if(reverse){
						if(settings.collection[i].from === source && settings.collection[i].to == target){					
							return true;
						}
					}
				};
				return false;
			},
	
			// Default behavior  to drag'n'drop 
	     	dragger = function (x,y,e) {
	
				stageWork.source = this;

				this.animate({"fill-opacity": .2}, 100);			
				
				var path = ['M',e.layerX, e.layerY,'L',e.layerX, e.layerY].join(',');
				this.path = this.paper.path(path).attr({'stroke-dasharray': 10, stroke : '#fff'});
				
				this.ox = e.layerX;
				this.oy = e.layerY;				
	
	   	   },

	       move = function (dx, dy) {
				
				repath(this.path, this.ox + dx, this.oy + dy);
		        settings.r.safari();
	       },

	       drop = function () {

				this.animate({"fill-opacity": 0}, 100);
				this.path.remove();
	
				if(stageWork.target != null && stageWork.target != stageWork.source){
					if(! exists(stageWork.target, stageWork.source, true)){
						settings.collection.push(association(this, stageWork.target, '#fff'));					
					}
				}
		
				stageWork.source = null;
	       },

		   on = function() {
		
			   	this.animate({"fill-opacity": .4}, 100);

				if (stageWork.source == null ) {
					stageWork.source = this;
				}else if (stageWork.source !== this){
					stageWork.target = this;
				}

		   },
	
		   down = function() {
				this.animate({"fill-opacity": 0}, 100);
				stageWork.target = null;
		   };
	
	
	
		var repath = function(path, x, y) {
			var cordenates = path.attrs.path[0];
			path.attr({path : ['M', cordenates[1], cordenates[2] , 'L', x, y ].join(',')});
		};
	
	
		//Associate the elements with a path line 
		var association = function(source, target) {

			var line; 

			//In case that redraw line path pass just the object returned by this function
			if (source.path && source.from && source.to) {
		        line = source;
		        source = line.from;
		        target = line.to;
		    };

			var box1 = source.getBBox(),
		        box2 = target.getBBox();

			var fromX = box1.x + (box1.width / 2 ),
				fromY = box1.y + (box1.height / 2 );

			//Working around TODO change the way that we do this.
			if(target.type == "circle"){
				toX   = box2.x;
				toY   = box2.y;
			}else{
				toX   = box2.x + ( box2.width / 2 );
				toY   = box2.y + ( box2.height / 2);
			}

			var path = ["M", fromX, fromY, "L", toX, toY].join(',');

			if (line && line.path) {
		        line.path.attr({path: path});
		    } else {
		        return {
		            path: settings.r.path(path).attr({'stroke-dasharray': 10, stroke : '#fff'}),
		            from: source,
		            to: target
		        };
		    }
		};
	
		this.init();
	};

	r.scale = {
	
		linear : function() {
		
			var domain = [0,1],
				range  = [0,0],
				base   = [];
		
			function scale(x){
				return base[domain.indexOf(x)];
			};
		
		 	function rescale() {
				var scability = interpolate();
				base = [];
				base.push(range[0]);
				for (var i=0; i < domain.length; i++) {
					base.push(base[i] + scability);
				};		

				return scale;
			};
	
			scale.domain = function(x) {
				if(! arguments.length ) return this.domain;
				domain = x.map(Number);
				return rescale();
			},

			scale.range = function(x) {
				if(! arguments.length ) return range;
				range = x.map(Number);
				return rescale();
			};
		
			function interpolate(){
				return Math.round( (range[1] - range[0]) / domain.length);
			}
			return scale;
		}
	}; 
	
	window.Rassoci = r;
})();