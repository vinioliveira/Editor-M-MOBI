//evento associado ao botão
 evento=null;


 function cancelar(event,title,message,callBack){

	//cancelar resposta á notificacao//
	Ext.onReady(function(){
		
			evento=event;//variavel usada no ajaxsubmitreferer
			// the 'fn' for the message box can then reset the form or not based on the users selection
			Ext.MessageBox.show({
				title:title,
				msg: message,
				buttons: {yes:'Sim', no:'Não'},
				modal : true,
				fn: callBack,
				animEl: event.target,
				icon: Ext.MessageBox.QUESTION
			});
	    

	});
}

