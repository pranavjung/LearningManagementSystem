package com.example.springboot.lms.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springboot.lms.model.Batch;
import com.example.springboot.lms.payloads.ApiResponse;
import com.example.springboot.lms.payloads.BatchDto;
import com.example.springboot.lms.payloads.UserDto;
//import com.example.springboot.lms.model.Student;
//import com.example.springboot.lms.model.Student;
import com.example.springboot.lms.services.BatchServices;
//import com.example.springboot.lms.services.ResultService;

@RestController
@CrossOrigin
@RequestMapping("/api/batches")
public class BatchController {
	@Autowired	
private BatchServices batchServices;
	
	@PostMapping
	public ResponseEntity<BatchDto> saveBatch(@RequestBody BatchDto batchDto){
		BatchDto saveBatchDto =this.batchServices.saveBatch(batchDto);
	return new ResponseEntity<>(saveBatchDto,HttpStatus.CREATED);	
	}
	
     //build get all students REST API
	@GetMapping
	public ResponseEntity<List<BatchDto>>getAllBatches(){
		return ResponseEntity.ok(this.batchServices.getAllBatches());
	}
	// build get employee by id REST API
	// http://localhost:8080/api/students/1
	@GetMapping("/{id}")
	public ResponseEntity<BatchDto> getSingleBatch(@PathVariable("id") int batchId){
		return  ResponseEntity.ok(this.batchServices.getBatchById(batchId));
	}
	//build update students REST API
	// http://localhost:8080/api/students/1
	@PutMapping("/{id}")
     public ResponseEntity<BatchDto> updateBatch(@PathVariable("id") int batchId,@RequestBody BatchDto batchDto){
		BatchDto updatedBatch=this.batchServices.updateBatch(batchDto,batchId);
		
		return  ResponseEntity.ok(updatedBatch);
	}
	//build update students REST API
		// http://localhost:8080/api/students/1
		@DeleteMapping("/{id}")
	     public ResponseEntity<ApiResponse> deleteBatch(@PathVariable("id") int batchId){
			//delete student from DB
			this.batchServices.deleteBatch(batchId);
			
			return new ResponseEntity<ApiResponse>(new ApiResponse("Batch deleted sucessfully",true), HttpStatus.OK);
		
		}
	
	
	


}
