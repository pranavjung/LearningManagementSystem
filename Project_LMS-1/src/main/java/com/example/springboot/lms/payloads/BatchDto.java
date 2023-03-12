package com.example.springboot.lms.payloads;

public class BatchDto {

	private int batchId;
	private String  name;
	private String status;
	
	
	public BatchDto() {
		super();
		
	}
	public BatchDto(int batchId, String name, String status) {
		super();
		this.batchId = batchId;
		this.name = name;
		this.status = status;
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
	
	
}
