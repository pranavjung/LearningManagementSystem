package com.example.springboot.lms.payloads;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


import com.example.springboot.lms.model.Batch;
import com.example.springboot.lms.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class DailySessionDto {
	private int sessionId;
	private String sessionName;
	private LocalDate date;
	private LocalTime timeStart;
	private LocalTime timeend;
    private Integer batchId;

	private Integer userId;

}
