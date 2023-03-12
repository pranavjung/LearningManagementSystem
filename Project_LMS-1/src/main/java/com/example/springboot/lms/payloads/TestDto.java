package com.example.springboot.lms.payloads;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.example.springboot.lms.model.Module;
import com.example.springboot.lms.model.Question;
import com.example.springboot.lms.model.Result;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class TestDto {
	private int testId;
	private String testName;
	private int totalMarks;
	private Integer moduleId;
}
