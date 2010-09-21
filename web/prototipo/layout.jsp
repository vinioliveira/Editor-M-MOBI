<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Editor M-MOBI</title>

    <!-- ** CSS ** -->
    <!-- base library -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/comum/extjs/resources/css/ext-all.css" />
    <!-- overrides to base library -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/prototipo/js/CenterLayout.css" />
    <!-- page specific -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/prototipo/js/layout-browser.css">


    <!-- ** Javascript ** -->

    <!-- ExtJS library: base/adapter -->

    <script type="text/javascript" src="${pageContext.request.contextPath}/comum/ext/ext-base.js"></script>

    <!-- ExtJS library: all widgets -->

    <script type="text/javascript" src="${pageContext.request.contextPath}/comum/ext/ext-all.js"></script>

    <!-- overrides to base library -->

    <!-- extensions -->
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/prototipo/js/CenterLayout.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/prototipo/js/RowLayout.js"></script>

    <!-- page specific -->

    <script type="text/javascript" src="${pageContext.request.contextPath}/prototipo/js/basic.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/prototipo/js/layout-browser.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/comum/js/mxClient.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/comum/js/prototype.js"></script>
    
</head>
<body onload="main()">
    <div id="header"><h1>Editor M-MOBI</h1></div>

    <div style="display:none;">

        <!-- Start page content -->
        <div id="start-div">
            <div>
            	<div id="graphContainerDiagrama">
            	</div>
            </div>
        </div>
        
        <div id="relaco-div">
        	<div>
            	<div id="graphContainer"></div>
            </div>
            <div>
            	<div id="relacoes-div"></div>
            </div>
            <div>
            	<div id="classes"></div>
            </div>
        </div>
		
     </div>
</body>
</html>
