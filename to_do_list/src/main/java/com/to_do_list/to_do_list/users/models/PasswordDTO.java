package com.to_do_list.to_do_list.users.models;

public class PasswordDTO {
    private Long Id;
    private String Newpassword;
    private String Oldpassword;

    // Getters y Setters
    
    public Long getId() {
        return Id;
    }
    
    public String getNewpassword() {
        return Newpassword;
    }
    
    public String getOldpassword() {
        return Oldpassword;
    }
    
    public void setNewpassword(String newpassword) {
        Newpassword = newpassword;
    }
    
    public void setOldpassword(String oldpassword) {
        Oldpassword = oldpassword;
    }
}
