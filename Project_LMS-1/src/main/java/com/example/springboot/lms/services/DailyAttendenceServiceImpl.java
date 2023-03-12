package com.example.springboot.lms.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.lms.exception.ResourceNotFoundException;
import com.example.springboot.lms.model.DailyAttendence;
//import com.example.springboot.lms.model.User;
//import com.example.springboot.lms.model.User;
import com.example.springboot.lms.payloads.DailyAttendenceDto;

import com.example.springboot.lms.repository.DailyAttendenceRepository;

@Service
public class DailyAttendenceServiceImpl implements DailyAttendenceService {
	@Autowired
	private DailyAttendenceRepository dailyAttendenceRepository;
   @Autowired
	private ModelMapper modelMapper;
	@Override
	public DailyAttendenceDto saveDailyAttendence(DailyAttendenceDto dailyAttendenceDto) {
		DailyAttendence dailyAttendence =this.dtoToDailyAttendence(dailyAttendenceDto);
		DailyAttendence savedDailyAttendence = this.dailyAttendenceRepository.save(dailyAttendence);
		return this.dailyAttendenceToDto(savedDailyAttendence);
	}

	@Override
	public List<DailyAttendenceDto> getAllDailyAttendences() {
List<DailyAttendence> dailyAttendences =this.dailyAttendenceRepository.findAll();
		
		List<DailyAttendenceDto> dailyAttendenceDtos=dailyAttendences.stream().map(dailyAttendence->this.dailyAttendenceToDto(dailyAttendence)).collect(Collectors.toList());
		return dailyAttendenceDtos;
	}

	@Override
	public DailyAttendenceDto getDailyAttendenceById(int attendenceId) {
		DailyAttendence dailyAttendence=this.dailyAttendenceRepository.findById(attendenceId).orElseThrow(()-> new ResourceNotFoundException("DailyAttendence", "id", attendenceId));
		return this.dailyAttendenceToDto(dailyAttendence);
	}

	@Override
	public DailyAttendenceDto updateDailyAttendence(DailyAttendenceDto dailyAttendenceDto, int attendenceId) {
		DailyAttendence dailyAttendence=this.dailyAttendenceRepository.findById(attendenceId).orElseThrow();
		//dailyAttendence.setAttendenceId(dailyAttendenceDto.getAttendenceId());
	//dailyAttendence.setDailySession(null);
		//dailyAttendence.setStudent(null);
	
		DailyAttendence upadateDailyAttendence =this.dailyAttendenceRepository.save(dailyAttendence);
		DailyAttendenceDto dailyAttendenceDto1 =this.dailyAttendenceToDto(upadateDailyAttendence);
		
		return dailyAttendenceDto1;
	}

	@Override
	public void deleteDailyAttendence(int attendenceId) {
		DailyAttendence dailyAttendence=this.dailyAttendenceRepository.findById(attendenceId).orElseThrow(()-> new ResourceNotFoundException("DailyAttendence", "id", attendenceId));	
		this.dailyAttendenceRepository.delete(dailyAttendence);
		
	}
	public DailyAttendence dtoToDailyAttendence(DailyAttendenceDto dailyAttendenceDto) {
		DailyAttendence dailyAttendence = this.modelMapper.map(dailyAttendenceDto, DailyAttendence.class);
		return dailyAttendence;
	}
	public DailyAttendenceDto dailyAttendenceToDto(DailyAttendence dailyAttendence ) {
		DailyAttendenceDto dailyAttendenceDto =this.modelMapper.map(dailyAttendence, DailyAttendenceDto.class);
		return dailyAttendenceDto;
	}

}
