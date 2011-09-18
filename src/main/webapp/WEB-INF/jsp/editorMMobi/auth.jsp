<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@page contentType="text/html; charset=UTF-8" %>  

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
			<form action="<c:url value="/auth"/>" method="post" accept-charset="UTF-8">
				Domain 
				<div class="field">
					<input type="text" name="user.domain">
				</div>
				Name  
				<div class="field">
					<input type="text" name="user.name">
				</div>
				Email  
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