package com.example.springboot.lms.payloads;

import com.example.springboot.lms.model.Student;
import com.example.springboot.lms.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class LoginResponseDTO {


    private String token;
    private User user;
    private StudentDto student;
}
