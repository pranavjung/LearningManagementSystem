package com.example.springboot.lms.services;

import java.util.List;

import com.example.springboot.lms.model.Student;
import com.example.springboot.lms.payloads.CreateStudentDTO;
import com.example.springboot.lms.payloads.StudentDto;

public interface StudentService {
	
	StudentDto saveStudent(CreateStudentDTO studentDto);
	
	List<StudentDto> getAllStudents();
	
	StudentDto getStudentById(int studentId);
	StudentDto getStudentByUserId(int userId);
	
     StudentDto updateStudent(CreateStudentDTO studentDto,int studentId);
     
     void deleteStudent(int studentId);
}
