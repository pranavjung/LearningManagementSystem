package com.example.springboot.lms.payloads;

import com.example.springboot.lms.model.Batch;
import com.example.springboot.lms.model.User;

public class StudentDto {
	private int  studentId;
	private long ccat_Roll_no;
	private long studentPRN;
	private UserDto user;
	private BatchDto batch;
	public BatchDto getBatch() {
		return batch;
	}
	public void setBatch(BatchDto batch) {
		this.batch = batch;
	}
	public UserDto getUser() {
		return user;
	}
	public void setUser(UserDto user) {
		this.user = user;
	}
	public int getStudentId() {
		return studentId;
	}
	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}
	public long getCcat_Roll_no() {
		return ccat_Roll_no;
	}
	public void setCcat_Roll_no(long ccat_Roll_no) {
		this.ccat_Roll_no = ccat_Roll_no;
	}
	public long getStudentPRN() {
		return studentPRN;
	}
	public void setStudentPRN(long studentPRN) {
		this.studentPRN = studentPRN;
	}
	
	public StudentDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public StudentDto(int studentId, long ccat_Roll_no, long studentPRN) {
		super();
		this.studentId = studentId;
		this.ccat_Roll_no = ccat_Roll_no;
		this.studentPRN = studentPRN;
	}

}
