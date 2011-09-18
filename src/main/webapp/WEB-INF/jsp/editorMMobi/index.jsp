<%@page contentType="text/html; charset=UTF-8" %>  

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
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/raphael-min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/rassoci.js"></script>

	<!-- Mobi Js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/mobi.js"></script>
  
	
	<!-- TEMPLATES -->
	
	<script type="text/x-jquery-tmpl" id="instance-template">
		<span class="instance" >${'${'}uri}</span>
	</script>
    
	<script type="text/x-jquery-tmpl" id="class-template">
		<input class="class left" type="text" value='${'${'}uri}'></input>
	</script>
	
    <script type="text/x-jquery-tmpl" id="relation-template">
		<div id="map-relation" class="box">
			<div class="header"> 
				<img src="/images/transfer.png">
				Relation : <i>${'${'} uri }</i>
				<div class="action">
					<a class="add relation" href="#">	
						relation
						<img src="/images/plus.png">
					</a>
				</div>
			</div>
			<div class="instancesA"></div>
			<div class="instancesB"></div>
		</div>
		<div id="options">
			<div class="actions">
				<a class="add left" href="#">
					<img src="/images/plus.png">
					class A
				</a> 
				<a class="add right" href="#">
					class B
					<img src="/images/plus.png">
				</a>
			</div>
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
	<div class="content">
	    <div class="top">
	    	<h1>MOBI-I</h1>
			<div id="user-info" class="left">
				<div class="user">
					<b>agent </b>: <i>${ user.name }</i>
				</div>
				<div class="email">
					<b>email </b> : <i> ${ user.email }</i>
				</div>
				<div class="domain">
					<b>domain</b> : <i> ${ user.domain }</i>
				</div>
			</div>
			<div id="menu" class="right">
				<ul>
					<li class="refrash">
						<span></span>
						<a href="#">refrash</a>
					</li>
					<li class="download">
						<span></span>
						<a href="#">download</a>
					</li>
					<li class="check">
						<span></span>
						<a href="#">check</a>
					</li>
					<li class="about">
						<span></span>
						<a href="#">about</a>
					</li>
				</ul>
			</div>
	    </div>
    	<div class="main">
    		<div id="relation"></div>
    		<div id="graph"  >
    			<div class="header">
					<img src="/images/graph.png">
    				Info Graph
    			</div>
    		</div>
    		<div style="clear:both"></div>
    	</div>
    </div>
</body>
</html>
