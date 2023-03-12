package com.example.springboot.lms.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.lms.exception.ResourceNotFoundException;
import com.example.springboot.lms.model.Batch;
import com.example.springboot.lms.model.User;
import com.example.springboot.lms.payloads.BatchDto;
import com.example.springboot.lms.payloads.UserDto;
import com.example.springboot.lms.repository.BatchRepository;
@Service
public class BatchServiceImpl implements BatchServices{
	@Autowired
	private BatchRepository batchRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Override
	public BatchDto saveBatch(BatchDto batchDto) {
		Batch batch =this.dtoToBatch(batchDto);
		Batch savedBatch = this.batchRepository.save(batch);
		return this.batchToDto(savedBatch);
	}
	@Override
	public List<BatchDto> getAllBatches() {
		List<Batch> batches =this.batchRepository.findAll();
		
		List<BatchDto> batchDtos=batches.stream().map(batch->this.batchToDto(batch)).collect(Collectors.toList());
		return batchDtos;
	}
	
	@Override
	public BatchDto getBatchById(int batchId) {
		Batch batch=this.batchRepository.findById(batchId).orElseThrow(()-> new ResourceNotFoundException("Batch", "id", batchId));
		return this.batchToDto(batch);
	}
	@Override
	public BatchDto updateBatch(BatchDto batchDto, int batchId) {
		Batch batch=this.batchRepository.findById(batchId).orElseThrow();
		//batch.setBatchId(batchId);
		batch.setName(batchDto.getName());
		batch.setStatus(batchDto.getStatus());
		//batch.setStudentList(batch);
		Batch upadateBatch =this.batchRepository.save(batch);
		BatchDto batchDto1 =this.batchToDto(upadateBatch);
		
		
		return batchDto1;
	}
	@Override
	public void deleteBatch(int batchId) {
		Batch batch=this.batchRepository.findById(batchId).orElseThrow(()-> new ResourceNotFoundException("Batch", "id", batchId));	
		this.batchRepository.delete(batch);
	}

	public Batch dtoToBatch(BatchDto batchDto) {
		Batch batch = this.modelMapper.map(batchDto, Batch.class);
		return batch;
	}
	public BatchDto batchToDto(Batch batch) {
		BatchDto batchDto =this.modelMapper.map(batch, BatchDto.class);
		return batchDto;
	}

}
