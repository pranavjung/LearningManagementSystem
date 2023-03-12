package com.example.springboot.lms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.springboot.lms.exception.DataNotFoundException;
import com.example.springboot.lms.model.Module;
import com.example.springboot.lms.model.Question;
import com.example.springboot.lms.repository.ModuleRepository;
import com.example.springboot.lms.repository.QuestionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.lms.exception.ResourceNotFoundException;
//import com.example.springboot.lms.model.Result;
import com.example.springboot.lms.model.Test;

import com.example.springboot.lms.payloads.TestDto;

import com.example.springboot.lms.repository.TestRepository;
@Service
public class TestServiceImpl implements TestService {
	@Autowired
	private TestRepository testRepository;
	
	 @Autowired
		private ModelMapper modelMapper;
	@Autowired
	private QuestionRepository questionRepository;
	@Autowired
	private ModuleRepository moduleRepository;

	@Override
	public TestDto saveTest(TestDto testDto) {
		Test test=this.dtoToTest(testDto);
		Optional<Module> _module = moduleRepository.findById(testDto.getModuleId());
		if(_module.isEmpty()) throw new DataNotFoundException("Module not found");
		test.setModule(_module.get());
		Test savedTest = this.testRepository.save(test);
		return this.testToDto(savedTest);
	}

	@Override
	public List<Test> getAllTests() {
		List<Test> tests =this.testRepository.findAll();
//		List<TestDto> testDtos=tests.stream().map(test->this.testToDto(test)).collect(Collectors.toList());
		return tests;
	}

	@Override
	public Test getTestById(int testId) {
		Test test=this.testRepository.findById(testId).orElseThrow(()-> new ResourceNotFoundException("Test", "id", testId));
		return test;
	}

	@Override
	public TestDto updateTest(TestDto testDto, int testId) {
		Test test=this.testRepository.findById(testId).orElseThrow();
		
		test.setTestName(testDto.getTestName());
		//test.setModule(testDto.getModule());
		test.setTotalMarks(testDto.getTotalMarks());
		
		Test upadateTest =this.testRepository.save(test);
	    TestDto  testDto1 =this.testToDto(upadateTest);

		return testDto1;
	}

	@Override
	public void deleteTest(int testId) {
		Test test=this.testRepository.findById(testId).orElseThrow(() -> new ResourceNotFoundException("Test", "ID", testId));
		testRepository.delete(test);
		
	}
	public Test dtoToTest(TestDto testDto) {
		Test test = this.modelMapper.map(testDto, Test.class);
		return test;
	}
	public TestDto testToDto(Test test) {
		TestDto testDto =this.modelMapper.map(test, TestDto.class);
		return testDto;
	}

	
	

}
