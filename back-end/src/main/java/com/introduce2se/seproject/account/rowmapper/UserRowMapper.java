package com.introduce2se.seproject.account.rowmapper;

import com.introduce2se.seproject.account.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException{
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setUserName(rs.getString("username"));
        user.setUserRole(rs.getString("role"));
        user.setEmail(rs.getString("email"));
        user.setAddress(rs.getString("address"));
        user.setBirthDay(rs.getDate("birthday"));
        user.setFullName(rs.getString("fullname"));
        user.setPhoneNumber(rs.getString("phonenumber"));
        user.setPassWord(rs.getString("password"));
        user.setGender(rs.getString("gender"));
        return user;
    }
}
