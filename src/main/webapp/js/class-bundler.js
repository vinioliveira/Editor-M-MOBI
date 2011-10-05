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
	
	closeDialog = function(){
		$("#dialog").dialog('close');
	};
	
	updateLabel = function(label, uri ){
		classElId = labelsRef.class[label.data("side")];
		$(classElId).text(uri);
	};
	
	attchClassFormEvent = function() {
		$('a.add-class').click(function() {
			label = $(this);
			window.classes.fetch({
				success : function(){
				 	view = new ClassesView({collection : window.classes});
					updateDialogHtml(view.render().el, "Classes");
	
					openFormDialog(function() {
						classUri = $("input#class-name").val();
						if(classUri == "") return;
						
						//Clean input 
						$("input#class-name").val("");
						new Class({ uri : classUri }).save()	
							.error(function(){
								alert('Ho no! Something went wrong, please proceed again.');
							}).success(function() {
								//Probally will be extracted to a method
								updateLabel(label, classUri);
								closeDialog();
							}
						);
					});
					
					$('#dialog p span').click(function(){
						updateLabel(label, $(this).text());
						closeDialog();
					});
				}
			});
		});
	};
	
})(jQuery);