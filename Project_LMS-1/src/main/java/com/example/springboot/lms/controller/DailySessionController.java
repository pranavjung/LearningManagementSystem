package com.example.springboot.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springboot.lms.payloads.ApiResponse;
import com.example.springboot.lms.payloads.DailySessionDto;
import com.example.springboot.lms.payloads.UserDto;
import com.example.springboot.lms.services.DailySessionService;
import com.example.springboot.lms.services.UserService;
@RestController
@CrossOrigin
@RequestMapping("/api/dailySession")
public class DailySessionController {
	
	@Autowired
	private DailySessionService dailySessionService;
	

	@PostMapping
	public ResponseEntity<DailySessionDto> saveDailySession(@RequestBody DailySessionDto dailySessionDto){
		DailySessionDto saveDailySessionDto =this.dailySessionService.saveDailySession(dailySessionDto);
	return new ResponseEntity<>(saveDailySessionDto,HttpStatus.CREATED);	
	}
	
     //build get all students REST API
	@GetMapping
	public ResponseEntity<List<DailySessionDto>>getAllDailySessions(){
		return ResponseEntity.ok(this.dailySessionService.getAllDailySessions());
	}
	// build get employee by id REST API
	// http://localhost:8080/api/students/1
	@GetMapping("/{id}")
	public ResponseEntity<DailySessionDto> getSingleDailySession(@PathVariable("id") int dailySessionId){
		return  ResponseEntity.ok(this.dailySessionService.getDailySessionById(dailySessionId));
	}
	//build update students REST API
	// http://localhost:8080/api/students/1
	@PutMapping("/{id}")
     public ResponseEntity<DailySessionDto> updateDailySession(@PathVariable("id") int dailySessionId,@RequestBody DailySessionDto dailySessionDto){
		DailySessionDto updatedDailySession=this.dailySessionService.updateDailySession(dailySessionDto,dailySessionId);
		
		return  ResponseEntity.ok(updatedDailySession);
	}
	//build update students REST API
		// http://localhost:8080/api/students/1
		@DeleteMapping("/{id}")
	     public ResponseEntity<ApiResponse> deleteUser(@PathVariable("id") int dailySessionId){
			//delete student from DB
			this.dailySessionService.deleteDailySession(dailySessionId);
			
			return new ResponseEntity<ApiResponse>(new ApiResponse("DailySession deleted sucessfully",true), HttpStatus.OK);
		
		}
	
	
}

