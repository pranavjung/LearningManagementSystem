package com.example.springboot.lms.services;

import java.util.List;

import com.example.springboot.lms.model.Module;
import com.example.springboot.lms.payloads.ModuleDto;

public interface ModuleService {

	ModuleDto saveModule(ModuleDto moduleDto);
	
	List<ModuleDto> getAllModules();
	ModuleDto getModuleById(int moduleId);
	ModuleDto updateModule(ModuleDto moduleDto,int moduleId);
     void deleteModule(int moduleId);
}
