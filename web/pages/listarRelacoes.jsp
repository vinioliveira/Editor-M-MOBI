<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<c:forEach var="relacao" items="${listaNomeRelacoes}">
  
  <div onclick="carregarRelacao('${relacao.classeA}','${relacao.classeB}','${relacao.tipoRelacao}');">	
	<a style="cursor:pointer;">${relacao.nomeRelacao}</a>
  </div>

</c:forEach>