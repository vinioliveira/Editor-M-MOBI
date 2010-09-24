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
				buscarInstancias(newValue,this.id,Ext.getCmp("tipoRelacao").getValue());
				}
			}
	});
	

	var classeB =  new Ext.form.TextField({
		id : 'classeB',
		value: 'ClasseB',
		style: { margin : '5px 5px 5px 30px'},
		listeners : {
			change : function (text,newValue,oldValue){
				buscarInstancias(newValue,this.id,Ext.getCmp("tipoRelacao").getValue());
				}
			}
	});
	
	var radioGroup =  new Ext.form.FieldSet({
		id: 'fieldSetRadioGroup',
		title: 'Tipos de Relações',
        autoHeight: true,
        items: [{
            xtype: 'radiogroup',
            fieldLabel: 'Tipo',
            id: 'tipoRelacao',
            items: [
				{boxLabel: 'Herança', name: 'rb-auto', id: 'Heranca'},
				{boxLabel: 'Composição', name: 'rb-auto', id: 'Composicao',
				 listeners: {check: function(radio, checked) { if(checked){adcionarFieldTextDaComposicao();}else{removerFieldTextDaComposicao();}  }}},
				{boxLabel: 'Equivalência', name: 'rb-auto', id: 'Equivalencia'},
            ]
        }]
    });
	
	function adcionarFieldTextDaComposicao(){
		var ida =  new Ext.form.TextField({
	    	id : 'ida',
	    	fieldLabel : 'Ida'
	    });
		
		var volta =  new Ext.form.TextField({
	    	id : 'volta',
	    	fieldLabel : 'Volta'
	    });
		
		var fp = new Ext.FormPanel({
					id: 'form',
					bodyBorder : false,
					items: [ida,volta]
		});
		Ext.getCmp('fieldSetRadioGroup').add(fp);
		Ext.getCmp('fieldSetRadioGroup').doLayout();
		
	}
	
	function removerFieldTextDaComposicao(){
		
		Ext.getCmp('fieldSetRadioGroup').remove('form');
		Ext.getCmp('fieldSetRadioGroup').doLayout();
		
	}
	
	//Buttons 
	var panelButtons = [{
	    	id:'add-instancia',
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
		               var nomeInstancia = 'i'+Ext.getCmp("classeB").getValue() + qtdInstanciasConjuntoA;
		               var idInstancia = 'ConjuntoA ' + nomeInstancia;
		               var nameClass = '';
		               var instancia1 = graph.insertVertex(parent, idInstancia, nomeInstancia, xLeft, yLeft, widht, height);
	
		               if(qtdInstanciasConjuntoA == 1){
		            	   nameClass = 'Classe ' + qtdClasses;
		            	   if(Ext.getCmp("classeA").getValue(nameClass) == ''){
		            		   Ext.getCmp("classeA").setValue(nameClass);
		            	   }
		            	   qtdClasses++;			               
		               }
		               
		               instanciasConjuntoA[qtdInstanciasConjuntoA] = nomeInstancia;
		               qtdInstanciasConjuntoA++;
		               yLeft = yLeft + 40;
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
	        id:'ok',
	        iconCls:'delete-icon',
	        text:'OK',
	        width: 70,
	        handler: function(){
	    		var relacao = Ext.getCmp("tipoRelacao").getValue();
	    		var classeA = Ext.getCmp("classeA").getValue();
	    		var classeB = Ext.getCmp("classeB").getValue();
	    		        		
	    		if(relacao!= '' && classeA != '' && classeB !=  ''){
	        		params = 'tipoRelacao=' + relacao + '&classeA=' + classeA + '&classeB=' + classeB;
	        		ajaxDivUpdate('graphContainerDiagrama', '/EditorM-MOBI/ajaxDiagrama.do', params); 
	        		
	    		}else { Ext.MessageBox.alert('Erro',  'Classe/Relacao deve estar preenchida');

	    			//Ext.Msg.alert('Status',);
	    			}
			}
	    },{
	        id:'delete',
	        iconCls:'add',
	        width: 170,
	        text:'Add Instancia B',
	        handler: function(){
	    	if(qtdInstanciasConjuntoB <= 5)
			{
				graph.getModel().beginUpdate();
				parent = graph.getDefaultParent();
	            try
	            {
	               var nomeInstancia = 'I'+ Ext.getCmp("classeB").getValue() + qtdInstanciasConjuntoB;
	               var idInstancia = 'ConjuntoB ' + nomeInstancia;
	               var nameClass = '';
	               var instancia1 = graph.insertVertex(parent, idInstancia, nomeInstancia, xRight, yRight, widht, height);
	
	               if(qtdInstanciasConjuntoB == 1){
	            	   nameClass = 'Classe ' + qtdClasses;
	            	   if(Ext.getCmp("classeB").getValue() == ''){
	            		   Ext.getCmp("classeB").setValue(nameClass);
	            	   }
	            	   qtdClasses++;			               
	               }
	               
	               instanciasConjuntoB[qtdInstanciasConjuntoB] = nomeInstancia;
	               qtdInstanciasConjuntoB++;
	               yRight = yRight + 40;
	               adcionarUmaInstancia(nomeInstancia,'ConjuntoB',nameClass);
	               
	            }
	            finally
	            {
	               // Updates the display
	               graph.getModel().endUpdate();
	            }
			}
		}
	    }];
	
	// Go ahead and create the TreePanel now so that we can use it below
	var treePanel = new Ext.FormPanel({
		id: 'tree-panel',
		region:'north',
		height: 250,
		minSize: 150,
		autoScroll: true,
		tbar:panelButtons ,
		contentEl: 'relaco-div',
	    items: []
	    
	});
	

	
	
	var classesPanel = {
		
		id: 'classes-panel',
	    height: 200,
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
		
	// Finally, build the main layout once all the pieces are ready.  This is also a good
	// example of putting together a full-screen BorderLayout within a Viewport.
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