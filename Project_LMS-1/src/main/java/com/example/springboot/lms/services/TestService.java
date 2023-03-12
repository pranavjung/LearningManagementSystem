package com.example.springboot.lms.services;

import java.util.List;

import com.example.springboot.lms.model.Test;
import com.example.springboot.lms.payloads.TestDto;

public interface TestService {
	TestDto saveTest(TestDto test);
	
	List<Test> getAllTests();
	
	Test getTestById(int testId);
	
	TestDto updateTest(TestDto test,int testId);
	
     void deleteTest(int testId);
}
