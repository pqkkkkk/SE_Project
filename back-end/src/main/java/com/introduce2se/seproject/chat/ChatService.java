package com.introduce2se.seproject.chat;

import com.introduce2se.seproject.chat.dao.MessageDao;
import com.introduce2se.seproject.chat.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    private final MessageDao messageDao;
    @Autowired
    public ChatService(MessageDao messageDao)
    {
        this.messageDao = messageDao;
    }
    public void AddMessage(Message message)
    {
        messageDao.AddMessage(message);
    }
    public List<Message> GetMessages(int currentUserId, int oppositeUserId)
    {
        return messageDao.GetMessages(currentUserId, oppositeUserId);
    }
}
