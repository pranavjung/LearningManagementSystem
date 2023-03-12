package com.example.springboot.lms.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springboot.lms.model.Module;
import com.example.springboot.lms.payloads.ApiResponse;
import com.example.springboot.lms.payloads.ModuleDto;
import com.example.springboot.lms.payloads.UserDto;
//import com.example.springboot.lms.model.Student;
import com.example.springboot.lms.services.ModuleService;

@RestController
@CrossOrigin
@RequestMapping("/api/modules")
public class ModuleController {
	@Autowired	
private ModuleService moduleService;
	
	@PostMapping
	public ResponseEntity<ModuleDto> saveModule(@RequestBody ModuleDto moduleDto){
		ModuleDto saveModuleDto =this.moduleService.saveModule(moduleDto);
	return new ResponseEntity<>(saveModuleDto,HttpStatus.CREATED);	
	}
	
     //build get all students REST API
	@GetMapping
	public ResponseEntity<List<ModuleDto>>getAllModules(){
		return ResponseEntity.ok(this.moduleService.getAllModules());
	}
	// build get employee by id REST API
	// http://localhost:8080/api/students/1
	@GetMapping("/{id}")
	public ResponseEntity<ModuleDto> getSingleModule(@PathVariable("id") int moduleId){
		return  ResponseEntity.ok(this.moduleService.getModuleById(moduleId));
	}
	//build update students REST API
	// http://localhost:8080/api/students/1
	@PutMapping("/{id}")
     public ResponseEntity<ModuleDto> updateModule(@PathVariable("id") int moduleId,@RequestBody ModuleDto moduleDto){
		ModuleDto updatedModule=this.moduleService.updateModule(moduleDto,moduleId);
		
		return  ResponseEntity.ok(updatedModule);
	}
	//build update students REST API
		// http://localhost:8080/api/students/1
		@DeleteMapping("/{id}")
	     public ResponseEntity<ApiResponse> deleteModule(@PathVariable("id") int moduleId){
			//delete student from DB
			this.moduleService.deleteModule(moduleId);
			
			return new ResponseEntity<ApiResponse>(new ApiResponse("Module deleted sucessfully",true), HttpStatus.OK);
		
		}
	

	
	
}
