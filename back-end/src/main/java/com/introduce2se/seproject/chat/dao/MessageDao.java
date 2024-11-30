package com.introduce2se.seproject.chat.dao;

import com.introduce2se.seproject.chat.models.Message;

import java.util.ArrayList;

public interface MessageDao {
    public ArrayList<Message> GetMessages(int currentUserId,int oppositeUserId);
    public void AddMessage(Message message);
}
