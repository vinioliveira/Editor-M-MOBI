
function ajaxDivUpdate(div, action, params, callback){
	new Ajax.Updater(div, action, 
				{
					method: 'post',
					parameters:params,
					evalScripts : true,
					onComplete : callback
					
				});
}



function ajaxRequest(action, params){
	
	new Ajax.Request(action, {
			method : 'post',
			parameters : params
		});
}

