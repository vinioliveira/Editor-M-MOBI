(function($){
	labelsRef = {
		class : {
			A	: "#class-a",
			B	: "#class-b"
		}
	}
		
	openFormDialog = function(cb) {
		$("#dialog").dialog({	
			modal 	 : true, 
			buttons  :{
				"Create" : cb,
				"Cancel" : function() {
					$(this).dialog("close");
				}
			}
		});
	};
	
	updateDialogHtml = function(html, title) {
		$('#dialog').empty();
		$('#dialog').html(html);
		$('#dialog').attr("title", (title || "Ihuuu"));
	};
	
	attchClassFormEvent = function() {
		$('a.add-class').click(function() {
			
			window.classes.fetch({success : function(){
			 	view = new ClassesView({collection : window.classes});
				updateDialogHtml(view.render().el, "Classes");
				
				input = $(this);
				openFormDialog(function() {
					classUri = $("input#class-name").val();
					if(classUri == "") return;
					
					//Clean input 
					$("input#class-name").val("");
					new Class({ uri : classUri }).save()	
						.error(function(){
							alert('Something went wrong!');
						}).success(function() {
							//Probally will be extracted to a method
							classElId = labelsRef.class[input.data("side")];
							$(classElId).text(classUri);
							$("#dialog").dialog('close');
						});
				});
			}});
		});
	};
	
})(jQuery);