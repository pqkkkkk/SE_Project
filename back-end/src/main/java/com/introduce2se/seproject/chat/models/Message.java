package com.introduce2se.seproject.chat.models;

import lombok.Data;

@Data
public class Message {
    private int id;
    private int senderId;
    private int receiverId;
    private String content;
    private boolean read;
}
