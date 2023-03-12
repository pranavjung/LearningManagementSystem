package com.example.springboot.lms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.springboot.lms.exception.DataNotFoundException;
import com.example.springboot.lms.model.Module;
import com.example.springboot.lms.payloads.CreateQueDTO;
import com.example.springboot.lms.repository.ModuleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.lms.exception.ResourceNotFoundException;
//import com.example.springboot.lms.model.Module;
import com.example.springboot.lms.model.Question;

import com.example.springboot.lms.payloads.QuestionDto;

import com.example.springboot.lms.repository.QuestionRepository;

//import jakarta.persistence.ManyToOne;
@Service
public class QuestionServiceImpl implements QuestionService {
	@Autowired
	private QuestionRepository questionRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private ModuleRepository moduleRepository;

	@Override
	public QuestionDto saveQuestion(CreateQueDTO questionDto) {
		Question question = this.modelMapper.map(questionDto, Question.class);
		Optional<Module> _module = moduleRepository.findById(questionDto.getModuleId());
		if(_module.isEmpty()) throw new DataNotFoundException("Module not found");
		question.setModule(_module.get());
		Question savedQuestion = this.questionRepository.save(question);
		return this.questionToDto(savedQuestion);
		
	}
	@Override
	public List<QuestionDto> getAllQuestions() {
	List<Question> questions =this.questionRepository.findAll();
		
		List<QuestionDto> questionDtos=questions.stream().map(question->this.questionToDto(question)).collect(Collectors.toList());
		return questionDtos;
	}
	@Override
	public QuestionDto getQuestionById(int questionId) {

		Question question=this.questionRepository.findById(questionId).orElseThrow(()-> new ResourceNotFoundException("Question", "id", questionId));
		return this.questionToDto(question);
	}
	@Override
	public QuestionDto updateQuestion(QuestionDto questionDto, int questionId) {
		Question question=this.questionRepository.findById(questionId).orElseThrow();
		question.setCorrectAns(questionDto.getCorrectAns());
		//question.setModule(null);
		question.setOption_A(questionDto.getOption_A());
		question.setOption_B(questionDto.getOption_B());
		question.setOption_C(questionDto.getOption_C());
		question.setOption_D(questionDto.getOption_D());
		question.setPath(questionDto.getPath());
		question.setQuestion(questionDto.getQuestion());
		//question.setQuestionId(questionDto.getQuestionId());
		//question.setTestList(null);
		question.setWeightage(questionDto.getWeightage());
		Question upadateQuestion =this.questionRepository.save(question);
		QuestionDto questionDto1 =this.questionToDto(upadateQuestion);
		
		return questionDto1;
	
	}
	
	@Override
	public void deleteQuestion(int questionId) {
		Question question=this.questionRepository.findById(questionId).orElseThrow(()-> new ResourceNotFoundException("Question", "id", questionId));	
		this.questionRepository.delete(question);
		
	}
	public Question dtoToQuestion(QuestionDto questionDto) {
		Question question = this.modelMapper.map(questionDto, Question.class);
		return question;
	}
	public QuestionDto questionToDto(Question question) {
		QuestionDto questionDto =this.modelMapper.map(question, QuestionDto.class);
		return questionDto;
	}
	
	
	
}
