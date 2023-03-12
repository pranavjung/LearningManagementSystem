 package com.example.springboot.lms.controller;

import java.util.List;

import com.example.springboot.lms.payloads.CreateStudentDTO;
import com.example.springboot.lms.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springboot.lms.payloads.ApiResponse;
import com.example.springboot.lms.payloads.StudentDto;


@RestController
@CrossOrigin
@RequestMapping("/api/students")
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	

	@PostMapping
	public ResponseEntity<StudentDto> saveStudent(@RequestBody CreateStudentDTO studentDto){
		StudentDto saveStudentDto =this.studentService.saveStudent(studentDto);
	return new ResponseEntity<>(saveStudentDto,HttpStatus.CREATED);	
	}
	
     //build get all students REST API
	@GetMapping
	public ResponseEntity<List<StudentDto>>getAllStudents(){
		return ResponseEntity.ok(this.studentService.getAllStudents());
	}
	// build get employee by id REST API
	// http://localhost:8080/api/students/1
	@GetMapping("/{id}")
	public ResponseEntity<StudentDto> getSingleStudent(@PathVariable("id") int studentId){
		return  ResponseEntity.ok(this.studentService.getStudentById(studentId));
	}
	@GetMapping("/byUserId/{userId}")
	public ResponseEntity<StudentDto> getSingleStudentByUserId(@PathVariable("userId") int userId){
		return  ResponseEntity.ok(this.studentService.getStudentByUserId(userId));
	}
	//build update students REST API
	// http://localhost:8080/api/students/1
	@PutMapping("/{id}")
     public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") int studentId,@RequestBody CreateStudentDTO studentDto){
		StudentDto updatedStudent=this.studentService.updateStudent(studentDto,studentId);
		
		return  ResponseEntity.ok(updatedStudent);
	}
	//build update students REST API
		// http://localhost:8080/api/students/1
		@DeleteMapping("/{id}")
	     public ResponseEntity<ApiResponse> deleteStudent(@PathVariable("id") int studentId){
			//delete student from DB
			this.studentService.deleteStudent(studentId);
			
			return new ResponseEntity<ApiResponse>(new ApiResponse("Student deleted sucessfully",true), HttpStatus.OK);
		
		}
	
	
}

