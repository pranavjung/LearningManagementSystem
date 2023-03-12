package com.example.springboot.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springboot.lms.payloads.ApiResponse;
import com.example.springboot.lms.payloads.DailyAttendenceDto;
import com.example.springboot.lms.payloads.UserDto;
import com.example.springboot.lms.services.DailyAttendenceService;
import com.example.springboot.lms.services.UserService;
@RestController
@CrossOrigin
@RequestMapping("/api/dailyAttendence")
public class DailyAttendenceController {
	@Autowired
	private DailyAttendenceService dailyAttendenceService;
	

	@PostMapping
	public ResponseEntity<DailyAttendenceDto> saveDailyAttendence(@RequestBody DailyAttendenceDto dailyAttendenceDto){
		DailyAttendenceDto saveDailyAttendenceDto =this.dailyAttendenceService.saveDailyAttendence(dailyAttendenceDto);
	return new ResponseEntity<>(saveDailyAttendenceDto,HttpStatus.CREATED);	
	}
	
     //build get all students REST API
	@GetMapping
	public ResponseEntity<List<DailyAttendenceDto>>getAllDailyAttendences(){
		return ResponseEntity.ok(this.dailyAttendenceService.getAllDailyAttendences());
	}
	// build get employee by id REST API
	// http://localhost:8080/api/students/1
	@GetMapping("/{id}")
	public ResponseEntity<DailyAttendenceDto> getSingleDailyAttendence(@PathVariable("id") int dailyAttendenceId){
		return  ResponseEntity.ok(this.dailyAttendenceService.getDailyAttendenceById(dailyAttendenceId));
	}
	//build update students REST API
	// http://localhost:8080/api/students/1
	@PutMapping("/{id}")
     public ResponseEntity<DailyAttendenceDto> updateDailyAttendence(@PathVariable("id") int dailyAttendenceId,@RequestBody DailyAttendenceDto dailyAttendenceDto){
		DailyAttendenceDto updatedDailyAttendence=this.dailyAttendenceService.updateDailyAttendence(dailyAttendenceDto,dailyAttendenceId);
		
		return  ResponseEntity.ok(updatedDailyAttendence);
	}
	//build update students REST API
		// http://localhost:8080/api/students/1
		@DeleteMapping("/{id}")
	     public ResponseEntity<ApiResponse> deleteDailyAttendence(@PathVariable("id") int dailyAttendenceId){
			//delete student from DB
			this.dailyAttendenceService.deleteDailyAttendence(dailyAttendenceId);
			
			return new ResponseEntity<ApiResponse>(new ApiResponse("DailyAttendence deleted sucessfully",true), HttpStatus.OK);
		
		}
	
	
}

