package com.example.springboot.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot.lms.model.DailyAttendence;

public interface DailyAttendenceRepository extends JpaRepository<DailyAttendence,Integer> 

{

}
