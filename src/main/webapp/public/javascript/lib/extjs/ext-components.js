var start = {
    id: 'start-panel',
    layout: 'fit',
    bodyStyle: 'padding:25px',
    contentEl: 'start-div',
    tbar: [{
				text:'Baixar OWL',
				xtype: 'button',
				icon : 'images/box_downloa.png'
			},{
				text:'Importar OWL',
				xtype: 'button',
				icon : 'images/box_downloa.png'
			},{
        		xtype : 'textfield',
        		id : 'dominio',
        		emptyText  : 'Dominio Modelado',
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
				text:'Salvar Mobi',
				icon : 'images/arrow_down.png'
			},
    		{
				text:'Recuperar Mobi',
				icon : 'images/arrow_up.png'
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
        value:'ClasseA'        
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
	        value:'ClasseB'
		});
		
	
	var radioGroup =  new Ext.form.FieldSet({
		id: 'fieldSetRadioGroup',
		title: 'Tipos de Relações',
	    autoHeight: true,
	    items: [{
	        xtype: 'radiogroup',
	        hideLabel: true,
	        id: 'tipoRelacao',
	        items: [
				{boxLabel: 'Herança', name: 'rb-auto', id: mobi.INHERITANCE, stateId :mobi.INHERITANCE, disabled: true},
				{boxLabel: 'Composição', name: 'rb-auto', id: mobi.COMPOSITION, stateId : mobi.COMPOSITION, disabled: true,
					listeners: {check: function(radio, checked) { if(checked){adcionarFieldTextDaComposicao('fieldSetRadioGroup');}else{removerFieldTextDaComposicao('fieldSetRadioGroup');}  }}},
				{boxLabel: 'Equivalência', name: 'rb-auto', id: mobi.EQUIVALENCE, stateId : mobi.EQUIVALENCE, disabled: true},
	        ]
	    }]
	});
	
	
	//Buttons 
	var panelButtons = [{
			iconCls:'add',
		    text:'Add Instancia A',
		    width: 170,
		    scope: this
		},{
	        name : 'save-realtion',
	        text:'OK',
	        //disabled : true,
	        width: 70
	    },{
	        iconCls:'add',
	        width: 170,
	        scope: this,
	        text:'Add Instancia B'
	}];
	
	var treePanel = new Ext.FormPanel({
		id: 'tree-panel',
		region:'north',
		height: 300,
		minSize: 150,
		autoScroll: true,
		tbar:[{
			text:'Nova Relação',
			xtype: 'button',
			icon : 'images/paper_48.png'
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
    //ajaxDivUpdate('graphContainerDiagrama', '/EditorM-MOBI/diagramaInit.do',null,function(){});
});





/*function abrirPopupComposicao(instanceGraph, cell){
	
	var win = new Ext.Window({
        title: 'Definição Propriedades',
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
        	    	fieldLabel : 'Ida',
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
        	    	fieldLabel : 'Volta',
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
        buttons: [{text :'Criar',
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
			label.setText('Unidirecional');
			Ext.getCmp(idComponente).stateId = mobi.UNIDIRECIONAL_COMPOSITION;
		}
			
		if(ida != '' && volta != '' && ida != volta ){
			//bidirecional
			label.setText('Bidirecional');
			Ext.getCmp(idComponente).stateId = mobi.BIDIRECIONAL_COMPOSITION;
		}
		
		if(ida != '' && volta != '' && ida == volta ){
			//simetrica
			label.setText('Simetrica');
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
	                    waitMsg : 'Carregando OWL ...',
	                    success : function(fileUploadFormPanel, o) {
		            		Ext.Msg.show( {
	                    		title : 'Sucesso',
	                    		msg : 'OWL Carregado com Sucesso!',
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
        title: 'Definição Propriedades',
        closable:true,
        modal:true,
        width:350,
        height:170,
        closeAction:'close',
        items:fileUploadFormPanel
	}).show();
}
*/
