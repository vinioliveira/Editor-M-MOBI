/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
//
// Note that these are all defined as panel configs, rather than instantiated
// as panel objects.  You could just as easily do this instead:
//
// var absolute = new Ext.Panel({ ... });
//
// However, by passing configs into the main container instead of objects, we can defer
// layout AND object instantiation until absolutely needed.  Since most of these panels
// won't be shown by default until requested, this will save us some processing
// time up front when initially rendering the page.
//
// Since all of these configs are being added into a layout container, they are
// automatically assumed to be panel configs, and so the xtype of 'panel' is
// implicit.  To define a config of some other type of component to be added into
// the layout, simply provide the appropriate xtype config explicitly.
//
/*
 * ================  Start page config  =======================
 */
// The default start page, also a simple example of a FitLayout.
var start = {
    id: 'start-panel',
    title: 'Diagrama',
    layout: 'fit',
    bodyStyle: 'padding:25px',
    contentEl: 'start-div',
    tbar: [{
			text:'Gerar OWL',
			scope: this,
			handler: function(){
    			
    			new Ajax.Request('/EditorM-MOBI/gerarArquivoOWL.do', 
  				{
  					method: 'post',
  					evalScripts : true
  				});
    		
    		}
    }]// pull existing content from the page
};

