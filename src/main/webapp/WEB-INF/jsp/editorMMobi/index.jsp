<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>Editor M-MOBI b_2.0</title>

    <!-- ** CSS ** -->
    <!-- base library -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/stylesheets/main.css" />
        
    
    <!-- Vendor Js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/modernizr-1.6.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/jquery-1.5.2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/underscore.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/backbone.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/jquery.tmpl.js"></script>

	<!-- Mobi Js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/mobi.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/lib/rassoci/rassoci.js"></script>
	    
	<script type="text/x-jquery-tmpl" id="instance-template">
		<span class="instance" >${'${'}uri}</span>
	</script>
    
	<script type="text/x-jquery-tmpl" id="class-template">
		<input class="class" type="text" value='${'${'}uri}'></input>
	</script>
	
    <script type="text/x-jquery-tmpl" id="relation-template">
		<div id="map-relation" class="box">
			<span> Relations : ${'${'} uri }</span>
			<div class="instancesA"></div>
			<div class="instancesB"></div>
		</div>
		<div id="options" class="box">
			<div class="classA"></div>
			<div class="classB"></div>
		</div>
    </script>
    
    <script type="text/javascript">
    	$(function(){
			window.relation.fetchPrepare();
        });
    </script>
    
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
    			<a href="/#blank"><button class="blue medium">Download OWL</button></a>
    			<button class="blue medium">Importar OWL</button>
    			<input type="text" />
    			<input type="text" />
    			<button class="blue medium">Salvar MOBI</button>
    			<button class="blue medium">Recuperar MOBI</button>
    		</div>
    		<div id="relation"></div>
    		<div id="graph" class="box" ></div>
    		<div style="clear:both"></div>
    	</div>
    </div>
</body>
</html>
