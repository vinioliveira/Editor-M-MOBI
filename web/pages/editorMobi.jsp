<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>Editor M-MOBI b_1.0.3</title>

    <!-- ** CSS ** -->
    <!-- base library -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/comum/extjs/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/pages/css/CenterLayout.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/pages/css/layout-browser.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/comum/extjs/resources/css/fileuploadfield.css">

    <!-- jQuery library -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/comum/jquery-1.4.2.min.js"></script>
    
    <!-- ExtJS library -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/comum/extjs/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/comum/extjs/ext-all.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/comum/extjs/src/core/FileUploadField.js"></script>
	
    <!-- custom javascript  -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/pages/js/mobi-utils.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/pages/js/mobi-class.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/pages/js/layout-mxGraph.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/pages/js/ext-components.js"></script>

	<!-- mxGraph library -->
	<script type="text/javascript" src="http://mxclient.jgraph.com/demo/mxgraph/src/js/mxclient.php?version=1.1.0.0"></script>
	<!-- script type="text/javascript" src="${pageContext.request.contextPath}/comum/mxgraph/mxClient.js"></script-->
    
    
    
</head>
<body onload="main()">
    <div id="header"><h1>Editor M-MOBI b_1.0.2</h1></div>

    <div id="home" style="display:none;">

        <!-- Start page content -->
        <div id="start-div">
            <div>
            	<div id="graphContainerDiagrama"></div>
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
