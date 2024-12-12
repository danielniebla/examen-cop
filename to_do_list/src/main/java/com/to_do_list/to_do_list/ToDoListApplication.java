package com.to_do_list.to_do_list;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ToDoListApplication {

	public static void main(String[] args) {
		// Cargar el archivo .env
        Dotenv dotenv = Dotenv.load();

        // Establecer las variables de entorno para que Spring Boot pueda usarlas
        System.setProperty("POSTGRES_DB", dotenv.get("POSTGRES_DB"));
        System.setProperty("POSTGRES_USER", dotenv.get("POSTGRES_USER"));
        System.setProperty("POSTGRES_PASSWORD", dotenv.get("POSTGRES_PASSWORD"));
		SpringApplication.run(ToDoListApplication.class, args);
	}

}
