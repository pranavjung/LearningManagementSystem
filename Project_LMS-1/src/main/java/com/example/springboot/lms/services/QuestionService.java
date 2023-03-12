package com.example.springboot.lms.services;

import java.util.List;

import com.example.springboot.lms.model.Question;
import com.example.springboot.lms.payloads.CreateQueDTO;
import com.example.springboot.lms.payloads.QuestionDto;

public interface QuestionService {
	QuestionDto saveQuestion(CreateQueDTO questionDto);
	List<QuestionDto> getAllQuestions();
	QuestionDto getQuestionById(int questionId);
	QuestionDto updateQuestion(QuestionDto questionDto,int questionId);
     void deleteQuestion(int questionId);
}


