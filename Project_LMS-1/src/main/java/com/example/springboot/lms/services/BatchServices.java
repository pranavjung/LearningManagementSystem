package com.example.springboot.lms.services;

import java.util.List;

import com.example.springboot.lms.model.Batch;
import com.example.springboot.lms.payloads.BatchDto;

public interface BatchServices {
	
	BatchDto saveBatch(BatchDto batchDto);
	List<BatchDto> getAllBatches();
	BatchDto getBatchById(int batchId);
	BatchDto updateBatch(BatchDto batchDto,int batchId);
     void deleteBatch(int batchId);
	
	
}
