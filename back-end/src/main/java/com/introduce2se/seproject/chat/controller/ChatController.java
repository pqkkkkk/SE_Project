package com.introduce2se.seproject.chat.controller;

import com.introduce2se.seproject.chat.ChatService;
import com.introduce2se.seproject.chat.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    public ChatController(ChatService chatService, SimpMessagingTemplate simpMessagingTemplate)
    {
        this.chatService = chatService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @MessageMapping("/sendMessage/{receiverId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public void handleChatMessage(@DestinationVariable int receiverId, Message message){
        System.out.println("Message received: " + message);
        chatService.AddMessage(message);
        simpMessagingTemplate.convertAndSend("/topic/messages/" + receiverId, message);
        System.out.println("Message sent: " + message);
    }
    @GetMapping("/api/messages")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Message>> getMessages(@RequestParam int currentUserId, @RequestParam int oppositeUserId){
        return ResponseEntity.ok().body(chatService.GetMessages(currentUserId, oppositeUserId));
    }
}
