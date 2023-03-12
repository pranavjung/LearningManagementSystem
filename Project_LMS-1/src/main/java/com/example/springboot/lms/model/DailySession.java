package com.example.springboot.lms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import javax.persistence.Table;
@Entity
@Table(name = "Daily_Session")
@Data @NoArgsConstructor @AllArgsConstructor
public class DailySession {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int sessionId;
	private String sessionName;
	private LocalDate date;
	private LocalTime timeStart;
	private LocalTime timeend;
	@ManyToOne
	private Batch batch;
	@ManyToOne
	private User user;
	@OneToMany(mappedBy = "dailySession",cascade = CascadeType.ALL)
	private List<DailyAttendence> dailyAttendenceList= new ArrayList<>();



	
	
}
