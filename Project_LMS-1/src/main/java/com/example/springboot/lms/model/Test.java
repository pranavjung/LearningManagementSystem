package com.example.springboot.lms.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity

@Table(name = "Tests")
public class Test {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int testId;
	private String testName;
	private int totalMarks;	
	
	
	
	@ManyToOne
	private Module module;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonBackReference
	private List<Question> questionList = new ArrayList<>();
	
	@OneToMany(mappedBy = "test" , cascade = CascadeType.ALL)
	@JsonBackReference
	private List<Result> resultList = new ArrayList<>();

	public Test() {
		super();
		
	}

	 
	public Test(int testId, String testName, int totalMarks, Module module, List<Question> questionList,
			List<Result> resultList) {
		super();
		this.testId = testId;
		this.testName = testName;
		this.totalMarks = totalMarks;
		this.module = module;
		this.questionList = questionList;
		this.resultList = resultList;
	}

	
	

	public int getTestId() {
		return testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public int getTotalMarks() {
		return totalMarks;
	}

	public void setTotalMarks(int totalMarks) {
		this.totalMarks = totalMarks;
	}

	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	public List<Question> getQuestionList() {
		return questionList;
	}

	public void setQuestionList(List<Question> questionList) {
		this.questionList = questionList;
	}

	public List<Result> getResultList() {
		return resultList;
	}

	public void setResultList(List<Result> resultList) {
		this.resultList = resultList;
	}
	
	
}
