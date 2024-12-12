package com.to_do_list.to_do_list.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.to_do_list.to_do_list.todo.models.ToDo;
import com.to_do_list.to_do_list.users.models.Users;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    void deleteByUser(Users user);
    List<ToDo> findByUser(Users user);
}
