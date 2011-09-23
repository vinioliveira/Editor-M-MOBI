(function($){
	labelsRef = {
		class : {
			a	: "#class-a",
			b	: "#class-b"
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
		
	 	view = new ClassesView({collection : window.classes});
		updateDialogHtml(view.render().el, "Classes");
		
		$('a.add-class').click(function() {
			input = $(this);
			openFormDialog(function() {
				console.log(arguments)
				// classUri = $("input#class-name").val();
				// 			class = new Class({ uri : classUri });
				// 			class.save({error : function(){
				// 					alert('Something went wrong!');
				// 				},
				// 				success : function() {
				// 					//Probally will be extracted to a method
				// 					classElId = labelsRef.class[input.attr("side")];
				// 					$(classElId).val(classUri);
				// 				}
				// 			});
			});
		})
	};
	
})(jQuery);