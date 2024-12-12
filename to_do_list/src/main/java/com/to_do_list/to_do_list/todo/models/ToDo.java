package com.to_do_list.to_do_list.todo.models;
import com.to_do_list.to_do_list.users.models.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)// Genera el id
    private Long id;
    private String title;
    private String description;
    private Boolean completed;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;
    //constructor vacio para jpa
    public ToDo() {

    }

    public ToDo(String title,String description, Boolean completed, Users user) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.user = user; // Relación con User
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return user != null ? user.getId() : null;
    }
    public void setUser(Users user) {
        this.user = user;
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
