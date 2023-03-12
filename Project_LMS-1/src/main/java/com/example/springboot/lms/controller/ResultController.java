package com.example.springboot.lms.controller;

import java.util.List;

import com.example.springboot.lms.model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springboot.lms.payloads.ApiResponse;
import com.example.springboot.lms.payloads.ResultDto;
import com.example.springboot.lms.services.ResultService;


@RestController
@CrossOrigin
@RequestMapping("/api/results")
public class ResultController {
	@Autowired
	private ResultService resultService;
	
	
	
	
	@PostMapping
	public ResponseEntity<ResultDto> saveResult(@RequestBody ResultDto resultDto){
		ResultDto saveResultDto =this.resultService.saveResult(resultDto);
	return new ResponseEntity<>(saveResultDto,HttpStatus.CREATED);	
	}
	
     //build get all students REST API
	@GetMapping
	public ResponseEntity<List<Result>>getAllResults(){
		return ResponseEntity.ok(this.resultService.getAllResults());
	}
	// build get employee by id REST API
	// http://localhost:8080/api/students/1
	@GetMapping("/{id}")
	public ResponseEntity<ResultDto> getSingleResult(@PathVariable("id") int resultId){
		return  ResponseEntity.ok(this.resultService.getResultById(resultId));
	}
	@GetMapping("/byTestId/{testId}")
	public ResponseEntity<List<Result>> getByTestIdResult(@PathVariable("testId") int testId){
		return  ResponseEntity.ok(this.resultService.getByTestIdResults(testId));
	}
	//build update students REST API
	// http://localhost:8080/api/students/1
	@PutMapping("/{id}")
     public ResponseEntity<ResultDto> updateResult(@PathVariable("id") int resultId,@RequestBody ResultDto resultDto){
		ResultDto updatedResult=this.resultService.updateResult(resultDto,resultId);
		
		return  ResponseEntity.ok(updatedResult);
	}
	//build update students REST API
		// http://localhost:8080/api/students/1
		@DeleteMapping("/{id}")
	     public ResponseEntity<ApiResponse> deleteResult(@PathVariable("id") int resultId){
			//delete student from DB
			this.resultService.deleteResult(resultId);
			
			return new ResponseEntity<ApiResponse>(new ApiResponse("Result deleted sucessfully",true), HttpStatus.OK);
		
		}
	
	
}

