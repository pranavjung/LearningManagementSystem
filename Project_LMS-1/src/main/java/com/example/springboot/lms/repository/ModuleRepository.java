package com.example.springboot.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot.lms.model.Module;

public interface ModuleRepository extends JpaRepository<Module, Integer> {

}
