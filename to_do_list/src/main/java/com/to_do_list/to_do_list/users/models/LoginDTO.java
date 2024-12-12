package com.to_do_list.to_do_list.users.models;

public class LoginDTO {
    private String username; // Opcional si decides permitir login por nombre de usuario
    private String password;

    // Getters y Setters


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
