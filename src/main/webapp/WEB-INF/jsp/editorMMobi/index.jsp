<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>Editor M-MOBI b_2.0</title>

    <!-- ** CSS ** -->
    <!-- base library -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/stylesheets/main.css" />
    
    <!-- ExtJS library -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/javascript/lib/jQuery/jquery-1.5.2.min.js"></script>
    <!--<script type="text/javascript" src="${pageContext.request.contextPath}/javascript/lib/extjs/adapter/ext/ext-base.js"></script> -->
    <!--<script type="text/javascript" src="${pageContext.request.contextPath}/javascript/lib/extjs/ext-all.js"></script> -->
	<!-- <script type="text/javascript" src="${pageContext.request.contextPath}/javascript/lib/extjs/FileUploadField.js"></script> -->
    <!-- <script type="text/javascript" src="${pageContext.request.contextPath}/javascript/lib/extjs/ext-components.js"></script> -->
    
    
    <!-- Mobi Js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/javascript/mobi/mobi-utils.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/javascript/mobi/mobi-class.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/javascript/initializer-bundler.js"></script>
    
    
</head>


<body>
	<div id="content">
	    <header>
	    	<h1>MOBI-I</h1>
	    	<ul>
	    		<li><a href="#">Home</a></li>
	    		<li><a href="#">Sobre</a></li>
	    		<li><a href="#">Experimente</a></li>
	    	</ul>
	    </header>

    	<div id="main">
    		<div id="top_options">
    			<button class="blue medium">Download OWL</button>
    			<button class="blue medium">Importar OWL</button>
    			<input type="text" />
    			<input type="text" />
    			<button class="blue medium">Salvar MOBI</button>
    			<button class="blue medium">Recuperar MOBI</button>
    		</div>
    		<div id="relation">
    			<div id="graph_relation" class="box"></div>
    			<div id="options" class="box"></div>
    		</div>
    		<div id="graph" class="box" ></div>
    		<div style="clear:both"></div>
    	</div>
    </div>
</body>
</html>
