package com.example.TestProject.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Role {
    ROLE_USER("USER"),
    ROLE_ADMIN("ADMIN");

    // "USER", "ADMIN"
    private String value;

    // Constructor
    Role(String value) {
        this.value = value;
    }

    // GetValue
    public String getValue() {
        return this.value;
    }
}
