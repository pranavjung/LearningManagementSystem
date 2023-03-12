package com.example.springboot.lms.payloads;

public class ModuleDto {

	
	private int moduleId;
	private String moduleName;
	
	public ModuleDto() {
		super();
	}

	public ModuleDto(int moduleId, String moduleName) {
		super();
		this.moduleId = moduleId;
		this.moduleName = moduleName;
	}

	public int getModuleId() {
		return moduleId;
	}

	public void setModuleId(int moduleId) {
		this.moduleId = moduleId;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	
	
}
