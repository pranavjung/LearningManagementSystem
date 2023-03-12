package com.example.springboot.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springboot.lms.model.PDF;
import com.example.springboot.lms.payloads.ApiResponse;
import com.example.springboot.lms.payloads.PDFDto;
import com.example.springboot.lms.payloads.UserDto;
//import com.example.springboot.lms.model.Student;
//import com.example.springboot.lms.model.Student;
import com.example.springboot.lms.services.PDFService;

@RestController
@CrossOrigin
@RequestMapping("/api/pdfs")
public class PDFController {
	@Autowired
	private PDFService pdfService;
	

	@PostMapping
	public ResponseEntity<PDFDto> PDFsave(@RequestBody PDFDto pdfDto){
		PDFDto savePDFDto =this.pdfService.savePDF(pdfDto);
	return new ResponseEntity<>(savePDFDto,HttpStatus.CREATED);	
	}
	
     //build get all students REST API
	@GetMapping
	public ResponseEntity<List<PDFDto>>getAllPDFs(){
		return ResponseEntity.ok(this.pdfService.getAllPDFs());
	}
	// build get employee by id REST API
	// http://localhost:8080/api/students/1
	@GetMapping("/{id}")
	public ResponseEntity<PDFDto> getSinglePDF(@PathVariable("id") int pdfId){
		return  ResponseEntity.ok(this.pdfService.getPDFById(pdfId));
	}
	//build update students REST API
	// http://localhost:8080/api/students/1
	@PutMapping("/{id}")
     public ResponseEntity<PDFDto> updatePDF(@PathVariable("id") int pdfId,@RequestBody PDFDto pdfDto){
		PDFDto updatedPDF=this.pdfService.updatePDF(pdfDto,pdfId);
		
		return  ResponseEntity.ok(updatedPDF);
	}
	//build update students REST API
		// http://localhost:8080/api/students/1
		@DeleteMapping("/{id}")
	     public ResponseEntity<ApiResponse> deletePDF(@PathVariable("id") int pdfId){
			//delete student from DB
			this.pdfService.deletePDF(pdfId);
			
			return new ResponseEntity<ApiResponse>(new ApiResponse("PDF deleted sucessfully",true), HttpStatus.OK);
		
				}
	
	
	
	
	
}
