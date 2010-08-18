	//METODOS USADOS PARA COLOCAR VALORES NO JSP CORRESPONDENTES Á SELECCAO DOS NÓS/LINHAS NAS TREEPANELS/GRIDPANELS//
	

	function affectParent(value, description,win,valueplace,descplace){
		
		//se tiver dentro de um span- configuracao para aparecer como link com sublinhado//
		if(description.indexOf("<span")>=0){
			var doc=document.createElement('div');
			doc.innerHTML=description;
			description=doc.firstChild.innerHTML;
		}
		
		document.getElementById(valueplace).value=value;
		if(document.getElementById(descplace).type=="text")
			document.getElementById(descplace).value=description;
		else
		document.getElementById(descplace).innerHTML=description;
		 win.close();
	}
	
	function affectParentMultiple(win,valueplace,descplace){
		var idsSelected = '';
		var descSelected = '';
		var elements1 = $$('input[type="checkbox"]').each(function filter(item) {
			if(item.checked) {
				idsSelected += item.id.sub("check_", "") + ';';
				descSelected += $F(item) + ';';
			}
		});
		affectParent(idsSelected, descSelected,win,valueplace,descplace);
	}
	
	
	function affectParentMultipleGrid(grid,win,valueplace,descplace){
		var idsSelected = '';
		var descSelected = '';
		var selected =grid.getSelectionModel().getSelections();
		
		for(i=0;i<selected.length;i++){
		
			idsSelected += selected[i].data.id + ';';
		    descSelected += selected[i].data.name + ';';
		}
	

		affectParent(idsSelected, descSelected,win,valueplace,descplace);
	}
	
	
	function Checkboxes(state) {
            $$('input[type="checkbox"][id^="check_"]').each(function filter(item) {
                        {
                        item.checked=state;
                        }
            });
            
      }   
	
	function GridCheckBoxes(grid,state) {
		if(state)
			grid.getSelectionModel().selectAll();	
		else
			grid.getSelectionModel().clearSelections();	
	}   
	
	///////////CRIACAO DOS HANDLERS DOS BOTOES USADOS NO PANEL E TREEPANEL///////////////////
 
		function newButton(title,func){
			return new Ext.Button({
				text:title,
				handler:func
			});
		}
		
		expandeTodos= function(tree){tree.expandAll();};
		
		colapseTodos= function(tree){tree.collapseAll(); Checkboxes(false);};
		
		fecharWin   = function(window){
					      window.close();};
		
		alteraParent= function(value,description,win,valuePlace,descPlace){
					      affectParent(value,description,win,valuePlace,descPlace);};
			
		alteraParentMultiple= function(win,valuePlace,descPlace){
			affectParentMultiple(win,valuePlace,descPlace);};
		
		alteraParentMultipleGrid= function(grid,win,valuePlace,descPlace){
			affectParentMultipleGrid(grid,win,valuePlace,descPlace);};
		
		CheckBoxState= function(state){Checkboxes(state);};
		
		gridCheckBoxState= function(grid,state){GridCheckBoxes(grid,state);};
	
///////////REDIMENSAO DE COLUNA TITULO DO HEADER DA TREEPANEL///////////////////	
		function resizeTreePanelHeader(treePanel){
			
			treePanel.on("resize", function(Ccontainer, Cwidth, Cheight) {
				
				var scrollOffset = 19;
				var secondColumn = 68;//segunda coluna(seleccionar) tem tamanho fixo
				Cwidth=Cwidth-scrollOffset-secondColumn;//primeira coluna
  				var bw = Ext.isBorderBox ? 0 : 2;
 					 var widths = [((Cwidth)*1), secondColumn];
  					 var totalWidth = 0;
 					 for (var i = 0; i < widths.length; i++) {
 					   totalWidth += widths[i];
  					   Ext.select("div.x-tree-hd:nth-child(" + (i+1) + ")", false, "*TreeID*").setWidth(widths[i]);
					   Ext.select("div.x-tree-col:nth-child(" + (i+1) + ")", false, "*TreeID*").setWidth(widths[i]);
					   treePanel.columns[i].width = widths[i];
  						}

 					treePanel.headers.setWidth(totalWidth+scrollOffset);
 					treePanel.innerCt.setWidth(totalWidth);
					});  
			
			
		}