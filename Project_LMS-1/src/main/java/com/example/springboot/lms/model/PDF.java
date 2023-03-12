package com.example.springboot.lms.model;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity

@Table(name = "PDFs")
public class PDF {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pdfId;
	private String path;
	private String name;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Module module;

	
	

	public PDF() {
		super();
		
	}


	public PDF(int pdfId, String path, String name, Module module) {
		super();
		this.pdfId = pdfId;
		this.path = path;
		this.name = name;
		this.module = module;
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

	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	
}
