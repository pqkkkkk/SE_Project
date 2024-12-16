package com.introduce2se.seproject.api;

import com.introduce2se.seproject.chat.dao.MessageDao;
import com.introduce2se.seproject.chat.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final MessageDao messageDao;
    @Autowired
    public ChatController(MessageDao messageDao)
    {
        this.messageDao = messageDao;
    }
    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public String handleChatMessage(Message message){
        messageDao.AddMessage(message);
        return "Message sent";
    }
}
