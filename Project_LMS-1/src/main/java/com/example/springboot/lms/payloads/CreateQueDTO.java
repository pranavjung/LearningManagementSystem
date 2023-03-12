package com.example.springboot.lms.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateQueDTO {
    private int questionId;
    private String question;
    private String path;
    private String option_A;
    private String option_B;
    private String option_C;
    private String option_D;
    private String correctAns;
    private int weightage;
    private Integer moduleId;
}
