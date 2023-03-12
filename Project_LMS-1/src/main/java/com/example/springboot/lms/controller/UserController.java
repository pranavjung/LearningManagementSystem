package com.example.springboot.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springboot.lms.payloads.ApiResponse;
import com.example.springboot.lms.payloads.UserDto;
import com.example.springboot.lms.services.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;
	

	@PostMapping
	public ResponseEntity<UserDto> saveUser(@RequestBody UserDto userDto){
		UserDto saveUserDto =this.userService.saveUser(userDto);
	return new ResponseEntity<>(saveUserDto,HttpStatus.CREATED);	
	}
	
     //build get all students REST API
	@GetMapping
	public ResponseEntity<List<UserDto>>getAllUsers(){
		return ResponseEntity.ok(this.userService.getAllUsers());
	}
	// build get employee by id REST API
	// http://localhost:8080/api/students/1
	@GetMapping("/{id}")
	public ResponseEntity<UserDto> getSingleUser(@PathVariable("id") int userId){
		return  ResponseEntity.ok(this.userService.getUserById(userId));
	}
	//build update students REST API
	// http://localhost:8080/api/students/1
	@PutMapping("/{id}")
     public ResponseEntity<UserDto> updateUser(@PathVariable("id") int userId,@RequestBody UserDto userDto){
		UserDto updatedUser=this.userService.updateUser(userDto,userId);
		
		return  ResponseEntity.ok(updatedUser);
	}
	//build update students REST API
		// http://localhost:8080/api/students/1
		@DeleteMapping("/{id}")
	     public ResponseEntity<ApiResponse> deleteUser(@PathVariable("id") int userId){
			//delete student from DB
			this.userService.deleteUser(userId);
			
			return new ResponseEntity<ApiResponse>(new ApiResponse("User deleted sucessfully",true), HttpStatus.OK);
		
		}
	
	
}

