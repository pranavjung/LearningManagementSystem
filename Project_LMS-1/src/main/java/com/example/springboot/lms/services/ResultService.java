package com.example.springboot.lms.services;

import java.util.List;


import com.example.springboot.lms.model.Result;
import com.example.springboot.lms.payloads.ResultDto;

public interface ResultService {
	ResultDto saveResult(ResultDto resultDto);
	
	List<Result> getAllResults();
	List<Result> getByTestIdResults(Integer testId);
	
	ResultDto getResultById(int resultId);
	
	ResultDto updateResult(ResultDto resultDto,int resultId);
	
     void deleteResult(int resultId);
}
