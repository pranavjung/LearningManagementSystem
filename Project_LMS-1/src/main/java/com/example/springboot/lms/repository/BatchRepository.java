package com.example.springboot.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot.lms.model.Batch;

public interface BatchRepository extends JpaRepository<Batch, Integer> {

}
