var start = {
    id: 'start-panel',
    layout: 'fit',
    bodyStyle: 'padding:25px',
    contentEl: 'start-div',
    tbar: [{
			text:'Download OWL',
			xtype: 'button',
			icon : 'images/box_downloa.png',
			handler: function(){
    			var dominio = Ext.getCmp('dominio').getValue();
    			var email = Ext.getCmp('email').getValue();
    			if(dominio != '' && email != ''){
    				window.location.href='/EditorM-MOBI/arquivoOWL.owl?dominio='+dominio+'&email='+email;
    			}else {
    				Ext.MessageBox.alert('Email',  'Please fill in the Email and Domain fields to get the OWL.');
    			}
    			}
    		},{
    		text:'Import OWL',
			xtype: 'button',
			icon : 'images/box_downloa.png',
			handler: function(){
    				uploadOWLPopUp();
    			}
    		},{
        		xtype : 'textfield',
        		id : 'dominio',
        		emptyText  : 'Domain Modeling',
                name: 'domonio',
                style : {margin : '0px 0px 0px 20px'}
    		},
    		{
    		xtype : 'textfield',
    		id : 'email',
    		emptyText  : 'Email',
            name: 'email',
            vtype:'email',
            style : {margin : '0px 0px 0px 20px'}
    		},
    		{
			text:'Save Mobi',
			icon : 'images/arrow_down.png',
			handler: function(){
    			var email = Ext.getCmp('email').getValue();
    			var dominio = Ext.getCmp('dominio').getValue();
    			if(email == ''&& dominio != ''){
    				Ext.MessageBox.alert('Email',  'Please fill in the Email and Domain fields to get the OWL.');
    			}else {
    				 Ext.MessageBox.show({
				           title: 'Please wait',
				           msg: 'Saving State...',
				           progressText: 'Saving...',
				           width:300,
				           progress:true,
				           closable:false,
				           animEl: 'mb6'
				       });
	
				       // this hideous block creates the bogus progress
				       var f = function(v){
				            return function(){
				                if(v == 12){
				                    Ext.MessageBox.hide();
				                    Ext.MessageBox.alert('Save',  'Stat has been saved with success!');
				                }else{
				                    var i = v/11;
				                    Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% salvo ...');
				                }
				           };
				       };
				       params = {email : email, dominio : dominio};
				       ajaxManipularDados('/EditorM-MOBI/salvarEstadoMobi.do',params , function(){});
				       
				       for(var i = 1; i < 13; i++){
				          setTimeout(f(i), i*500);
				       }
    				    
    			}
			}
    		},
    		{
			text:'Recovery Mobi',
			icon : 'images/arrow_up.png',
			handler: function(){
    			var email = Ext.getCmp('email').getValue();
    			var dominio = Ext.getCmp('dominio').getValue();
    			if(email == '' && dominio != ''){
    				Ext.MessageBox.alert('Email',  'Por favor Preencha o Email e o Domínio Para poder Salvar o Estado.');
    			}else {
    				 Ext.MessageBox.show({
    					   title: 'Por favor Aguarde',
				           msg: 'Recuperando Estado...',
				           progressText: 'Recuperando...',
				           width:300,
				           progress:true,
				           closable:false,
				           animEl: 'mb6'
				       });
	
				       // this hideous block creates the bogus progress
				       var f = function(v){
				            return function(){
				                if(v == 12){
				                    Ext.MessageBox.hide();
				                    Ext.MessageBox.alert('Email',  'Estado Recuperado com Sucesso!');
				                }else if(v == 'erro'){
				                	Ext.MessageBox.hide();
				                	Ext.MessageBox.alert('Erro', 'O E-Mail fornecido não foi encontrado no sistema.'); 
				                }else{
				                    var i = v/11;
				                    Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% Recuperado ...');
				                }
				           };
				       };
				       params = {email : email, dominio : dominio};
				       
				       ajaxManipularDados('recuperarMobi.do',params, function(response, status){
				    	   if(status != 'success'){
				    		   f('erro')();
			                   
				    	   }else {
				    		   for(var i = 1; i < 13; i++){
					    		   setTimeout(f(i), i*500);
						       }
				    		   $('#graphContainerDiagrama').html(response.responseText);
				    		   resetarRelacoes();
				    	   }
				       });
				       
				    
    				    
    			}	
    			}
    		}
    ]
};

Ext.onReady(function(){
		
	Ext.QuickTips.init();
	
	var detailEl;
	
	var contentPanel = new Ext.Panel({
		id: 'content-panel',
		region: 'center', 
		layout: 'card',
		margins: '2 5 5 0',
		activeItem: 0,
		border: false,
		items: [ start ]
	});
	
	var classes =  new Ext.data.ArrayStore({
	    fields: ['abt', 'classe'],
	    data : [] 
	});	
	
	//Inputs 
	var classeA =  new Ext.form.ComboBox({
		id : mobi.CLASSEA,
        store: classes,
        hideLabel: true,
        width: 149,
        displayField: 'classe',
        style: { margin : '10px 0px 5px 30px'},
        hideTrigger: true,
        mode: 'local',
        value:'ClassA',
        listeners : {
			change : function (text,newValue,oldValue){
				buscarInstancias(newValue, mobi.CONJUNTO_A, Ext.getCmp('tipoRelacao').getValue());
				mobi.RELATION.classeA = newValue;
				}
        }

	});
	

	var classeB =  new Ext.form.ComboBox({
			id : mobi.CLASSEB,
	        store: classes,
	        hideLabel: true,
	        width: 149,
	        displayField: 'classe',
	        style: { margin : '10px 0px 5px 35px'},
	        hideTrigger: true,
	        mode: 'local',
	        value:'ClassB',
	        listeners : {
				change : function (text,newValue,oldValue){
	        			buscarInstancias(newValue, mobi.CONJUNTO_B, Ext.getCmp('tipoRelacao').getValue());
	        			mobi.RELATION.classeB = newValue;
					}
	        }

		});
		
	
	var radioGroup =  new Ext.form.FieldSet({
		id: 'fieldSetRadioGroup',
		title: 'Relation Types',
	    autoHeight: true,
	    items: [{
	        xtype: 'radiogroup',
	        hideLabel: true,
	        id: 'tipoRelacao',
	        items: [
				{boxLabel: 'Inheritance', name: 'rb-auto', id: mobi.INHERITANCE, stateId :mobi.INHERITANCE, disabled: true},
				{boxLabel: 'Composition', name: 'rb-auto', id: mobi.COMPOSITION, stateId : mobi.COMPOSITION, disabled: true,
					listeners: {check: function(radio, checked) { if(checked){adcionarFieldTextDaComposicao('fieldSetRadioGroup');}else{removerFieldTextDaComposicao('fieldSetRadioGroup');}  }}},
				{boxLabel: 'Equivalence', name: 'rb-auto', id: mobi.EQUIVALENCE, stateId : mobi.EQUIVALENCE, disabled: true},
	        ]
	    }]
	});
	
	
	//Buttons 
	var panelButtons = [{
	    	iconCls:'add',
	        text:'Add Instance A',
	        width: 170,
	        scope: this,
	        handler: function(){
	        	if(qtdInstanciasConjuntoA <= 5)
				{
					instanceGraph.getModel().beginUpdate();
					parent = instanceGraph.getDefaultParent();
		            try
		            {
		            	
		            	var nameClass = Ext.getCmp(mobi.CLASSEA).getValue();

		            	if ( nameClass == ''){
		            			nameClass = 'ClasseA';

		            	}
		            	var nomeInstancia = 'i'+ nameClass +'_'+ qtdInstanciasConjuntoA;
		            	var index = 0;
		            	/*while(validarInstanciaExistente(nomeInstancia)){
		            		nomeInstancia  = 'i'+ nameClass +'_'+index;
		            	}*/
		            	var idInstancia = mobi.CONJUNTO_A+' ' + nomeInstancia;
		            	var instancia1 = criarCellVertex(instanceGraph ,idInstancia, nomeInstancia, xLeft, yLeft, widhtInstance, heightInstance, mobi.colorRandom());
	
		            	instanciasConjuntoA[qtdInstanciasConjuntoA - 1] = new mobi.Instance(nomeInstancia, instancia1.getStyle());
		            	qtdInstanciasConjuntoA++;
		            	yLeft = yLeft + 50;
		            	adcionarUmaInstancia(nomeInstancia,mobi.CONJUNTO_A,nameClass);
		            	validarRelacionamentos();
		               
		            }
		            finally
		            {
		               // Updates the display
		               instanceGraph.getModel().endUpdate();
		            }
				}
	    	}
		},{
	        name : 'save-realtion',
	        text:'OK',
	        //disabled : true,
	        width: 70,
	        handler: function(){
				var relacao = Ext.getCmp('tipoRelacao').getValue();
	    		var classeA = Ext.getCmp(mobi.CLASSEA).getValue();
	    		var classeB = Ext.getCmp(mobi.CLASSEB).getValue();
	    		
	    		if(relacao!= null && classeA != '' && classeB !=  ''){
	    		
		    		params = { tipoRelacao : relacao.getId(), classeA : classeA , classeB: classeB} ;
		    		
		    		if(mobi.RELATION.exist){
		    			params['nameRelation'] = mobi.RELATION.nameRelation;
		    		}
		    		
		    		if (relacao.getId() == mobi.COMPOSITION){
		    			var ida = Ext.getCmp('ida').getValue();
		    			var volta = Ext.getCmp('volta').getValue();
		    			
		    			if(ida != ''){
			    			params['tipoRelacao'] = relacao.getStateId();
			    			params['ida']= ida;
			    			params['volta'] = volta;
			    			
			    			ajaxDivUpdate('graphContainerDiagrama', '/EditorM-MOBI/ajaxDiagrama.do', params, resetarRelacoes);
		    			}
		    			else {
		    				Ext.MessageBox.alert('Erro',  'Classe/Relacao deve estar preenchida');
		    			}
		    		}else {
		    			
		    			ajaxDivUpdate('graphContainerDiagrama', '/EditorM-MOBI/ajaxDiagrama.do', params, resetarRelacoes); 
		    		}
	    		}else { Ext.MessageBox.alert('Erro',  'Classe/Relacao deve estar preenchida');}
			}
	    },{
	        iconCls:'add',
	        width: 170,
	        scope: this,
	        text:'Add Instance B',
	        handler: function(){
	    	if(qtdInstanciasConjuntoB <= 5)
			{
				instanceGraph.getModel().beginUpdate();
				
	            try
	            {
	            	var nameClass = Ext.getCmp(mobi.CLASSEB).getValue();

	            	if ( nameClass == ''){
	            			nameClass = 'ClasseB';
	            	}
	            	var nomeInstancia = 'i'+ nameClass +'_'+ qtdInstanciasConjuntoB;
	            	var index = 0;
	            	/*while(validarInstanciaExistente(nomeInstancia)){
	            		nomeInstancia  = 'i'+ nameClass +'_'+index;
	            	}*/
	            	var idInstancia = mobi.CONJUNTO_B+' ' + nomeInstancia;
	            	var instancia1 = criarCellVertex(instanceGraph, idInstancia, nomeInstancia, xRight, yRight, widhtInstance, heightInstance, mobi.colorRandom());
	            	
	            	instanciasConjuntoB[qtdInstanciasConjuntoB -1] = new mobi.Instance(nomeInstancia, instancia1.getStyle());  
	            	qtdInstanciasConjuntoB++;
	            	yRight = yRight + 50;
	            	adcionarUmaInstancia(nomeInstancia,mobi.CONJUNTO_B,nameClass);
	            	validarRelacionamentos();
	               
	            }
	            finally
	            {
	               instanceGraph.getModel().endUpdate();
	            }
			}
		}
	}];
	
	var treePanel = new Ext.FormPanel({
		id: 'tree-panel',
		region:'north',
		height: 300,
		minSize: 150,
		autoScroll: true,
		tbar:[{
			text:'New Relation',
			xtype: 'button',
			icon : 'images/paper_48.png',
			handler: function(){
			resetarRelacoes();
    		}
		}],
		contentEl: 'relaco-div'
	});
	

	
	
	var classesPanel = {
		xtype: 'panel',
		id: 'classes-panel',
		height: 150,
	    region: 'center', 
	    bodyStyle: 'padding-bottom:15px',
		autoScroll: true,
		tbar : panelButtons,
		items: [{	
			bodyBorder : false,
			items:[{
            layout:'column',
            border:false,
            items:[{    columnWidth:.5,
            			labelAlign: 'top',
	                	layout: 'form',
	                	border:false,
	                	items : [classeA]
	               	},{
                		columnWidth:.5,
                		labelAlign: 'top',
                		layout: 'form',
                		border:false,
                		items : [classeB]}
	               	]
		        },
		        	radioGroup
		        ]}]
	};
		
    new Ext.Viewport({
		layout: 'border',
		title: 'Ext Layout Browser',
		items: [{
				xtype: 'box',
				region: 'north',
				applyTo: 'header',
				height: 30
			},{
				layout: 'border',
		    	id: 'layout-browser',
		        region:'west',
		        border: false,
		        split:true,
				margins: '2 0 5 5',
		        width: 420,
		        minSize: 200,
		        maxSize: 500,
				items: [classesPanel,treePanel]
			},
				contentPanel
			],
        renderTo: Ext.getBody()
    });
    ajaxDivUpdate('graphContainerDiagrama', '/EditorM-MOBI/diagramaInit.do',null,function(){});
});





function abrirPopupComposicao(instanceGraph, cell){
	
	var win = new Ext.Window({
        title: 'Properties Definition',
        closable:true,
        modal:true,
        width:300,
        height:150,
        closeAction:'close',
        items:new Ext.FormPanel({
        		bodyStyle: 'padding: 10px 10px ;background:#eee;',
        		bodyBorder : false,
    	        hideLabel: true,
    	        height: 130,
    	        id: 'tipoRelacao-2',
    	        items: 
        		[new Ext.form.TextField({
        	    	id : 'ida_popup',
        	    	fieldLabel : 'Out',
        	    	width : 150,
        	    	hideLabel : false,
        	    	listeners : {
        				change : function (text,newValue,oldValue){
        					volta = Ext.getCmp('volta_popup').getValue();
        					detectorTipoComposicao(newValue, volta, 'label-popup','tipoRelacao-2');
        					}
        				}
        	    }),        		
        		new Ext.form.TextField({
        	    	id : 'volta_popup',
        	    	fieldLabel : 'Return',
        	    	width : 150,
    	    		hideLabel : false,
        	    	listeners : {
        				change : function (text,newValue,oldValue){
        					ida = Ext.getCmp('ida_popup').getValue();
        					detectorTipoComposicao( ida , newValue, 'label-popup','tipoRelacao-2');
        					}
        				}
        	    }),
        	    new Ext.form.Label({
        	    	id: 'label-popup',
        	    	text: ''
        	    })] 
        	    
        	}),
        buttons: [{text :'Create',
				  handler : function (){
		        	var ida = Ext.getCmp('ida_popup').getValue();
					var volta = Ext.getCmp('volta_popup').getValue();
					var tipo_relacao = Ext.getCmp('tipoRelacao-2').getStateId();
        			if(ida != ''){
						parent = instanceGraph.getDefaultParent();
						ClasseNova = criarCellVertex(instanceGraph, 'Novo', 'Novo', 0, 0, widht, height); 
						instanceGraph.insertEdge(parent, null, '', ClasseNova,cell);
						instanceGraph.startEditingAtCell(ClasseNova);
													
						params = { tipoRelacao :tipo_relacao , classeA : cell.id , classeB : ClasseNova.id , ida : ida , volta : volta };
							 
						ajaxDivUpdate('graphContainerDiagrama','/EditorM-MOBI/ajaxDiagrama.do',params, resetarRelacoes);
						
						win.close();
        			}
			      }
        }]
	}).show();
}


function detectorTipoComposicao(ida, volta, label,idComponente){
	
	if (ida != '' || volta != ''  ){
		label  = Ext.getCmp(label); 
		if(ida != '' && volta == '' || ida == '' && volta != '' ){
			//uniderecional 
			label.setText('Unidirectional');
			Ext.getCmp(idComponente).stateId = mobi.UNIDIRECIONAL_COMPOSITION;
		}
			
		if(ida != '' && volta != '' && ida != volta ){
			//bidirecional
			label.setText('Bidirectional');
			Ext.getCmp(idComponente).stateId = mobi.BIDIRECIONAL_COMPOSITION;
		}
		
		if(ida != '' && volta != '' && ida == volta ){
			//simetrica
			label.setText('Symmetrical');
			Ext.getCmp(idComponente).stateId = mobi.SYMMETRIC_COMPOSITION;
		}
	}	
	
}

function buscarInstancias(classe,conjunto,tipoRelacao){
	
	var params = 'nomeClasse=' + classe + '&conjunto=' + conjunto + '&tipoRelacao=' + tipoRelacao;
	
	var panel = Ext.get('relaco-div');
	panel.getUpdater().update( {
		url : '/EditorM-MOBI/ajaxBuscarInstancia.do',
		params : params,
		scripts : true,
		loadScripts: true
	});
	
}

function carregarRelacao(nomeRelation,tipoRelacao){
    
	var params = 'nomeRelation=' + nomeRelation + '&tipoRelacao='+tipoRelacao;
    var panel = Ext.get('relaco-div');
    panel.getUpdater().update( {
      url : '/EditorM-MOBI/ajaxCarregarRelacao.do',
      params : params,
      scripts : true,
      loadScripts: true
    });
}


function uploadOWLPopUp(){
	
	var fileUploadFormPanel = new Ext.FormPanel({
		fileUpload : true,
        frame : true,
        layout : 'fit',
        bodyStyle : 'padding:25px',
        title : 'File Upload Form',
        autoHeight : true,
        labelWidth : 50,
        defaults : {
            anchor : '85%',
            allowBlank : false,
            msgTarget : 'side'
        },
        items : [ {
            xtype : 'fileuploadfield',
            id : 'form-file',
            emptyText : 'Select an file',
            fieldLabel : 'file',
            name : 'file',
            buttonCfg : {
                text : '',
                iconCls : 'upload-icon'
            }
        } ],
        buttons : [{
	        text : 'Upload',
	        handler : function() {
	            if (fileUploadFormPanel.getForm().isValid()) {
	            	fileUploadFormPanel.getForm().submit({
	                    url : 'uploadOWL.do',
	                    waitMsg : 'Loading OWL ...',
	                    success : function(fileUploadFormPanel, o) {
		            		Ext.Msg.show( {
	                    		title : 'Success',
	                    		msg : 'OWL has been loaded with Success!',
	                    		minWidth : 200,
	                    		modal : true,
	                    		icon : Ext.Msg.INFO,
	                    		buttons : Ext.Msg.OK,
	                    		fn:function(btn){
		            				win.close();
		            				ajaxDivUpdate('graphContainerDiagrama', '/EditorM-MOBI/diagramaInit.do', null, resetarRelacoes);
		            			}
	                    	});
	                    }
	                });
	            }
	        }

        }, {
            text : 'Reset',
            handler : function() {
                fileUploadFormPanel.getForm().reset();
        	}
        } ]
    });
	
	
	var win = new Ext.Window({
        title: 'Properties Definition',
        closable:true,
        modal:true,
        width:350,
        height:170,
        closeAction:'close',
        items:fileUploadFormPanel
	}).show();
}
