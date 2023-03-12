package com.example.springboot.lms.model;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

//import ch.qos.logback.core.subst.Token.Type;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import jakarta.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity

@Table(name = "Batches")
public class Batch {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int batchId;
	private String  name;
	private String status;
	
	
	@OneToMany (mappedBy = "batch" ,cascade = CascadeType.ALL)
	@JsonBackReference(value="batch_student")
	private List<Student> studentList = new ArrayList<>();
	
	
	public Batch() {
		super();
		
	}

	
	public Batch(int batchId, String name, String status, List<Student> studentList) {
		super();
		this.batchId = batchId;
		this.name = name;
		this.status = status;
		this.studentList = studentList;
	}
	
	


	public int getBatchId() {
		return batchId;
	}


	public void setBatchId(int batchId) {
		this.batchId = batchId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public List<Student> getStudentList() {
		return studentList;
	}


	public void setStudentList(List<Student> studentList) {
		this.studentList = studentList;
	}


	
	
	
}
