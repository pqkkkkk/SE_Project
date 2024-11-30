package com.introduce2se.seproject.chat.dao;

import com.introduce2se.seproject.chat.models.Message;
import com.introduce2se.seproject.chat.rowmapper.MessageRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Repository
public class MessageSqlDao implements MessageDao{
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    @Autowired
    public MessageSqlDao(NamedParameterJdbcTemplate namedParameterJdbcTemplate)
    {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }
    @Override
    public ArrayList<Message> GetMessages(int currentUserId, int oppositeUserId) {
        try {
            ArrayList<Message> result = new ArrayList<>();
            String sql = "SELECT content, senderId, receiverId " +
                    "FROM message " +
                    "WHERE (senderId=:oui and receiverId=cui) " +
                    "or (senderId=:cui and receiverId=:oui)";
            Map<String, Object> params = new HashMap<>();
            params.put("cui", currentUserId);
            params.put("oui", oppositeUserId);

            result = (ArrayList<Message>) namedParameterJdbcTemplate.query(sql, params, new MessageRowMapper());
            return result;
        }
        catch(Exception e) {
            return null;
        }
    }

    @Override
    public void AddMessage(Message message) {
        String sql = " INSERT INTO message(senderId,receiverId,content,read) VALUES (:si, :ri, :c, :r)";
        Map<String, Object> params = new HashMap<>();
        params.put("si",message.getSenderId());
        params.put("ri",message.getReceiverId());
        params.put("c",message.getContent());
        params.put("r",false);
        namedParameterJdbcTemplate.update(sql, params);
    }
}
