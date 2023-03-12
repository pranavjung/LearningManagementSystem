package com.example.springboot.lms.repository;

import com.example.springboot.lms.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
}
