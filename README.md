# examen-cop
 examen de ingreso a la vacante de desarrollo coppel;

anotaciones:
debe tener instalado maven, npm y docker
Backend - to_do_list
frontend - to_do_application
en la carpeta del backend debe estar el archivo .env y el docker-compose.yml
y en el frontend debe estar el archivo .env.local


1. abrir una terminal

2. entrar a la carpeta del backend con el comando:  cd to_do_list

3. correr docker daemon (en mi caso abrir docker desktop)

4. para crear el contenedor de la base de datos, ejecutamos el archivo docker-compose con el comando: docker-compose up -d

5. en la consola instalar las dependencias de maven con el comando: mvn install -DskipTests=true

6. continuamos en la consola y dejaremos corriendo el proyecto con el siguiente comando: mvn spring-boot:run

7. abrimos una segunda consola sin detener la anterior e ingresamos a la ruta del proyecto frontend la cual es la siguiente: cd to_do_application

8. instalamos las dependencias del proyecto react con el comando: npm install

9. por ultimo corremos el proyecto con el comando:  npm run dev