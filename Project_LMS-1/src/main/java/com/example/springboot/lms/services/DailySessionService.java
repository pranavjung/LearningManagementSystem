package com.example.springboot.lms.services;

import java.util.List;

//import com.example.springboot.lms.payloads.DailyAttendenceDto;
import com.example.springboot.lms.payloads.DailySessionDto;

public interface DailySessionService {


	DailySessionDto saveDailySession(DailySessionDto dailySessionDto);
	
	List<DailySessionDto> getAllDailySessions();
	
	DailySessionDto getDailySessionById(int sessionId);
	
	DailySessionDto updateDailySession(DailySessionDto dailySessionDto, int sessionId);
	
	void deleteDailySession(int sessionId);
}
