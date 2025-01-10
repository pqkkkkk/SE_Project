package com.introduce2se.seproject.account.model;

import lombok.Data;

@Data
public class Feedback {
    private int id;
    private int patientId;
    private String patientName;
    private String doctorName;
    private int doctorId;
    private String content;
    private double rating;
}
