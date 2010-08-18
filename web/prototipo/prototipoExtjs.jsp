<!--
  $Id: extjs.html,v 1.5 2009/07/10 14:12:23 david Exp $
  Copyright (c) 2006-2009, JGraph Ltd
  
  ExtJs example for mxGraph. This example demonstrates using
  mxGraph inside an ExtJS window.
-->
<html>
<head>
	<title>Hello, World! example for mxGraph</title>
	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/comum/ext/resources/css/ext-all.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/comum/ext/ext-base.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/comum/ext/ext-all.js"></script>

	<!-- Sets the basepath for the library if not in same directory -->
	<script type="text/javascript">
		mxBasePath = 'http://www.mxgraph.com/demo/mxgraph/src/';
	</script>

	<!-- Loads and initiaizes the library -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/comum/js/mxClient.js"></script>

	<!-- Example code -->
	<script type="text/javascript">
		// Program starts here. Creates a sample graph in the
		// DOM node with the specified ID. This function is invoked
		// from the onLoad event handler of the document (see below).
		var graph;
		
		function main(container)
		{
			// Checks if the browser is supported
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				// Creates the graph inside the given container
				graph = new mxGraph(container);
				
				// Enables rubberband selection
				new mxRubberband(graph);
				graph.setPanning(true);
				graph.setTooltips(true);
				
				// Gets the default parent for inserting new cells. This
				// is normally the first child of the root (ie. layer 0).
				var parent = graph.getDefaultParent();
								
				// Adds cells to the model in a single step
				graph.getModel().beginUpdate();
				try
				{
					var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
					var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
					var e1 = graph.insertEdge(parent, null, '', v1, v2);
				}
				finally
				{
					// Updates the display
					graph.getModel().endUpdate();
				}
			}
		};
		
		Ext.onReady(function()
		{
		    var win;
		    var button = Ext.get('show-btn');
		
		    button.on('click', function()
		    {
		        // create the window on the first click and reuse on subsequent clicks
		        if(!win)
		        {
		            win = new Ext.Window(
		            {
		                el:'hello-win',
		                layout:'fit',
		                width:500,
		                height:300,
		                closeAction:'hide',
		                plain: true,
		                
		                items: new Ext.TabPanel(
		                {
		                    el: 'hello-tabs',
		                    autoTabs:true,
		                    activeTab:0,
		                    deferredRender:false,
		                    border:false
		                }),
		
		                buttons: [
		                {
		                    text:'Submit',
		                    disabled:true
		                },
		                {
		                    text: 'Close',
		                    handler: function()
		                    {
		                        win.hide();
		                    }
		                }]
		            });
		            
		            // Fits the SVG container into the window
		            win.on('resize', function()
		            {
		                graph.sizeDidChange();
		            });
		        }
		        
		        win.show(this);
		    });
		});
	</script>

</head>

<!-- Page passes the container for the graph to the grogram -->
<body onload="main(document.getElementById('graphContainer'))">

<input type="button" id="show-btn" value="Hello World" /><br /><br />

	<!-- Creates a container for the graph with a grid wallpaper -->
	<div id="hello-win" class="x-hidden">
	    <div class="x-window-header">Hello Dialog</div>
	    <div id="hello-tabs">
	        <!-- Auto create tab 1 -->

			<div id="graphContainer" class="x-tab" title="Hello World 1"
				style="background:url('editors/images/grid.gif');">
			</div>
		</div>
	</div>
</body>
</html>
