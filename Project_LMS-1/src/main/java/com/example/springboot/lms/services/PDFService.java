package com.example.springboot.lms.services;

import java.util.List;

import com.example.springboot.lms.model.PDF;
import com.example.springboot.lms.payloads.PDFDto;

public interface PDFService {
	PDFDto savePDF(PDFDto pdf);
	List<PDFDto> getAllPDFs();
	PDFDto getPDFById(int pdfId);
	PDFDto updatePDF(PDFDto pdfDto,int pdfId);
     void deletePDF(int pdfId);
}
