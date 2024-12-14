# examen-cop
 examen de ingreso a la vacante de desarrollo coppel;

anotaciones:
debe tener instalado maven, npm y docker
Backend - to_do_list
frontend - to_do_application
en la carpeta del backend va el .env
y en el frontend va .env.local

para correr el proyecto primeramente le debo proporcionar los archivos .env para el backend (hay un .env example para las variables).

una vez que los archivos estan bien configurados correra el docker daemon (en mi caso abro docker desktop), ingrsamos a la carpeta del backend "cd to_do_list"

para despues crear el contenedor de la base de datos "docker-compose up -d"

e instalamos las dependencias "mvn install -DskipTests=true"

posterior a eso corremos el proyecto "mvn install -DskipTests=true"

despues de terminar con el backend pasaremos al frontend, aqui solo necesitamos el .env que le proporcionare por correo.

y una vez configurado el .env abriremos otra terminal y entraremos a la carpeta del frontend "cd to_do_application"

una vez dentro instalamos dependencias "npm install"

y corremos el proyecto "npm run dev" 
