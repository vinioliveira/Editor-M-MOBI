<!--
  $Id: orgchart.html,v 1.54 2010-01-04 11:18:26 gaudenz Exp $
  Copyright (c) 2006-2010, JGraph Ltd

  Orgchart example for mxGraph. This example demonstrates using
  automatic layouts, fit to page zoom and poster print (across
  multiple pages).
-->
<html>
<head>
	<title>Orgchart example for mxGraph</title>

	<!-- Sets the basepath for the library if not in same directory -->
	<script type="text/javascript">
		mxBasePath = '../comum/mxgraph';
	</script>

	<!-- Loads and initiaizes the library -->
	<script type="text/javascript" src="../comum/js/mxClient.js"></script>

	<!-- Example code -->
	<script type="text/javascript">
		// Program starts here. Creates a sample graph in the
		// DOM node with the specified ID. This function is invoked
		// from the onLoad event handler of the document (see below).
		function main()
		{
			// Checks if browser is supported
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is
				// not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				// Workaround for Internet Explorer ignoring certain styles
				var container = document.createElement('div');
				container.style.position = 'absolute';
				container.style.overflow = 'hidden';
				container.style.left = '0px';
				container.style.top = '0px';
				container.style.right = '0px';
				container.style.bottom = '0px';

				if (mxClient.IS_IE)
				{
					new mxDivResizer(container);
				}

				document.body.appendChild(container);

				// Creates the graph inside the given container
				var graph = new mxGraph(container);

				// Set some stylesheet options for the visual appearance
				var style = graph.getStylesheet().getDefaultVertexStyle();
				style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
				style[mxConstants.STYLE_ROUNDED] = true;
				style[mxConstants.STYLE_SHADOW] = true;
				style[mxConstants.STYLE_SPACING] = 8;

				style = graph.getStylesheet().getDefaultEdgeStyle();
				style[mxConstants.STYLE_ROUNDED] = true;
				style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;

				// Enables automatic sizing for vertices after editing and
				// panning by using the left mouse button.
				graph.setCellsMovable(false);
				graph.setAutoSizeCells(true);
				graph.setPanning(true);
				graph.panningHandler.useLeftButtonForPanning = true;

				// Displays a popupmenu when the user clicks
				// on a cell (using the left mouse button) but
				// do not select the cell when the popup menu
				// is displayed
				graph.panningHandler.useLeftButtonForPopup = true;
				graph.panningHandler.selectOnPopup = false;

				// Stops editing on enter or escape keypress
				var keyHandler = new mxKeyHandler(graph);

				// Changes the default style for edges and vertices "in-place"
				var style = graph.getStylesheet().getDefaultEdgeStyle();
				style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;

				var style = graph.getStylesheet().getDefaultVertexStyle();
				style[mxConstants.STYLE_SPACING] = 8;

				// Enables automatic layout on the graph and installs
				// a tree layout for all groups who's children are
				// being changed, added or removed.
				var layout = new mxCompactTreeLayout(graph, false);
				layout.useBoundingBox = false;
				layout.levelDistance = 30;
				layout.nodeDistance = 10;

				// Allows the layout to move cells even though cells
				// aren't movable in the graph
				layout.isVertexMovable = function(cell)
				{
					return true;
				};

				var layoutMgr = new mxLayoutManager(graph);

				layoutMgr.getLayout = function(cell)
				{
					if (cell.getChildCount() > 0)
					{
						return layout;
					}
				};

				// Installs a popupmenu handler using local function (see below).
				graph.panningHandler.factoryMethod = function(menu, cell, evt)
				{
					return createPopupMenu(graph, menu, cell, evt);
				};

				// Gets the default parent for inserting new cells. This
				// is normally the first child of the root (ie. layer 0).
				var parent = graph.getDefaultParent();

				// Adds the root vertex of the tree
				graph.getModel().beginUpdate();
				try
				{
					var w = graph.container.offsetWidth;
					graph.insertVertex(parent, 'treeRoot',
						'Click here!', w/2 - 30, 20, 60, 40);
				}
				finally
				{
					// Updates the display
					graph.getModel().endUpdate();
				}
			}
		};

		// Function to create the entries in the popupmenu
		function createPopupMenu(graph, menu, cell, evt)
		{
			var model = graph.getModel();

			if (cell != null)
			{
				if (model.isVertex(cell))
				{
					menu.addItem('Add child', '../comum/mxgraph/images/check.png', function()
					{
						var parent = graph.getDefaultParent();

						model.beginUpdate();
						try
						{
							var vertex = graph.insertVertex(parent, null, 'New Vertex');
							var geometry = model.getGeometry(vertex);

							// Updates the geometry of the vertex with the
							// preferred size computed in the graph
							var size = graph.getPreferredSizeForCell(vertex);
							geometry.width = size.width;
							geometry.height = size.height;

							// Adds the edge between the existing cell
							// and the new vertex and executes the
							// automatic layout on the parent
							var edge = graph.insertEdge(parent, null, '', cell, vertex);

							// Configures the edge label "in-place" to reside
							// at the end of the edge (x = 1) and with an offset
							// of 20 pixels in negative, vertical direction.
							edge.geometry.x = 1;
							edge.geometry.y = 0;
							edge.geometry.offset = new mxPoint(0, -20);
						}
						finally
						{
							model.endUpdate();
						}
					});
				}

				menu.addItem('Edit label', '../comum/mxgraph/images/text.gif', function()
				{
					graph.startEditingAtCell(cell);
				});

				if (cell.id != 'treeRoot' &&
					model.isVertex(cell))
				{
					menu.addItem('Delete', '../comum/mxgraph/images/delete.gif', function()
					{
						deleteSubtree(graph, cell);
					});
				}

				menu.addSeparator();
			}

			menu.addItem('Fit', '../comum/mxgraph/images/zoom.gif', function()
			{
				graph.fit();
			});

			menu.addItem('Actual', '../comum/mxgraph/images/zoomactual.gif', function()
			{
				graph.zoomActual();
			});

			menu.addSeparator();

			menu.addItem('Print', '../comum/mxgraph/images/print.gif', function()
			{
				var preview = new mxPrintPreview(graph, 1);
				preview.open();
			});

			menu.addItem('Poster Print', '../comum/mxgraph/images/print.gif', function()
			{
				var pageCount = mxUtils.prompt('Enter maximum page count', '1');

				if (pageCount != null)
				{
					var scale = mxUtils.getScaleForPageCount(pageCount, graph);
					var preview = new mxPrintPreview(graph, scale);
					preview.open();
				}
			});

			menu.addSeparator();

			menu.addItem('Close', null, function()
			{
				// nop
			});
		};

function deleteSubtree(graph, cell)
{
	// Gets the subtree from cell downwards
	var cells = [];
	graph.traverse(cell, true, function(vertex)
	{
		cells.push(vertex);
		
		return true;
	});

	graph.removeCells(cells);
};
	</script>
</head>

<!-- Calls the main function after the page has loaded. Container is dynamically created. -->
<body onload="main();">
</body>
</html>
