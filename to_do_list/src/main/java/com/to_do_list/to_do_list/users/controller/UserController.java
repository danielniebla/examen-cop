package com.to_do_list.to_do_list.users.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.to_do_list.to_do_list.todo.repository.ToDoRepository;
import com.to_do_list.to_do_list.users.models.LoginDTO;
import com.to_do_list.to_do_list.users.models.Users;
import com.to_do_list.to_do_list.users.models.UsersDTO;
import com.to_do_list.to_do_list.users.repository.UserRepository;
import com.to_do_list.to_do_list.users.services.UserService;

import jakarta.transaction.Transactional;
@CrossOrigin
@RestController
@RequestMapping("/api/todos/users")
public class UserController {

    private final UserRepository UserRepository;
    private final UserService UserService;
    private final ToDoRepository ToDoRepository;

    // Constructor para la inyección de dependencias
    public UserController(UserRepository userRepository, UserService userService, ToDoRepository toDoRepository) {
        this.UserRepository = userRepository;
        this.UserService = userService;
        this.ToDoRepository = toDoRepository;
    }
    // Obtener todos los usuarios
   @GetMapping
   public List<UsersDTO> getAllUsers() {
       return UserRepository.findAll().stream()
                            .map(user -> UserService.convertToDTO(user))
                            .collect(Collectors.toList());
   }
    // Obtener un usuario por ID
    @GetMapping("{id}")
    public ResponseEntity<UsersDTO> getUserById(@PathVariable Long id) {
        Optional<Users> user = UserRepository.findById(id);
         
        // Si el usuario no existe, retornamos un 404
        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        UsersDTO userDTO = UserService.convertToDTO(user.get());
        return ResponseEntity.ok(userDTO);
    }
    @PostMapping("/login")
    public ResponseEntity<UsersDTO> login(@RequestBody LoginDTO loginDTO) {
        Optional<Users> user = UserService.login(loginDTO.getUsername(), loginDTO.getPassword());
    
        if (user.isPresent()) {
            // Convertir el usuario encontrado a un DTO para devolverlo
            UsersDTO userDTO = UserService.convertToDTO(user.get());
            return ResponseEntity.ok(userDTO);  // Devolver el DTO con id y name
        } else {
            return ResponseEntity.badRequest().body(null);  // Si las credenciales son incorrectas, retorna un 400 con null
        }
    }
    
    // Crear nuevo usuario
    @PostMapping  
    public ResponseEntity<UsersDTO> createUser(@RequestBody Users user) {
        try {
            // Crear usuario
            Users createdUser = UserService.createUser(user);

            // Convertir el nuevo usuario a un DTO
            UsersDTO userDTO = UserService.convertToDTO(createdUser);

            // Retornar el DTO con id y name
            return ResponseEntity.ok(userDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);  // Si hay error, retornamos un 400 con null
        }
    }
    // Eliminar un usuario y sus TODOs relacionados
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, @RequestParam String password) {
        Optional<Users> optionalUser = UserRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // Obtener el valor de Users del Optional
        Users user = optionalUser.get();

        // Validar la contraseña (esto asume que la contraseña está cifrada)
        if (!password.equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Primero elimina los TODOs relacionados al usuario
        ToDoRepository.deleteByUser(user);

        // Luego elimina al usuario
        UserRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }



}
