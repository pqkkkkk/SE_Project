package com.introduce2se.seproject.account.model;

import lombok.Data;

@Data
public class Feedback {
    private int id;
    private int patientId;
    private int doctorId;
    private String content;
    private double rating;
}
