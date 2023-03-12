package com.example.springboot.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot.lms.model.Test;

public interface TestRepository extends JpaRepository<Test, Integer> {

}
