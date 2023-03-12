package com.example.springboot.lms.payloads;

import com.example.springboot.lms.model.Module;

public class QuestionDto {
	private int questionId;
	private String question;
	private String path;
	private String option_A;
	private String option_B;
	private String option_C;
	private String option_D;
	private String correctAns;
	private int weightage;
	private ModuleDto module;
	
	public ModuleDto getModule() {
		return module;
	}
	public void setModule(ModuleDto module) {
		this.module = module;
	}
	public QuestionDto() {
		super();
	}
	public QuestionDto(int questionId, String question, String path, String option_A, String option_B, String option_C,
			String option_D, String correctAns, int weightage) {
		super();
		this.questionId = questionId;
		this.question = question;
		this.path = path;
		this.option_A = option_A;
		this.option_B = option_B;
		this.option_C = option_C;
		this.option_D = option_D;
		this.correctAns = correctAns;
		this.weightage = weightage;
	}
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getOption_A() {
		return option_A;
	}
	public void setOption_A(String option_A) {
		this.option_A = option_A;
	}
	public String getOption_B() {
		return option_B;
	}
	public void setOption_B(String option_B) {
		this.option_B = option_B;
	}
	public String getOption_C() {
		return option_C;
	}
	public void setOption_C(String option_C) {
		this.option_C = option_C;
	}
	public String getOption_D() {
		return option_D;
	}
	public void setOption_D(String option_D) {
		this.option_D = option_D;
	}
	public String getCorrectAns() {
		return correctAns;
	}
	public void setCorrectAns(String correctAns) {
		this.correctAns = correctAns;
	}
	public int getWeightage() {
		return weightage;
	}
	public void setWeightage(int weightage) {
		this.weightage = weightage;
	}

}
