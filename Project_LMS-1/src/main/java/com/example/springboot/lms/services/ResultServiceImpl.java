package com.example.springboot.lms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.springboot.lms.exception.DataNotFoundException;
import com.example.springboot.lms.model.Student;
import com.example.springboot.lms.model.Test;
import com.example.springboot.lms.repository.StudentRepository;
import com.example.springboot.lms.repository.TestRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.lms.exception.ResourceNotFoundException;
import com.example.springboot.lms.model.Result;


import com.example.springboot.lms.payloads.ResultDto;

import com.example.springboot.lms.repository.ResultRepository;
@Service
public class ResultServiceImpl implements ResultService{
	@Autowired
	private ResultRepository resultRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private TestRepository testRepository;


	@Override
	public ResultDto saveResult(ResultDto resultDto) {
		Result result =this.dtoToResult(resultDto);
		Optional<Student> student = studentRepository.findById(resultDto.getStudentId());
		Optional<Test> test = testRepository.findById(resultDto.getTestId());
		if(student.isEmpty()) throw new DataNotFoundException("Student not found");
		if(test.isEmpty()) throw new DataNotFoundException("Test not found");
		result.setStudent(student.get());
		result.setTest(test.get());
		Result savedResult = this.resultRepository.save(result);
		return this.resultToDto(savedResult);
	}

	@Override
	public List<Result> getAllResults() {
        List<Result> results =this.resultRepository.findAll();
		

		return results;
	}
	@Override
	public List<Result> getByTestIdResults(Integer testId) {
		List<Result> results = resultRepository.findByTest_TestId(testId);
		return results;
	}

	@Override
	public ResultDto getResultById(int resultId) {
		Result result=this.resultRepository.findById(resultId).orElseThrow(()-> new ResourceNotFoundException("Result", "id", resultId));
		return this.resultToDto(result);
	}

	@Override
	public ResultDto updateResult(ResultDto resultDto, int resultId) {
		Result result = this.resultRepository.findById(resultId).orElseThrow();
		
		//result.setStudent(result.getStudent());
		//result.setTest(result.getTest());
		result.setObtainedMarks(result.getObtainedMarks());
		
		Result upadateResult =this.resultRepository.save(result);
		ResultDto resultDto1 =this.resultToDto(upadateResult);
		
		return resultDto1;
	}

	@Override
	public void deleteResult(int resultId) {
		Result result = this.resultRepository.findById(resultId).orElseThrow(() -> new ResourceNotFoundException("Result", "ID", resultId));
	this.resultRepository.delete(result);
	}
	
	public Result dtoToResult(ResultDto resultDto) {
		Result result = this.modelMapper.map(resultDto, Result.class);
		return result;
	}
	public ResultDto resultToDto(Result result) {
		ResultDto resultDto =this.modelMapper.map(result, ResultDto.class);
		return resultDto;
	}

}
