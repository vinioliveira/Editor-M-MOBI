
function ajaxDivUpdate(div, action, params, callback){
	
	
	$.ajax({
		type: 'POST',
		url : action,
		data: params,
		success : function (data){ 
			$('#'+div).html(data);
			callback();
		}
	});
	
}



function ajaxRequest(action, params){
	
	$.ajax({
		type: 'POST',
		url : action,
		data : params
	});
}

