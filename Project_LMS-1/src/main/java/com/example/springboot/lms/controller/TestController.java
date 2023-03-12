package com.example.springboot.lms.controller;

import java.util.List;

import com.example.springboot.lms.model.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springboot.lms.payloads.ApiResponse;
import com.example.springboot.lms.payloads.TestDto;
import com.example.springboot.lms.services.TestService;

@RestController
@CrossOrigin
@RequestMapping("/api/tests")
public class TestController {
    @Autowired
	private TestService testService;

	
    @PostMapping
	public ResponseEntity<TestDto> saveTest(@RequestBody TestDto testDto){
    	TestDto saveTestDto =this.testService.saveTest(testDto);
	return new ResponseEntity<>(saveTestDto,HttpStatus.CREATED);	
	}
	
     //build get all students REST API
	@GetMapping
	public ResponseEntity<List<Test>>getAllTests(){
		return ResponseEntity.ok(this.testService.getAllTests());
	}
	// build get employee by id REST API
	// http://localhost:8080/api/students/1
	@GetMapping("/{id}")
	public ResponseEntity<Test> getSingleTest(@PathVariable("id") int testId){
		return  ResponseEntity.ok(this.testService.getTestById(testId));
	}
	//build update students REST API
	// http://localhost:8080/api/students/1
	@PutMapping("/{id}")
     public ResponseEntity<TestDto> updateTest(@PathVariable("id") int testId,@RequestBody TestDto testDto){
		TestDto updatedTest=this.testService.updateTest(testDto,testId);
		
		return  ResponseEntity.ok(updatedTest);
	}
	//build update students REST API
		// http://localhost:8080/api/students/1
		@DeleteMapping("/{id}")
	     public ResponseEntity<ApiResponse> deleteTest(@PathVariable("id") int testId){
			//delete student from DB
			this.testService.deleteTest(testId);
			
			return new ResponseEntity<ApiResponse>(new ApiResponse("Test deleted sucessfully",true), HttpStatus.OK);
		
		}
	
	
}
