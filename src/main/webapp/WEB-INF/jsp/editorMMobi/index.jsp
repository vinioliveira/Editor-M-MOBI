<%@page contentType="text/html; charset=UTF-8" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="f" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>MOBI 2.0.beta</title>

    <!-- ** CSS ** -->
    <!-- base library -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/stylesheets/main.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/stylesheets/jquery-ui-1.8.16.custom.css" />
    
</head>


<body>
	<div class="content">
	    <div class="top">
	    	<h1>MOBI-I</h1>
			<div id="user-info" class="left">
				<div class="user">
					<b><f:message key="user.agent" /></b>: <i>${ user.name }</i>
				</div>
				<div class="email">
					<b><f:message key="user.email" /></b> : <i> ${ user.email }</i>
				</div>
				<div class="domain">
					<b><f:message key="user.domain" /></b> : <i> ${ user.domain }</i>
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
	<div id="dialog"></div>
	
	
    <!-- Vendor Js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/modernizr-1.6.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/underscore.js"></script> 
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/backbone.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/jquery.tmpl.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/raphael-min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/vendor/rassoci.js"></script>

	<!-- Mobi Js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/mobi-templates.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/mobi.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/class-bundler.js"></script>

   	<script type="text/javascript">
    	$(function(){
			window.relation.fetchPrepare();
        });
    </script>

</body>
</html>
