(function($) {	
	
	window.Templates ={
		class 			 : "class-tmpl",
		class_form_list  : "classes-form-list-tmpl",
		class_form_input : "classes-form-input-tmpl",
		instance  		 : "instances-tmpl",
		relation    	 : "relation-tmpl"
	}
	
	// #class-form-template
	$.template(
		"classes-form-input-tmpl", 
		["<input type='text' id='class-name'>${uri}</input>",
		 "<div class='class-list'>{{tmpl(list) 'classes-form-list-tmpl' }}</div>"].join('')
	);
	
	$.template(
		"classes-form-list-tmpl", 
		"<p><span type='text' class='instance'>${uri}</span></p>"
	);
	
	// #instance-template
	$.template(
		"instances-tmpl",
		"<span class='instance'>${uri}</span>"
	);
	
	// #class-template
	$.template(
		'class-tmpl',
		"<input class='class left' type='text' value='${uri}'></input>"
	);
	
	//  #relation-template	
	$.template(
		'relation-tmpl',
		["<div id='map-relation' class='box'>",
			"<div class='header'>",
				"<img src='/images/transfer.png'>",
				"Relation : <i>${uri}</i>",
				"<div class='action'>",
					"<a class='add relation' href='#'>"	,
						"relation ",
						"<img src='/images/plus.png'>",
					"</a>",
				"</div>",
			"</div>",
			"<div class='instancesA'></div>",
			"<div class='instancesB'></div>",
		"</div>",
		"<div id='options'>",
			"<div class='actions'>",
				"<a class='add-class left' data-side='B' href='#'>",
					"<img src='/images/plus.png'>",
					"<label id='class-b'>${classB['attributes']['uri']}</label>",
				"</a>",
				"<a class='add-class right' data-side='A' href='#'>",
					"<label id='class-a'>${classA['attributes']['uri']}</label>",
					"<img src='/images/plus.png'>",
				"</a>",
			"</div>",
			"<div class='classA'></div>",
			"<div class='classB'></div>",
		"</div>"].join("")
	);

})(jQuery)