package com.example.springboot.lms.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.lms.exception.ResourceNotFoundException;
//import com.example.springboot.lms.model.Module;
import com.example.springboot.lms.model.PDF;
import com.example.springboot.lms.model.User;
import com.example.springboot.lms.payloads.PDFDto;
import com.example.springboot.lms.payloads.UserDto;
import com.example.springboot.lms.repository.PDFRepository;


//import jakarta.persistence.ManyToOne;
@Service
public class PDFServiceImpl implements PDFService{
	@Autowired
	private PDFRepository pdfRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Override
	
	
	public PDFDto savePDF(PDFDto pdfDto) {
		PDF pdf = this.dtoToPDF(pdfDto);
		PDF savedPdf = this.pdfRepository.save(pdf);
		return this.pdfToDto(savedPdf);
				
	}
	@Override
	public List<PDFDto> getAllPDFs() {
		List<PDF> pdfs =this.pdfRepository.findAll();
		
		List<PDFDto> pdfDtos=pdfs.stream().map(pdf->this.pdfToDto(pdf)).collect(Collectors.toList());
		return pdfDtos;
	}
	@Override
	public PDFDto getPDFById(int pdfId) {
		PDF pdf=this.pdfRepository.findById(pdfId).orElseThrow(()-> new ResourceNotFoundException("PDF", "id", pdfId));
		return this.pdfToDto(pdf);
	}
	@Override
	public PDFDto updatePDF(PDFDto pdfDto, int pdfId) {
		PDF pdf = this.pdfRepository.findById(pdfId).orElseThrow();
		pdf.setName(pdfDto.getName());
		pdf.setPath(pdfDto.getPath());
	//	pdf.setModule(null);
	//	pdf.setPdfId(pdfId);
		
		
		
		
		
		PDF updatePdf = this.pdfRepository.save(pdf);
		PDFDto pdfDto1 = this.pdfToDto(updatePdf);
		
		
		return pdfDto1;
	}
	@Override
	public void deletePDF(int pdfId) {
		PDF pdf = this.pdfRepository.findById(pdfId).orElseThrow(()-> new ResourceNotFoundException("PDF", "id", pdfId));
		this.pdfRepository.delete(pdf);
	}
	
	public PDF dtoToPDF(PDFDto pdfDto) {
		PDF pdf = this.modelMapper.map(pdfDto, PDF.class);
		return pdf;
	}
	public PDFDto pdfToDto(PDF pdf) {
		PDFDto pdfDto =this.modelMapper.map(pdf, PDFDto.class);
		return pdfDto;
	}
	
	
}
