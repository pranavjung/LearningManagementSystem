package com.example.springboot.lms.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.lms.exception.ResourceNotFoundException;
import com.example.springboot.lms.model.Module;
import com.example.springboot.lms.model.User;
import com.example.springboot.lms.payloads.ModuleDto;
import com.example.springboot.lms.payloads.UserDto;
import com.example.springboot.lms.repository.ModuleRepository;
@Service
public class ModuleServiceImpl implements ModuleService{
	@Autowired
	private ModuleRepository moduleRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ModuleDto saveModule(ModuleDto moduleDto) {
		Module module = this.dtoToModule(moduleDto);
		Module savedModule = this.moduleRepository.save(module);
		
		return this.moduleToDto(savedModule);
	}

	@Override
	public List<ModuleDto> getAllModules() {
		List<Module> modules =this.moduleRepository.findAll();
		
		List<ModuleDto> moduleDtos=modules.stream().map(module->this.moduleToDto(module)).collect(Collectors.toList());
		return moduleDtos;
		
	}

	@Override
	public ModuleDto getModuleById(int moduleId) {
		Module module = this.moduleRepository.findById(moduleId).orElseThrow(()-> new ResourceNotFoundException("Module", "id", moduleId));
		
		return this.moduleToDto(module);
	}

	@Override
	public ModuleDto updateModule(ModuleDto moduleDto, int moduleId) {
		Module module=this.moduleRepository.findById(moduleId).orElseThrow();
		module.setModuleName(moduleDto.getModuleName());
	//	module.setModuleId(moduleId);
	//	module.setPdfList(moduleDto.get);
	//	module.setQuestionList(null);
	//	module.setTestList(null);
	//	module.setUserList(null);
		
		Module updateModule = this.moduleRepository.save(module);
		ModuleDto moduleDto1 = this.moduleToDto(updateModule);
		return moduleDto1;
	}

	@Override
	public void deleteModule(int moduleId) {
		Module module = this.moduleRepository.findById(moduleId).orElseThrow(()-> new ResourceNotFoundException("Module", "id", moduleId));
		this.moduleRepository.delete(module);
	}
	
	public Module dtoToModule(ModuleDto moduleDto) {
		Module module = this.modelMapper.map(moduleDto, Module.class);
		return module;
	}
	public ModuleDto moduleToDto(Module module) {
		ModuleDto moduleDto =this.modelMapper.map(module, ModuleDto.class);
		return moduleDto;
	}
}
