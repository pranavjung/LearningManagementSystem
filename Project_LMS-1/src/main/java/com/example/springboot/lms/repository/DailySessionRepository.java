package com.example.springboot.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot.lms.model.DailySession;

public interface DailySessionRepository extends JpaRepository<DailySession, Integer>{

}
