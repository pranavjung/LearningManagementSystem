package com.example.springboot.lms.controller;

import java.util.List;

import com.example.springboot.lms.payloads.CreateQueDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springboot.lms.payloads.ApiResponse;
import com.example.springboot.lms.payloads.QuestionDto;
import com.example.springboot.lms.services.QuestionService;

@RestController
@CrossOrigin
@RequestMapping("/api/questions")
public class QuestionController {
	@Autowired
	private QuestionService questionService;
	
	@PostMapping
	public ResponseEntity<QuestionDto> saveQuestion(@RequestBody CreateQueDTO questionDto){
		QuestionDto saveQuestionDto =this.questionService.saveQuestion(questionDto);
	return new ResponseEntity<>(saveQuestionDto,HttpStatus.CREATED);	
	}
	
     //build get all students REST API
	@GetMapping
	public ResponseEntity<List<QuestionDto>>getAllQuestions(){
		return ResponseEntity.ok(this.questionService.getAllQuestions());
	}
	// build get employee by id REST API
	// http://localhost:8080/api/students/1
	@GetMapping("/{id}")
	public ResponseEntity<QuestionDto> getSingleQuestion(@PathVariable("id") int questionId){
		return  ResponseEntity.ok(this.questionService.getQuestionById(questionId));
	}
	//build update students REST API
	// http://localhost:8080/api/students/1
	@PutMapping("/{id}")
     public ResponseEntity<QuestionDto> updateQuestion(@PathVariable("id") int questionId,@RequestBody QuestionDto questionDto){
		QuestionDto updatedQuestion=this.questionService.updateQuestion(questionDto,questionId);
		
		return  ResponseEntity.ok(updatedQuestion);
	}
	//build update students REST API
		// http://localhost:8080/api/students/1
		@DeleteMapping("/{id}")
	     public ResponseEntity<ApiResponse> deleteQuestion(@PathVariable("id") int questionId){
			//delete student from DB
			this.questionService.deleteQuestion(questionId);
			
			return new ResponseEntity<ApiResponse>(new ApiResponse("Question deleted sucessfully",true), HttpStatus.OK);
		
		}
	
	
}

