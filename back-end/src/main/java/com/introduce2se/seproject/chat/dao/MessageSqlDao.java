package com.introduce2se.seproject.chat.dao;

import com.introduce2se.seproject.chat.models.Message;
import com.introduce2se.seproject.chat.rowmapper.MessageRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Repository
@Primary
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
            String sql = "SELECT * " +
                    "FROM message " +
                    "WHERE (sender_id=:oui and receiver_id=:cui) " +
                    "or (sender_id=:cui and receiver_id=:oui)";
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
        String sql = " INSERT INTO message(sender_id,receiver_id,content) VALUES (:si, :ri, :c)";
        Map<String, Object> params = new HashMap<>();
        params.put("si",message.getSenderId());
        params.put("ri",message.getReceiverId());
        params.put("c",message.getContent());
        namedParameterJdbcTemplate.update(sql, params);
    }
}
