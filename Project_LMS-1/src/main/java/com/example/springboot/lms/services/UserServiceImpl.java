package com.example.springboot.lms.services;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springboot.lms.exception.ResourceNotFoundException;

import com.example.springboot.lms.model.User;

import com.example.springboot.lms.payloads.UserDto;
import com.example.springboot.lms.repository.UserRepository;
@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository userRepository;
   @Autowired
	private ModelMapper modelMapper;

	@Override
	public UserDto saveUser(UserDto userDto) {
		User user =this.dtoToUser(userDto);
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		User savedUser = this.userRepository.save(user);
		return this.userToDto(savedUser);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users =this.userRepository.findAll();
		
		List<UserDto> userDtos=users.stream().map(user->this.userToDto(user)).collect(Collectors.toList());
		return userDtos;
	}

	@Override
	public UserDto getUserById(int userId) {
		
		User user=this.userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User", "id", userId));
		return this.userToDto(user);
	}

	@Override
	public UserDto updateUser(UserDto userDto, int userId) {
		
		
		User user=this.userRepository.findById(userId).orElseThrow();
		
		user.setPassword(userDto.getPassword());
		user.setName(userDto.getName());
		user.setAddress(userDto.getAddress());
		user.setEmailId(userDto.getEmailId());
		user.setDOB(userDto.getDOB());
		user.setBloodGroup(userDto.getBloodGroup());
		user.setGender(userDto.getGender());
		user.setDesignation(userDto.getDesignation());
		user.setContactNo(userDto.getContactNo());
		
		User upadateUser =this.userRepository.save(user);
		UserDto userDto1 =this.userToDto(upadateUser);
		
		return userDto1;
	}

	@Override
	public void deleteUser(int userId) {
		User user=this.userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User", "id", userId));	
		this.userRepository.delete(user);
	}
	
	public User dtoToUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);
		return user;
	}
	public UserDto userToDto(User user) {
		UserDto userDto =this.modelMapper.map(user, UserDto.class);
		return userDto;
	}
	

}






