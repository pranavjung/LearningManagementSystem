package com.example.springboot.lms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.springboot.lms.payloads.ApiResponse;
@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ResourceNotFoundException.class)
	 public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex){
		 String message=ex.getMessage();
		 ApiResponse apiResponse= new ApiResponse(message,false);
		 return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.NOT_MODIFIED);
	 }
	@ExceptionHandler(DataNotFoundException.class)
	public ResponseEntity<ApiResponse> dataNotFoundExceptionHandler(DataNotFoundException ex){
		return new ResponseEntity<ApiResponse>( new ApiResponse(ex.getMessage(),false),HttpStatus.NOT_FOUND);
	}
}
