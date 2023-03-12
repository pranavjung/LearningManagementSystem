package com.example.springboot.lms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.springboot.lms.exception.DataNotFoundException;
import com.example.springboot.lms.model.Batch;
import com.example.springboot.lms.model.User;
import com.example.springboot.lms.payloads.CreateStudentDTO;
import com.example.springboot.lms.payloads.UserDto;
import com.example.springboot.lms.repository.BatchRepository;
import com.example.springboot.lms.repository.UserRepository;
import org.modelmapper.ModelMapper;
//import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.springboot.lms.exception.ResourceNotFoundException;
import com.example.springboot.lms.model.Student;

import com.example.springboot.lms.payloads.StudentDto;

import com.example.springboot.lms.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {
	@Autowired
	private StudentRepository studentRepository;
	
	 @Autowired
		private ModelMapper modelMapper;
	@Autowired
	private BatchRepository batchRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserService userService;


	@Override
		public StudentDto saveStudent(CreateStudentDTO studentDto) {
		 	Student student = this.modelMapper.map(studentDto, Student.class);
		 	Optional<Batch> _batch = batchRepository.findById(studentDto.getBatchId());
			 if(_batch.isEmpty()) throw new DataNotFoundException("Batch not found");
			 student.setBatch(_batch.get());

			 UserDto userDto =  userService.saveUser(studentDto.getUser());
			User user = this.modelMapper.map(userDto, User.class);
			userRepository.save(user);
			student.setUser(user);
			Student savedStudent = this.studentRepository.save(student);
			return this.studentToDto(savedStudent);
		}
		

	@Override
	public List<StudentDto> getAllStudents(){
List<Student> students =this.studentRepository.findAll();
		
		List<StudentDto> studentDtos=students.stream().map(student->this.studentToDto(student)).collect(Collectors.toList());
		return studentDtos;
	}

	@Override
	public StudentDto getStudentById(int studentId) {
//		
		Student student=this.studentRepository.findById(studentId).orElseThrow(()-> new ResourceNotFoundException("Student", "id", studentId));
		return this.studentToDto(student);
	}

	@Override
	public StudentDto getStudentByUserId(int userId) {
		Student student=this.studentRepository.findByUser_UserId(userId).orElseThrow(()-> new ResourceNotFoundException("Student", "id", userId));
		return this.studentToDto(student);
	}

	@Override
	public StudentDto updateStudent(CreateStudentDTO studentDto, int studentId) {
		Student student = this.studentRepository.findById(studentId).orElseThrow( () -> new DataNotFoundException("Student not found"));
		Optional<Batch> _batch = batchRepository.findById(studentDto.getBatchId());
		if(_batch.isEmpty()) throw new DataNotFoundException("Batch not found");
		student.setBatch(_batch.get());
		student.setStudentPRN(studentDto.getStudentPRN());
		student.setCcat_Roll_no(studentDto.getCcat_Roll_no());
		UserDto userDtoEt = studentDto.getUser();
		userDtoEt.setUserId(student.getUser().getUserId());
		UserDto userDto =  userService.saveUser(userDtoEt);
		User user = this.modelMapper.map(userDto, User.class);
		student.setUser(user);
		Student updateStudent =this.studentRepository.save(student);
		StudentDto studentDto1 =this.studentToDto(updateStudent);
		return studentDto1;
	
	}

	@Override
	public void deleteStudent(int studentId) {
		Student student=this.studentRepository.findById(studentId).orElseThrow(()-> new ResourceNotFoundException("Student", "id", studentId));	
		this.studentRepository.delete(student);
		
	}
	
	public Student dtoToStudent(StudentDto studentDto) {
		Student student = this.modelMapper.map(studentDto, Student.class);
		return student;
	}
	public StudentDto studentToDto(Student student) {
		StudentDto studentDto =this.modelMapper.map(student, StudentDto.class);
		return studentDto;
	}

	

	
}

