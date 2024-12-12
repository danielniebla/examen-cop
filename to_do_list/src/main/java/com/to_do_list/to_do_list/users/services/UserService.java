package com.to_do_list.to_do_list.users.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.to_do_list.to_do_list.users.models.Users;
import com.to_do_list.to_do_list.users.models.UsersDTO;
import com.to_do_list.to_do_list.users.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository UserRepository;

    public UserService(UserRepository userRepository) {
        this.UserRepository = userRepository;
    }
    // Crear nuevo usuario
    public Users createUser(Users user) {
        // Verificar si el nombre de usuario ya existe
        if (UserRepository.findByName(user.getName()).isPresent()) {
            throw new IllegalArgumentException("Error: El nombre de usuario ya está en uso.");
        }
        return UserRepository.save(user);
    }
    

    // Método para convertir Users a UsersDTO
    public UsersDTO convertToDTO(Users user) {
        UsersDTO dto = new UsersDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        return dto;
    }

    // Método de login
    public Optional<Users> login(String username, String password) {
        Optional<Users> user = UserRepository.findByName(username);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            // Login exitoso
            return user;
        } else {
            // Credenciales incorrectas
            return Optional.empty();
        }
    }
   
}
