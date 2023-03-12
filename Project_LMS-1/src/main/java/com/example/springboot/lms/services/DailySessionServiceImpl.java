package com.example.springboot.lms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.springboot.lms.exception.DataNotFoundException;
import com.example.springboot.lms.model.Batch;
import com.example.springboot.lms.model.User;
import com.example.springboot.lms.repository.BatchRepository;
import com.example.springboot.lms.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.lms.exception.ResourceNotFoundException;

import com.example.springboot.lms.model.DailySession;


import com.example.springboot.lms.payloads.DailySessionDto;


import com.example.springboot.lms.repository.DailySessionRepository;

@Service
public class DailySessionServiceImpl implements DailySessionService {
	@Autowired
	private DailySessionRepository dailySessionRepository ;
   @Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BatchRepository batchRepository;

	@Override
	public DailySessionDto saveDailySession(DailySessionDto dailySessionDto) {
		System.out.println(dailySessionDto);
		DailySession dailySession =this.dtoToDailySession(dailySessionDto);
		dailySession.setTimeend(dailySessionDto.getTimeend());
		dailySession.setTimeStart(dailySessionDto.getTimeStart());

		DailySession savedDailySession = this.dailySessionRepository.save(dailySession);
		return this.dailySessionToDto(savedDailySession);
	
	}

	@Override
	public List<DailySessionDto> getAllDailySessions() {
		List<DailySession> dailySessions =this.dailySessionRepository.findAll();
		
		List<DailySessionDto> dailySessionDtos=dailySessions.stream().map(dailySession->this.dailySessionToDto(dailySession)).collect(Collectors.toList());
		return dailySessionDtos;

	}

	@Override
	public DailySessionDto getDailySessionById(int sessionId) {
		DailySession dailySession=this.dailySessionRepository.findById(sessionId).orElseThrow(()-> new ResourceNotFoundException("DailySession", "id", sessionId));
		return this.dailySessionToDto(dailySession);
	}

	@Override
	public DailySessionDto updateDailySession(DailySessionDto dailySessionDto, int sessionId) {
		DailySession dailySession=this.dailySessionRepository.findById(sessionId).orElseThrow();
		//dailySession.setBatch(null);
		//dailySession.setDailyAttendenceList(null);
		//dailySession.setSessionId(dailySessionDto.getSessionId());
		dailySession.setSessionName(dailySessionDto.getSessionName());
		dailySession.setTimeend(dailySessionDto.getTimeend());
		dailySession.setTimeStart(dailySessionDto.getTimeend());
		//dailySession.setUser(null);
		
		DailySession upadateDailySession =this.dailySessionRepository.save(dailySession);
		DailySessionDto dailySessionDto1 =this.dailySessionToDto(upadateDailySession);
		
		return dailySessionDto1;
	}

	@Override
	public void deleteDailySession(int sessionId) {
		DailySession dailySession=this.dailySessionRepository.findById(sessionId).orElseThrow(()-> new ResourceNotFoundException("DailySession", "id", sessionId));	
		this.dailySessionRepository.delete(dailySession);
	}
	
	public DailySession dtoToDailySession(DailySessionDto dailySessionDto) {
		DailySession  dailySession = this.modelMapper.map(dailySessionDto, DailySession.class);
		Optional<User> _user = userRepository.findById(dailySessionDto.getUserId());
		Optional<Batch> _batch = batchRepository.findById(dailySessionDto.getBatchId());
		if(_user.isEmpty())
			throw new DataNotFoundException("User not found");
		if(_batch.isEmpty())
			throw new DataNotFoundException("Batch not found");
		dailySession.setUser(_user.get());
		dailySession.setBatch(_batch.get());
		return dailySession;
	}
	public DailySessionDto dailySessionToDto(DailySession dailySession) {
		DailySessionDto dailySessionDto =this.modelMapper.map(dailySession, DailySessionDto.class);
		return dailySessionDto;
	}
}
