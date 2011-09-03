Configurando o Projeto com o eclipse
===


1º Passo 
---------------------------

  Clone o projeto 

    git clone https://github.com/vinioliveira/Editor-M-MOBI.git

  Depois faça um fetch para obter as branchs e consequentemente a branch 
desenvolvimento que é esta, onde está a versão mais nova do EditorM-MOBI

    git fetch origin 

  Em seguida crie uma nova branch e faça o checkout da mesma para torna-la 
sua branch de trabalho 
  
    git checkout -b desenvolvimento origin/desenvolvimento 

  Nesse momento você tem o projeto baixado na branch correta. 


2º Passo
---------------------------

  Essa parte assumo que você já tem o maven configurado e instalado no seu 
ambiente. Algumas libs utilizadas no projeto não se encotnram em repositório oficial algum 
por isso criei um shell script que instala essas libs no seu repositorie afim de facilitar caso 
deseje instalar manualmente você mesmo as libs se encontram na pasta lib : 
	
	cd Editor-M-Mobi/
	sh ./install_dependencies.sh

  Após executar o comando as libs deveram estar disponível em seu repositório local se algum error ocorrer
durante a execução desse passo reveja seu settings.xml e veja se está tudo correto e se está adicionado o 
repositório official do jboss o qual é necessário para o download de alguns dos pacotes deste projeto. 
Caso deseje utilize o settings.xml desse [link](https://gist.github.com/1161383) que já possui o repositório configurado.
  Afim de fazer ele funcionar corretamente com o plugin e2Maven do eclipse rode esse comando 
  
    mvn eclipse:eclipse -Dwtpversion=2

O passo anterior irá adicionar todas as libs existentes no pom.xml ao file 'org.eclipse.wst.common.component' 
o que torna necessário toda vez que for adicionado um novo jar no pom.xml rodar o comando acima novamente
para não ter essa necessidade pode ser adicionado a linha a seguir no lugar das inumeras linahs de jar
especificadas uma a uma no 'org.eclipse.wst.common.component' 

    <dependent-module deploy-path="/WEB-INF/lib" handle="module:/classpath/con/org.maven.ide.eclipse.MAVEN2_CLASSPATH_CONTAINER">
       <dependency-type>consumes</dependency-type>
    </dependent-module>

3º Passo 
---------------------------

  Por fim dentro da pasta .settings dentro do projeto abra o arquivo 

    org.eclipse.wst.common.component 

e modifique a seguinte linha : 

    <wb-resource deploy-path="/" source-path="/web"/>

Para 

    <wb-resource deploy-path="/" source-path="src/main/webapp"/>

Depois disso configure seu ClassPath para o JDK 1.6 no compile também. Talvez seja necessário modificar no facets de 1.5 para 1.6 também 
Pronto o projeto deve rodar perfeitamente em http://localhost:8080/EditorM-MOBI/home
