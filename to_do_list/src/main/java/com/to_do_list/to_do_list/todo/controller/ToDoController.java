package com.to_do_list.to_do_list.todo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.to_do_list.to_do_list.todo.models.ToDo;
import com.to_do_list.to_do_list.todo.models.ToDoDTO;
import com.to_do_list.to_do_list.todo.repository.ToDoRepository;
import com.to_do_list.to_do_list.users.models.Users;
import com.to_do_list.to_do_list.users.repository.UserRepository;

@RestController
@RequestMapping("/api/todos")
public class ToDoController {
    
    private final ToDoRepository toDoRepository;
    private final UserRepository userRepository;

    // Constructor para la inyección de dependencias
    public ToDoController(ToDoRepository toDoRepository, UserRepository userRepository) {
        this.toDoRepository = toDoRepository;
        this.userRepository = userRepository;
    }

    // Obtener todas las tareas
    @GetMapping
    public List<ToDo> getAllTodos() {
        return toDoRepository.findAll();
    }

    // Crear una nueva tarea
    @PostMapping
    public ToDo createTodo(@RequestBody ToDoDTO todoRequest) {
        // Buscar al usuario por su ID
        Optional<Users> user = userRepository.findById(todoRequest.getUserId());

        if (!user.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }

        // Crear un objeto ToDo y asignar el usuario
        ToDo todo = new ToDo(
            todoRequest.getTitle(),
            todoRequest.getDescription(),
            todoRequest.getCompleted(),
            user.get() // Asignar el usuario encontrado
        );

        // Guardar el nuevo ToDo
        return toDoRepository.save(todo);
    }

    // Obtener una tarea por ID
    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getTodoById(@PathVariable Long id) {
        Optional<ToDo> todo = toDoRepository.findById(id);
        return todo.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
    //obtener las tareas de un usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ToDo>> getTodosByUserId(@PathVariable Long userId) {
        Optional<Users> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // Obtener el valor de Users del Optional
        Users user = optionalUser.get();
        List<ToDo> todos = toDoRepository.findByUser(user);
        
        if (todos.isEmpty()) {
            return ResponseEntity.notFound().build();  // Devuelve 404 si no hay tareas
        }
        
        return ResponseEntity.ok(todos);  // Devuelve las tareas del usuario
    }

    // Actualizar una tarea
    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateTodo(@PathVariable Long id, @RequestBody ToDo updatedTodo) {
        Optional<ToDo> todoData = toDoRepository.findById(id);

        if (todoData.isPresent()) {
            ToDo existingTodo = todoData.get();
            existingTodo.setTitle(updatedTodo.getTitle());
            existingTodo.setDescription(updatedTodo.getDescription());
            existingTodo.setCompleted(updatedTodo.getCompleted());
            return ResponseEntity.ok(toDoRepository.save(existingTodo));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una tarea
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        if (toDoRepository.existsById(id)) {
            toDoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
