package com.example.springboot.lms.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class ResultDto {
	private int resultId;
	private int obtainedMarks;
	private Integer studentId;
	private Integer testId;
}
