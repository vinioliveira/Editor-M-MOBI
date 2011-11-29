#!/bin/bash

hash mvn 2>&- || {
	 echo >&2 "I require foo but it's not installed.  Aborting."; 
	 exit 1; 
	}

echo "Installing Hamcrest 1.2RC3"
	mvn install:install-file -Dfile=libs/hamcrest-all-1.2.jar  -DgroupId=org.hamcrest -DartifactId=hamcrest-all -Dversion=1.2RC3 -Dpackaging=jar

echo "Installing Kernel-Mobi"
	mvn install:install-file -Dfile=libs/mobi-0.0.6.jar  -DgroupId=edu.org.mobi -DartifactId=Kernel-Mobi -Dversion=0.0.6 -Dpackaging=jar

echo "Installing vraptor3 with modifications"
 	mvn install:install-file -Dfile=libs/vraptor-3.3.2-SNAPSHOT.jar  -DgroupId=br.com.caelum -DartifactId=vraptor -Dversion=3.3.2-SNAPSHOT -Dpackaging=jar


#nova linha