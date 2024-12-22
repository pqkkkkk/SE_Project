package com.introduce2se.seproject.chat.rowmapper;

import com.introduce2se.seproject.account.model.User;
import com.introduce2se.seproject.chat.models.Message;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MessageRowMapper implements RowMapper<Message> {
    @Override
    public Message mapRow(ResultSet rs, int rowNum) throws SQLException {
        Message message = new Message();
        message.setId(rs.getInt("id"));
        //message.setRead(rs.getBoolean("read"));
        message.setContent(rs.getString("content"));
        message.setReceiverId(rs.getInt("receiver_id"));
        message.setSenderId(rs.getInt("sender_id"));
        return message;
    }
}
