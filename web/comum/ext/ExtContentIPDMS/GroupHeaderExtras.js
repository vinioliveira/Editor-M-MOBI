Ext.override(Ext.grid.GridView, {	
	// private
    beforeColMenuShow : function(){
        var cm = this.cm,  colCount = cm.getColumnCount();
        var grps = cm.groupedHeaders;
        this.colMenu.removeAll();
        for(var i = 0; i < colCount; i++){
            if(cm.config[i].fixed !== true && cm.config[i].hideable !== false){
                this.colMenu.add(new Ext.menu.CheckItem({
                    id: "col-"+cm.getColumnId(i),
                    text: cm.getColumnHeader(i),
                    checked: !cm.isHidden(i),
                    hideOnClick:false,
                    disabled: cm.config[i].hideable === false
                }));
            }
        }
        if(grps){
        	var mg = [];
			for(var x=0; x<grps.length; x++){
			// 	create menu config item for every grouped header
		  		if(grps[x].header != ""){
					if(grps[x].columns.length > 0){			
						mg.push({text: grps[x].header,
				 		cols: grps[x].columns,
				 		checked: !grps[x].isHidden,
				 		hideOnClick: false
						});
					} else if(grps[x].subHeadings.length > 0){
						var hc = [];
						var sm = [];
						for(var y=0; y<grps[x].subHeadings.length; y++){
							for(var z=0; z<grps[x].subHeadings[y].columns.length; z++){
								hc.push(grps[x].subHeadings[y].columns[z]);
							}
							sm.push({text: grps[x].subHeadings[y].header,
					 		groupHeader:true,
					 		parentItem: 'grp-'+x,
					 		cols: grps[x].subHeadings[y].columns,
					 		checked: !grps[x].subHeadings[y].isHidden,
					 		hideOnClick: false
							});
						}
						var smen = new Ext.menu.Menu({items: sm});
						this.colMenu.add({text: grps[x].header,
						 		cols: hc,
						 		itemId: 'grp-'+x,
						 		groupHeader: true,
						 		checked: !grps[x].isHidden,
						 		hideOnClick: false,
						 		menu: smen
						});
						smen.on("itemclick", this.handleHdMenuClick, this);
					}
		  		}
			}
		}
    },
    // private
    handleHdMenuClick : function(item){
        var index = this.hdCtxIndex;
        var cm = this.cm, ds = this.ds;
        if(item.groupHeader){
        	for(var i = 0; i < cm.config.length; i++){
				if(item.cols.contains(cm.config[i].dataIndex)){
					cm.setHidden(cm.getColumnId(i), item.checked);
				}
				if(item.menu){
					for(var f=0; f<item.menu.items.items.length; f++){
						var chk = (item.checked) ? false : true;
						item.menu.items.items[f].setChecked(chk, true);
					}
				}				
				else if(item.parentMenu.parentMenu){
					var cc=0;
					var pm=item.parentMenu.parentMenu.items.items;
					for(var p=0; p<pm.length; p++){
						if(pm[p].itemId == item.parentItem){
							var pi = pm[p];
							var sm = pm[p].menu.items.items;
							for(var x=0; x<sm.length; x++){
								if(sm[x].checked){
									cc++;
								}
							}
						}
					}
					cc = (item.checked) ? cc-1 : cc+1;
					if(cc == 0 && pi){
						pi.setChecked(false, true);
					} else {
						pi.setChecked(true, true);
					}
				}
			}
        	return true;
        }
        switch(item.id){
            case "asc":
                ds.sort(cm.getDataIndex(index), "ASC");
                break;
            case "desc":
                ds.sort(cm.getDataIndex(index), "DESC");
                break;
            default:
                index = cm.getIndexById(item.id.substr(4));
                if(index != -1){
                    if(item.checked && cm.getColumnsBy(this.isHideableColumn, this).length <= 1){
                        this.onDenyColumnHide();
                        return false;
                    }
                    cm.setHidden(index, item.checked);
                }
        }
        return true;
    }
});


Ext.override(Ext.grid.ColumnModel, {
  isMenuDisabled : function(col) {
    return !!this.config[col].menuDisabled;
  }
});


Ext.override(Ext.grid.HeaderDropZone, {
	getAllowedColRange: function(col){
		var cm = this.grid.colModel;
		var colDataIdx = cm.getDataIndex(col);
		var minIdx =99999;
        var maxIdx =0;
		if(cm.headersByColumn){
        	var grps = cm.headersByColumn[colDataIdx];
        	var grpCols = cm.columnsByHeader[grps[grps.length-1]];
	        // get the column id's from the config.
			for(var i = 0; i < cm.config.length; i++){
				if(grpCols.contains(cm.config[i].dataIndex)){
					maxIdx = Math.max(maxIdx, i);
					minIdx = Math.min(minIdx, i);
    			}
			}
		} else {
			maxIdx = 99999;
			minIdx = 0;
		}
		return {max: maxIdx, min:minIdx};
	},
	positionIndicator : function(h, n, e){
        var x = Ext.lib.Event.getPageX(e);
        var r = Ext.lib.Dom.getRegion(n.firstChild);
        var px, pt, py = r.top + this.proxyOffsets[1];
        if((r.right - x) <= (r.right-r.left)/2){
            px = r.right+this.view.borderWidth;
            pt = "after";
        }else{
            px = r.left;
            pt = "before";
        }
        var oldIndex = this.view.getCellIndex(h);
        var newIndex = this.view.getCellIndex(n);

        if(this.grid.colModel.isFixed(newIndex)){
            return false;
        }

        var locked = this.grid.colModel.isLocked(newIndex);

        if(pt == "after"){
            newIndex++;
        }
        if(oldIndex < newIndex){
            newIndex--;
        }
        if(oldIndex == newIndex && (locked == this.grid.colModel.isLocked(oldIndex))){
            return false;
        }
        
        var range = this.getAllowedColRange(oldIndex);
        if(newIndex < range.min){
           //console.log('outside group, too low');
			return false;
        }
        if(newIndex > range.max){
          	//console.log('outside group, too high');
          	return false;
        }
        
        px +=  this.proxyOffsets[0];
        this.proxyTop.setLeftTop(px, py);
        this.proxyTop.show();
        if(!this.bottomOffset){
            //this.bottomOffset = this.view.mainHd.getHeight();
        	// calc height from the main header row not the grouped headers
            this.bottomOffset = Ext.get(this.view.innerHd.firstChild.firstChild).getHeight();
        }
        this.proxyBottom.setLeftTop(px, py+this.proxyTop.dom.offsetHeight+this.bottomOffset);
        this.proxyBottom.show();
        return pt;
    },
	onNodeDrop : function(n, dd, e, data){
        var h = data.header;
        if(h != n){
            var cm = this.grid.colModel;
            var x = Ext.lib.Event.getPageX(e);
            var r = Ext.lib.Dom.getRegion(n.firstChild);
            var pt = (r.right - x) <= ((r.right-r.left)/2) ? "after" : "before";
            var oldIndex = this.view.getCellIndex(h);
            var newIndex = this.view.getCellIndex(n);
            var locked = cm.isLocked(newIndex);

			var range = this.getAllowedColRange(oldIndex);
            
            if(pt == "after"){
                newIndex++;
            }
            if(oldIndex < newIndex){
                newIndex--;
            }
            if(oldIndex == newIndex && (locked == cm.isLocked(oldIndex))){
                return false;
            }
            
            if(newIndex < range.min){
            	//console.log('outside group, too low');
            	return false;
            }
            if(newIndex > range.max){
            	//console.log('outside group, too high');
            	return false;
            }
            
            cm.setLocked(oldIndex, locked, true);
            cm.moveColumn(oldIndex, newIndex);
            this.grid.fireEvent("columnmove", oldIndex, newIndex);
            return true;
        }
        return false;
    }
});
Ext.override(Ext.grid.GridView, {
  // private
  handleHdOver : function(e, t) {
    var hd = this.findHeaderCell(t);
    if (hd && !this.headersDisabled) {
      this.activeHd = hd;
      this.activeHdIndex = this.getCellIndex(hd);
      var fly = this.fly(hd);
      this.activeHdRegion = fly.getRegion();
      if (!this.cm.isMenuDisabled(this.activeHdIndex)) {
      //if(!this.cm.isMenuDisabled(this.activeHdIndex) || (this.cm.isSortable(this.activeHdIndex) || (this.grid.enableColumnHide !== false)) && !this.cm.isFixed(this.activeHdIndex)){
        fly.addClass("x-grid3-hd-over");
        this.activeHdBtn = fly.child('.x-grid3-hd-btn');
        if (this.activeHdBtn) {
          this.activeHdBtn.dom.style.height = (hd.firstChild.offsetHeight-1)+'px';
        }
      }
    }
  }
});