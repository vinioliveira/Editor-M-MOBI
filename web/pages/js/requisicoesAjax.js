
function ajaxDivUpdate(div, action, params, callback){
	new Ajax.Updater(div, action, 
				{
					method: 'get',
					parameters:params,
					evalScripts : true,
					onComplete : callback
					
				});
}



function ajaxRequest(action, params){
	
	new Ajax.Request(action, {
			method : 'get',
			parameters : params
		});
}