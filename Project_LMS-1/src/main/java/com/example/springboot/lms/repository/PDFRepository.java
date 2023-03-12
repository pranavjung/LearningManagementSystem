package com.example.springboot.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot.lms.model.PDF;

public interface PDFRepository extends JpaRepository<PDF, Integer> {

}
