//evento associado ao bot�o
 evento=null;


 function cancelar(event,title,message,callBack){

	//cancelar resposta � notificacao//
	Ext.onReady(function(){
		
			evento=event;//variavel usada no ajaxsubmitreferer
			// the 'fn' for the message box can then reset the form or not based on the users selection
			Ext.MessageBox.show({
				title:title,
				msg: message,
				buttons: {yes:'Sim', no:'N�o'},
				modal : true,
				fn: callBack,
				animEl: event.target,
				icon: Ext.MessageBox.QUESTION
			});
	    

	});
}

