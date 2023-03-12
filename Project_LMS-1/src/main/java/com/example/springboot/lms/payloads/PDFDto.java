package com.example.springboot.lms.payloads;

import com.example.springboot.lms.model.Module;

public class PDFDto {
	private int pdfId;
	private String path;
	private String name;
	private ModuleDto module;
	
	
	
	public ModuleDto getModule() {
		return module;
	}



	public void setModule(ModuleDto module) {
		this.module = module;
	}



	public PDFDto() {
		super();
		
	}



	public PDFDto(int pdfId, String path, String name) {
		
		this.pdfId = pdfId;
		this.path = path;
		this.name = name;
	}



	public int getPdfId() {
		return pdfId;
	}



	public void setPdfId(int pdfId) {
		this.pdfId = pdfId;
	}



	public String getPath() {
		return path;
	}



	public void setPath(String path) {
		this.path = path;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}
	
	
}
