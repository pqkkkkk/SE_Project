package com.introduce2se.seproject.chat.dao;

import com.introduce2se.seproject.chat.models.Message;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
@Primary
public class MessageMockDao implements MessageDao {
    private ArrayList <Message> messages = new ArrayList<>();
    public ArrayList<Message> GetMessages(int currentUserId, int oppositeUserId){
        return messages;
    }

    public void AddMessage(Message message){
        messages.add(message);
    }
}
