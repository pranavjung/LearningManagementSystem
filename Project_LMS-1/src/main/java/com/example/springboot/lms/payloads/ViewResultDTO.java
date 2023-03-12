package com.example.springboot.lms.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class ViewResultDTO {
    private String studentName;
    private long ccat_Roll_no;
    private long studentPRN;

}
