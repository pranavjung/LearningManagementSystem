package com.example.springboot.lms.payloads;

import javax.persistence.ManyToOne;

import com.example.springboot.lms.model.DailySession;
import com.example.springboot.lms.model.Student;

public class DailyAttendenceDto {
	private int attendenceId;
	
	private DailySessionDto dailySession;
	
	
	private StudentDto student;


	public DailySessionDto getDailySession() {
		return dailySession;
	}

	public void setDailySession(DailySessionDto dailySession) {
		this.dailySession = dailySession;
	}

	public StudentDto getStudent() {
		return student;
	}

	public void setStudent(StudentDto student) {
		this.student = student;
	}

	public DailyAttendenceDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DailyAttendenceDto(int attendenceId) {
		super();
		this.attendenceId = attendenceId;
	}

	public int getAttendenceId() {
		return attendenceId;
	}

	public void setAttendenceId(int attendenceId) {
		this.attendenceId = attendenceId;
	}
	
	
}
