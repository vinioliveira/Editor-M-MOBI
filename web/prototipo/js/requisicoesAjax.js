
function ajaxDivUpdate (div, action, params){
	new Ajax.Updater(div, action, 
				{
					method: 'get',
					parameters:params,
					evalScripts : true,
					onComplete : resetarRelacoes
				});
}