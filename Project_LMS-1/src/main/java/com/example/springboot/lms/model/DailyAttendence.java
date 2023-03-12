package com.example.springboot.lms.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name = "Daily_Attendence")
public class DailyAttendence {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int attendenceId;
	
	@ManyToOne
	private DailySession dailySession;
	
	@ManyToOne
	private Student student;

	public DailyAttendence() {
		super();
		
	}

	public DailyAttendence(int attendenceId, DailySession dailySession, Student student) {
		super();
		this.attendenceId = attendenceId;
		this.dailySession = dailySession;
		this.student = student;
	}

	public int getAttendenceId() {
		return attendenceId;
	}

	public void setAttendenceId(int attendenceId) {
		this.attendenceId = attendenceId;
	}

	public DailySession getDailySession() {
		return dailySession;
	}

	public void setDailySession(DailySession dailySession) {
		this.dailySession = dailySession;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}
	
	
}
