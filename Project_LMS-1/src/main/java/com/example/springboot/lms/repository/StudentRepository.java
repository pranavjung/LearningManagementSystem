package com.example.springboot.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot.lms.model.Student;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Integer>{
    Optional<Student> findByUser_UserId(int userId);

	//Object findAllById(Integer studentId);

}
