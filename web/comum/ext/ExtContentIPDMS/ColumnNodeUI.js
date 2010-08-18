/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns('Ext.ux.tree');

/**
 * @class Ext.ux.tree.ColumnTree
 * @extends Ext.tree.TreePanel
 * 
 * @xtype columntree
 */
Ext.ux.tree.ColumnTree = Ext.extend(Ext.tree.TreePanel, {
    lines:false,
    borderWidth: Ext.isBorderBox ? 0 : 2, // the combined left/right border for each cell
    cls:'x-column-tree',
      
    onRender : function(){
		Ext.tree.ColumnTree.superclass.onRender.apply(this, arguments);        
		 this.headers = this.header.createChild({cls:'x-tree-headers'});
        
        var cols = this.columns, c;
        var totalWidth = 0;
        var scrollOffset = 19; // similar to Ext.grid.GridView default

        for(var i = 0, len = cols.length; i < len; i++){
             c = cols[i];
             totalWidth += c.width;
             this.headers.createChild({
                 cls:'x-tree-hd ' + (c.cls?c.cls+'-hd':''),
                 cn: {
                     cls:'x-tree-hd-text',
                     html: c.header
                 },
                 style:'width:'+(c.width-this.borderWidth)+'px;'
             });
        }
        this.headers.createChild({cls:'x-clear'});
        // prevent floats from wrapping when clipped
        this.headers.setWidth(totalWidth+scrollOffset);
        this.innerCt.setWidth(totalWidth);
    }
});

Ext.reg('columntree', Ext.ux.tree.ColumnTree);

//backwards compatibility
Ext.tree.ColumnTree = Ext.ux.tree.ColumnTree;


/**
 * @class Ext.ux.tree.ColumnNodeUI
 * @extends Ext.tree.TreeNodeUI
 */
Ext.ux.tree.ColumnNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    focus: Ext.emptyFn, // prevent odd scrolling behavior
    
    //evitar que segundo click expanda o no
    onDblClick     : function(e){},
    renderElements : function(n, a, targetNode, bulkRender){
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        var t = n.getOwnerTree();
        var cols = t.columns;
        var bw = t.borderWidth;
        var c = cols[0];
        var cb = typeof a.checkbox == 'object';
        
       //change the "var buf =" line to create the kind of markup that we want to see in your node. 
        var buf = [
             '<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf ', a.cls,'">',
                '<div class="x-tree-col" style="width:',c.width-bw,'px;">',
                    '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
                    '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
                    '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on">',
                    '<a hidefocus="on" class="x-tree-node-anchor" href="',a.href ? a.href : "#",'" tabIndex="1" ',
                    a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '>',
                    '<span unselectable="on">', n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</span></a>",
                "</div>"];
         for(var i = 1, len = cols.length; i < len; i++){
             c = cols[i];

             buf.push('<div class="x-tree-col ',(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;">',
                        '<div class="x-tree-col-text" align="center">',(c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),
                        cb ? ('<input class="x-tree-node-cb" type="checkbox"' + (a.checkbox.name ? ' name="' + a.checkbox.name + '"' : "name=asd ") + (a.checkbox.value ? ' value="' + a.checkbox.value + '"' : "") + (a.checkbox.id ? ' id="' + a.checkbox.id + '"' : "") + (a.checkbox.checked ? ' checked="checked"' : "") + (a.checkbox.disabled ? 'disabled' : "") + ' />') : '',
                        "</div>",
                      "</div>");
         }
         buf.push(
            '<div class="x-clear"></div></div>',
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>");

        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin",
                                n.nextSibling.ui.getEl(), buf.join(""));
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(""));
        }

        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        var index = 3;
        if(cb){
            this.checkbox = cs[3];
            
            this.checkbox.defaultChecked = this.checkbox.checked;            
            index++;
        }
        this.anchor = cs[index];
        this.textNode = cs[3].firstChild;
    }
});
//backwards compatibility
Ext.tree.ColumnNodeUI = Ext.ux.tree.ColumnNodeUI;


/**
 * @class Ext.ux.tree.ColumnParamNodeUI
 * @extends Ext.tree.TreeNodeUI
 */
Ext.ux.tree.ColumnParamNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    focus: Ext.emptyFn, // prevent odd scrolling behavior
    
  //evitar que segundo click expanda o no
    onDblClick     : function(e){},
    onClick		   : function(e){},
    renderElements : function(n, a, targetNode, bulkRender){
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        var t = n.getOwnerTree();
        var cols = t.columns;
        var bw = t.borderWidth;
        var c = cols[0];
        var cb = typeof a.checkbox == 'object';
        var im = typeof a.img == 'object';

        var nodeId = "'"+n.id+"'";
        var changeCol = false;
                
       //change the "varbuf =" line to create the kind of markup that we want to see in your node. 
        var buf = [
             '<li class="x-tree-node"><div id="tree-node-'+n.id+'" ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf ', a.cls,'">',
                '<div class="x-tree-col" style="width:',c.width-bw,'px; height:',c.height-bw,'px;">',
                    '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
                    '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
                    '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on">',
                    '<a hidefocus="on" onclick="editNode('+nodeId+','+n.getDepth()+');" tabIndex="1" ',
                    a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '>',
                    '<span unselectable="on" style="text-decoration:underline;">', n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</span></a>",
                "</div>"];
         for(var i = 1, len = cols.length; i < len; i++){
             c = cols[i];

             buf.push('<div class="x-tree-col ',(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;">',
                     '<div class="x-tree-col-text" align="center">',(c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]));
             
             if(changeCol) {
                     buf.push(cb ? ('<input class="x-tree-node-cb" type="checkbox"' + (a.checkbox.name ? ' name="' + a.checkbox.name + '"' : "name=asd ") + (a.checkbox.value ? ' value="' + a.checkbox.value + '"' : "") + (a.checkbox.id ? ' id="' + a.checkbox.id + '"' : "") + (a.checkbox.checked ? ' checked="checked"' : "") + ' />') : '');
                     changeCol = false;
             }
             else {
                    if(a.levelMax!=null) {
                    	if(n.getDepth()<a.levelMax) {
                    		 buf.push(im ? ('<img src="' + a.img.src +'" onclick="createNode('+nodeId+','+n.getDepth()+');"/>') : '');
                    	}
                    }
                    changeCol = true;
             }
             buf.push("</div>",
                   "</div>");
         }
         buf.push(
            '<div class="x-clear"></div></div>',
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>");

        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin",
                                n.nextSibling.ui.getEl(), buf.join(""));
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(""));
        }

        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        var index = 3;
        if(cb){
            this.checkbox = cs[3];
            
            this.checkbox.defaultChecked = this.checkbox.checked;            
            index++;
        }
        this.anchor = cs[index];
        this.textNode = cs[3].firstChild;
    }
});

