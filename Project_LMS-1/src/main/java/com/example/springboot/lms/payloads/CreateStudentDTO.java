package com.example.springboot.lms.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class CreateStudentDTO {
    private int  studentId;
    private long ccat_Roll_no;
    private long studentPRN;
    private UserDto user;
    private Integer batchId;
}
