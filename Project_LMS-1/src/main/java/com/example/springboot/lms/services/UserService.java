package com.example.springboot.lms.services;

import java.util.List;


import com.example.springboot.lms.payloads.UserDto;

public interface UserService {

	UserDto saveUser(UserDto user);
	
	List<UserDto> getAllUsers();
	
	UserDto getUserById(int userId);
	
     UserDto updateUser(UserDto user,int userId);
     
     void deleteUser(int userId);

	
}