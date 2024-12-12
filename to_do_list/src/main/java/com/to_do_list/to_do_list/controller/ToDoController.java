package com.to_do_list.to_do_list.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.to_do_list.to_do_list.model.ToDo;
import com.to_do_list.to_do_list.repository.ToDoRepository;

@RestController
@RequestMapping("/api/todos")
public class ToDoController {

    @Autowired
    private ToDoRepository toDoRepository;

    // Obtener todas las tareas
    @GetMapping
    public List<ToDo> getAllTodos() {
        return toDoRepository.findAll();
    }

    // Crear una nueva tarea
    @PostMapping
    public ToDo createTodo(@RequestBody ToDo todo) {
        return toDoRepository.save(todo);
    }

    // Obtener una tarea por ID
    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getTodoById(@PathVariable Long id) {
        Optional<ToDo> todo = toDoRepository.findById(id);
        return todo.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar una tarea
    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateTodo(@PathVariable Long id, @RequestBody ToDo updatedTodo) {
        Optional<ToDo> todoData = toDoRepository.findById(id);

        if (todoData.isPresent()) {
            ToDo existingTodo = todoData.get();
            existingTodo.setTitle(updatedTodo.getTitle());
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
