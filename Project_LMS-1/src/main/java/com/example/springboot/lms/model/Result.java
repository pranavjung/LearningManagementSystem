package com.example.springboot.lms.model;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity

@Table(name = "Results")
public class Result {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int resultId;

	private int obtainedMarks;

	@ManyToOne(cascade = CascadeType.ALL)
	private Student student;
	
	@ManyToOne(cascade = CascadeType.ALL)

	private Test test;
	public Result() {
		super();
		
	}
	
	public Result(int resultId, int obtainedMarks, Student student, Test test) {
		super();
		this.resultId = resultId;
		this.obtainedMarks = obtainedMarks;
		this.student = student;
		this.test = test;
	}

	
	

	public int getResultId() {
		return resultId;
	}

	public void setResultId(int resultId) {
		this.resultId = resultId;
	}

	public int getObtainedMarks() {
		return obtainedMarks;
	}

	public void setObtainedMarks(int obtainedMarks) {
		this.obtainedMarks = obtainedMarks;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Test getTest() {
		return test;
	}

	public void setTest(Test test) {
		this.test = test;
	}
	
}
