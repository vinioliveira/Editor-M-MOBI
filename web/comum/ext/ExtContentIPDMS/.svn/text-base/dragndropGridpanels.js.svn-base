Ext.onReady(function(){

		//Ext.util.CSS.swapStyleSheet("theme","${JS_DIR}/ext/resources/css/xtheme-gray.css");

		Ext.grid.CheckboxSelectionModel.override({
		    handleMouseDown : Ext.emptyFn   
		});
		
		//modelo que permite seleccionar as linhas com checkboxes
		Ext.grid.RowSelectionModel.override({
		    initEvents : function() {
		        if(!this.grid.enableDragDrop && !this.grid.enableDrag){
		            this.grid.on("rowmousedown", this.handleMouseDown, this);
		        }else{ // allow click to work like normal
		            this.grid.on("rowclick", function(grid, rowIndex, e) {
		                var target = e.getTarget();                
		                if(target.className !== 'x-grid3-row-checker' && e.button === 0 && !e.shiftKey && !e.ctrlKey) {
		                    this.selectRow(rowIndex, false);
		                    grid.view.focusRow(rowIndex);
		                }
		            }, this);
		        }

		        this.rowNav = new Ext.KeyNav(this.grid.getGridEl(), {
		            "up" : function(e){
		                if(!e.shiftKey){
		                    this.selectPrevious(e.shiftKey);
		                }else if(this.last !== false && this.lastActive !== false){
		                    var last = this.last;
		                    this.selectRange(this.last,  this.lastActive-1);
		                    this.grid.getView().focusRow(this.lastActive);
		                    if(last !== false){
		                        this.last = last;
		                    }
		                }else{
		                    this.selectFirstRow();
		                }
		            },
		            "down" : function(e){
		                if(!e.shiftKey){
		                    this.selectNext(e.shiftKey);
		                }else if(this.last !== false && this.lastActive !== false){
		                    var last = this.last;
		                    this.selectRange(this.last,  this.lastActive+1);
		                    this.grid.getView().focusRow(this.lastActive);
		                    if(last !== false){
		                        this.last = last;
		                    }
		                }else{
		                    this.selectFirstRow();
		                }
		            },
		            scope: this
		        });

		        var view = this.grid.view;
		        view.on("refresh", this.onRefresh, this);
		        view.on("rowupdated", this.onRowUpdated, this);
		        view.on("rowremoved", this.onRemove, this);        
		    }
		}); 
				

		var cmodel=  Ext.grid;
		var firstGridCheckBox =new cmodel.CheckboxSelectionModel();
		var secondGridCheckBox =new cmodel.CheckboxSelectionModel();
		  
	  
	
	 // Generic fields array to use in both store defs.
		var fields = [
		   {name: 'name', mapping : 'name'},	
		   {name: 'id', mapping : 'id'}	,
		   {name: 'descricao', mapping : 'descricao'}
		   
		];

		  // create the data store
	    var firstGridStore = new Ext.data.JsonStore({
	        fields : fields,
			data   : elemDisp,
			root   : 'records'
	    });
				
	 // Column Model shortcut array
		var cols = [firstGridCheckBox,
			{id : 'name',  header: headerCol1, width: 200, sortable: true, dataIndex: 'name'},
			{id : 'desc',  header: headerCol2, width: 300, sortable: true, dataIndex: 'descricao'}
		];


		var cols2 = [secondGridCheckBox,
					{id : 'name',  header: headerCol1, width: 200, sortable: true, dataIndex: 'name'},
					{id : 'desc',  header: headerCol2, width: 300, sortable: true, dataIndex: 'descricao'}
				];

	 	//declarar o grid de origem
		// declare the source Grid
		
	    var firstGrid = new cmodel.GridPanel({
			ddGroup          : 'secondGridDDGroup',
			ddText 			 : '{0}'+ ddtext,
	        store            : firstGridStore,
	        columns          : cols,
			enableDragDrop   : true,
	        stripeRows       : true,
	        autoExpandColumn : 'desc',
	        width            : 600,
			region           : 'west',
	        title            : titledisp,
		    sm               : firstGridCheckBox
	    
	    });

	    var secondGridStore = new Ext.data.JsonStore({
	        fields : fields,
			root   : 'records',
			data   : elemEsc
	    });

		//criar o Grid de destino
	    // create the destination Grid
	    var secondGrid = new cmodel.GridPanel({
			ddGroup          : 'firstGridDDGroup',
			ddText 			 : '{0}'+ ddtext,
	        store            : secondGridStore,
	        columns          : cols2,
			enableDragDrop   : true,
	        stripeRows       : true,
	        autoExpandColumn : 'desc',
	        width            : 600,
			region           : 'center',
	        title            : titleesc,
	        sm	             : secondGridCheckBox
	    });

		
	  //Simple 'border layout' panel to house both grids
		var displayPanel = new Ext.Panel({
			width    : 1200,
			height   : 300,
			footer   : true,
			layout   : 'border',
			renderTo : 'panel',
			items    : [
				firstGrid,
				secondGrid
			],
			bbar: new Ext.ux.StatusBar({
			        id: 'infoarea',
			        //valores por defeito a usar quando os status é limpo/apagado
			        defaultText: mainStatus,
			        defaultIconCls: 'default-icon',
			        //valores de inicio
			        text: mainStatus,
			        iconCls: 'ready-icon'
			    })
			
		});
					
		// used to add records to the destination stores
		var blankRecord =  Ext.data.Record.create(fields);

		/****
		* Setup Drop Targets
		***/
		// This will make sure we only drop to the view container
		var firstGridDropTargetEl =  firstGrid.getView().el.dom.childNodes[0].childNodes[1];
		var firstGridDropTarget = new Ext.dd.DropTarget(firstGridDropTargetEl, {
			ddGroup    : 'firstGridDDGroup',
			copy       : true,
			notifyDrop : function(ddSource, e, data){
				
				// Generic function to add records.
				function addRow(record, index, allItems) {

					// Search for duplicates
					var foundItem = firstGridStore.find('id', record.data.id);
					// if not found
					if (foundItem  == -1) {
						
						//adicionar as funcoes associadas ao user
						var funcoes=verifyFuncAction(record.data.id);
					
						if(funcoes==false){
							
							
						firstGridStore.add(record);
						
						dropPostActions(record.data.id,'rem');
						// Call a sort dynamically
						firstGridStore.sort('name', 'ASC');
						
						//Remove Record from the source
						ddSource.grid.store.remove(record);
				
						}else //caso haja alguma funcao associada ao user, esta variavel ficara sempre a true
							exist=true;
						
						//verificar se foram percorridos todos os elementos arrastados e se alguma funcao percorrida esta associada ao user
					    if(index==allItems.length-1 && exist){
						Ext.MessageBox.alert('Aviso', 'A(s) '+headerCol1+'(s): '+funcoesUser+' encontram-se ligada(s) a Utilizador(s) do sistema. ');
						funcoesUser='';
						index=0;
						exist=false;
						}
						
						index++;
					}
				}

				// Loop through the selections
				Ext.each(ddSource.dragData.selections ,addRow);
				return(true);
			}
		}); 	

		
		// This will make sure we only drop to the view container
		var secondGridDropTargetEl = secondGrid.getView().el.dom.childNodes[0].childNodes[1]
		
		var destGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
			ddGroup    : 'secondGridDDGroup',
			copy       : false,
			notifyDrop : function(ddSource, e, data){
				
				// Generic function to add records.
				function addRow(record, index, allItems) {
					
					// Search for duplicates
					var foundItem = secondGridStore.find('id', record.data.id);
					// if not found
					if (foundItem  == -1) {
							
							secondGridStore.add(record);

							dropPostActions(record.data.id,'add');
							// Call a sort dynamically
							secondGridStore.sort('name', 'ASC');
				
							//Remove Record from the source
							ddSource.grid.store.remove(record);
						}
				}
				// Loop through the selections
				Ext.each(ddSource.dragData.selections ,addRow);
				return(true);
			}
		}); 
			
	});