package com.to_do_list.to_do_list.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)// Genera el id
    private Long id;
    private String title;
    private String description;
    private Boolean completed;

    //constructor vacio para jpa
    public ToDo() {

    }

    public ToDo(String title,String description, Boolean completed) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

}
