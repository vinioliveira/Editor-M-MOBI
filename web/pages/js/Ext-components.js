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
	
	//Inputs 
	var classeA =  new Ext.form.TextField({
		id : 'classeA',
		style: { margin : '5px 0px 5px 30px'},
		value: 'ClasseA',
		listeners : {
			change : function (text,newValue,oldValue){
				buscarInstancias(newValue,this.id,Ext.getCmp('tipoRelacao').getValue());
				}
			}
	});
	

	var classeB =  new Ext.form.TextField({
		id : 'classeB',
		value: 'ClasseB',
		style: { margin : '5px 5px 5px 30px'},
		listeners : {
			change : function (text,newValue,oldValue){
				buscarInstancias(newValue,this.id,Ext.getCmp('tipoRelacao').getValue());
				}
			}
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
				{boxLabel: 'Herança', name: 'rb-auto', id: 'Heranca'},
				{boxLabel: 'Composição', name: 'rb-auto', id: 'Composicao',
					listeners: {check: function(radio, checked) { if(checked){adcionarFieldTextDaComposicao('fieldSetRadioGroup');}else{removerFieldTextDaComposicao('fieldSetRadioGroup');}  }}},
				{boxLabel: 'Equivalência', name: 'rb-auto', id: 'Equivalencia'},
	        ]
	    }]
	});
	
	function adcionarFieldTextDaComposicao(){
		
		var ida =  new Ext.form.TextField({
	    	id : 'ida',
	    	fieldLabel : 'Ida',
    		listeners : {
				change : function (text,newValue,oldValue){
					volta = Ext.getCmp('volta').getValue();
					detectorTipoComposicao(newValue, volta, 'label-type');
					}
				}
	    });
		
		var volta =  new Ext.form.TextField({
	    	id : 'volta',
	    	fieldLabel : 'Volta',
    		listeners : {
				change : function (text,newValue,oldValue){
						ida = Ext.getCmp('ida').getValue();
						detectorTipoComposicao(ida , newValue, 'label-type');
						}
					}
	    });
		
		var label = new Ext.form.Label({
			id: 'label-type',
			text: '',
			  style: {
					width: '50px' 
				}
		});
		
		var fp = new Ext.FormPanel({
					id: 'form',
					bodyBorder : false,
					items: [ida,volta,label]
		});
		
		Ext.getCmp('fieldSetRadioGroup').add(fp);
		Ext.getCmp('fieldSetRadioGroup').doLayout();
		
	}

	function removerFieldTextDaComposicao(componete){
		
		Ext.getCmp('fieldSetRadioGroup').remove('form');
		Ext.getCmp('fieldSetRadioGroup').doLayout();
		
	}
		
	
	//Buttons 
	var panelButtons = [{
	    	iconCls:'add',
	        text:'Add Instancia A',
	        width: 170,
	        scope: this,
	        handler: function(){
	        	if(qtdInstanciasConjuntoA <= 5)
				{
					graph.getModel().beginUpdate();
					parent = graph.getDefaultParent();
		            try
		            {
		               var nomeInstancia = 'i'+Ext.getCmp('classeA').getValue() + qtdInstanciasConjuntoA;
		               var idInstancia = 'ConjuntoA ' + nomeInstancia;
		               var nameClass = Ext.getCmp('classeA').getValue();
		               var instancia1 = criarCellVertex(graph ,idInstancia, nomeInstancia, xLeft, yLeft, widhtInstance, heightInstance,'shape=cloud');
	
		               instanciasConjuntoA[qtdInstanciasConjuntoA] = nomeInstancia;
		               qtdInstanciasConjuntoA++;
		               yLeft = yLeft + 50;
		               adcionarUmaInstancia(nomeInstancia,'ConjuntoA',nameClass);
		               
		            }
		            finally
		            {
		               // Updates the display
		               graph.getModel().endUpdate();
		            }
				}
	    	}
		},{
	        iconCls:'delete-icon',
	        text:'OK',
	        width: 70,
	        handler: function(){
				var relacao = Ext.getCmp('tipoRelacao').getValue();
	    		var classeA = Ext.getCmp('classeA').getValue();
	    		var classeB = Ext.getCmp('classeB').getValue();
	    		
	    		if(relacao!= null && classeA != '' && classeB !=  ''){
	    		
		    		params = 'tipoRelacao=' + relacao.getId() + '&classeA=' + classeA + '&classeB=' + classeB ;
		    		
		    		if (relacao.getId() == 'Composicao'){
		    			var ida = Ext.getCmp('ida').getValue();
		    			var volta = Ext.getCmp('volta').getValue();
		    			params += '&ida=' + ida + '&volta=' + volta;	 
		    		}

	    			ajaxDivUpdate('graphContainerDiagrama', '/EditorM-MOBI/ajaxDiagrama.do', params, resetarRelacoes); 
	        		
	    		}else { Ext.MessageBox.alert('Erro',  'Classe/Relacao deve estar preenchida');}
			}
	    },{
	        iconCls:'add',
	        width: 170,
	        text:'Add Instancia B',
	        handler: function(){
	    	if(qtdInstanciasConjuntoB <= 5)
			{
				graph.getModel().beginUpdate();
				
	            try
	            {
	               var nomeInstancia = 'I'+ Ext.getCmp('classeB').getValue() + qtdInstanciasConjuntoB;
	               var idInstancia = 'ConjuntoB ' + nomeInstancia;
	               var nameClass = Ext.getCmp('classeB').getValue();
	               var instancia1 = criarCellVertex(graph, idInstancia, nomeInstancia, xRight, yRight, widhtInstance, heightInstance, 'shape=cloud');
	
	               instanciasConjuntoB[qtdInstanciasConjuntoB] = nomeInstancia;
	               qtdInstanciasConjuntoB++;
	               yRight = yRight + 50;
	               adcionarUmaInstancia(nomeInstancia,'ConjuntoB',nameClass);
	               
	            }
	            finally
	            {
	               graph.getModel().endUpdate();
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
		tbar:panelButtons ,
		contentEl: 'relaco-div'
	});
	

	
	
	var classesPanel = {
		
		id: 'classes-panel',
	    height: 150,
	    region: 'center', 
	    bodyStyle: 'padding-bottom:15px',
		autoScroll: true,
		contentEl: 'classes',
		tbar : panelButtons,
		items: [{
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
});





function abrirPopupComposicao(graph, cell){
	
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
        	    	hideLabel : false,
        	    	listeners : {
        				change : function (text,newValue,oldValue){
        					volta = Ext.getCmp('volta_popup').getValue();
        					detectorTipoComposicao(newValue, volta, 'label-popup');
        					}
        				}
        	    }),        		
        		new Ext.form.TextField({
        	    	id : 'volta_popup',
        	    	fieldLabel : 'Volta',
    	    		hideLabel : false,
        	    	listeners : {
        				change : function (text,newValue,oldValue){
        					ida = Ext.getCmp('ida_popup').getValue();
        					detectorTipoComposicao( ida , newValue, 'label-popup');
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
        			if(ida != '' && volta != ''){
						parent = graph.getDefaultParent();
						ClasseNova = criarCellVertex(graph, 'Novo', 'Novo', 0, 0, widht, height); 
						graph.insertEdge(parent, null, '', ClasseNova,cell);
						graph.startEditingAtCell(ClasseNova);
													
						
						
						
						params = 'tipoRelacao=Composicao' + '&classeA=' + cell.id + '&classeB=' + ClasseNova.id + '&ida=' + ida + '&volta=' + volta;;
						ajaxDivUpdate('graphContainerDiagrama','/EditorM-MOBI/ajaxDiagrama.do',params, resetarRelacoes);
						
						win.close();
        			}
			      }
        }]
	}).show();
}


function detectorTipoComposicao(ida, volta, label){
	
	if (ida != '' || volta != ''  ){
		label  = Ext.getCmp(label); 
		if(ida != '' && volta == '' || ida == '' && volta != '' ){
			//uniderecional 
			label.setText('Unidirecional');
		}
			
		if(ida != '' && volta != '' && ida != volta ){
			//bidirecional
			label.setText('Bidirecional');
		}
		
		if(ida != '' && volta != '' && ida == volta ){
			//simetrica
			label.setText('Simetrica');
		}
	}	
	
}
