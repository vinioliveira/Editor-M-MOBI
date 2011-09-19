<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@page contentType="text/html; charset=UTF-8" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="f" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
    <title>Editor M-MOBI b_2.0</title>
    <!-- ** CSS ** -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/stylesheets/main.css" />
        
</head>
<body>
	
	<div id="auth">
		<div class="form">
			<c:if test="${not empty errors }">
				<div class="error">
					<c:forEach var="error" items="${errors}">
			    		${error.message}
					</c:forEach>
				</div>
			</c:if>
			<form action="<c:url value="/auth"/>" method="post" accept-charset="UTF-8">
				<f:message key="user.domain" /> 
				<div class="field">
					<input type="text" name="user.domain">
				</div>
				<f:message key="user.agent" /> (<f:message key="user.name" /> ) 
				<div class="field">
					<input type="text" name="user.name">
				</div>
				<f:message key="user.email" />  
				<div class="field">
					<input type="text" name="user.email">
				</div>
				
				<div id="button">
					<input type="submit" value="Go on" class="button-form"/>
				</div>
			</form>
		</div>
	</div>

</body>
</html>