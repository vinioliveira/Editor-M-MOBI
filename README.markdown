pt-Br

Configurando o Projeto com o eclipse
===

Esse tutorial segue em 3 principais passos, podendo se estender por mais alguns conforme a plataforma que está sendo usada.



1º Passo 
---------------------------

Clone o projeto 

  git clone https://github.com/vinioliveira/EditorM-MOBI.git

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
ambiente. Afim de fazer ele funcionar corretamente com o plugin e2Maven 
do eclipse rode esse comando 
  
  mvn eclipse:eclipse -Dwptversion=2

Em seguida configure seu settings.xml do maven para fazer o download também do 
repositório do jboss caso ainda não esteja configurado. Adicionando esses profiles
ao seu settings.xml dentro da tag <profiles></profiles>
<xml>
  <profile>
    <id>jboss-public-repository</id>	
    <repositories>
      <repository>
	      <id>jboss-public-repository-group</id>
	      <name>JBoss Public Repository Group</name>
	      <url>http://repository.jboss.org/nexus/content/groups/public/</url>
	      <layout>default</layout>
	      <releases>
		      <enabled>true</enabled>
		      <updatePolicy>never</updatePolicy>
	      </releases>
	      <snapshots>
		      <enabled>true</enabled>
		      <updatePolicy>never</updatePolicy>
	      </snapshots>
      </repository>
    </repositories>

    <pluginRepositories>
      <pluginRepository>
	      <id>jboss-public-repository-group</id>
	      <name>JBoss Public Repository Group</name>
	      <url>http://repository.jboss.org/nexus/content/groups/public/</url>
	      <releases>
		      <enabled>true</enabled>
	      </releases>
	      <snapshots>
		      <enabled>true</enabled>
	      </snapshots>
      </pluginRepository>
    </pluginRepositories>
  </profile>

  <profile>
    <id>jboss-repository</id>	
    <repositories>
      <repository>
	      <id>JBoss</id>
	      <name>JBoss Repository</name>
	      <url>http://repository.jboss.org/maven2/</url>
	      <layout>default</layout>
	      <releases>
		      <enabled>true</enabled>
		      <updatePolicy>never</updatePolicy>
	      </releases>
	      <snapshots>
		      <enabled>true</enabled>
		      <updatePolicy>never</updatePolicy>
	      </snapshots>
      </repository>
    </repositories>

    <pluginRepositories>
      <pluginRepository>
	      <id>JBoss</id>
	      <name>JBoss Repository</name>
	      <url>http://repository.jboss.org/maven2/</url>
	      <releases>
		      <enabled>true</enabled>
	      </releases>
	      <snapshots>
		      <enabled>true</enabled>
	      </snapshots>
      </pluginRepository>
    </pluginRepositories>
  </profile>
</xml>

Configurando esse arquivo no seu settings.xml isso permite baixar todas as libs necessária. 



3º Passo 
---------------------------

Por fim dentro da pasta .settings dentro do projeto abra o arquivo org.eclipse.wst.common.component e modifique a seguinte linha : 
<xml>
  <wb-resource deploy-path="/" source-path="/web"/>
</xml>
Para 
<xml>
  <wb-resource deploy-path="/" source-path="src/main/webapp"/>
</xml>
Depois disso configure seu ClassPath para o JDK 1.6 no compile também. Talvez seja necessário modicar no facets de 1.5 para 1.6 também 
Pronto o projeto deve rodar perfeitamente em http://localhost:8080/EditorM-MOBI/home
