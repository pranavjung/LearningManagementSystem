package com.example.springboot.lms.services;

import java.util.List;

import com.example.springboot.lms.payloads.DailyAttendenceDto;

public interface DailyAttendenceService {

	DailyAttendenceDto saveDailyAttendence(DailyAttendenceDto dailyAttendenceDto);
	
	List<DailyAttendenceDto> getAllDailyAttendences();
	
	DailyAttendenceDto getDailyAttendenceById(int attendenceId);
	
	DailyAttendenceDto updateDailyAttendence(DailyAttendenceDto dailyAttendenceDto, int attendenceId);
	
	void deleteDailyAttendence(int attendenceId);
	
}
