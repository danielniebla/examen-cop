package com.to_do_list.to_do_list.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.to_do_list.to_do_list.model.ToDo;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {

}
