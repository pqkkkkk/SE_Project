package com.introduce2se.seproject.account.rowmapper;

import com.introduce2se.seproject.account.model.Feedback;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FeedBackRowMapper implements RowMapper<Feedback> {
    @Override
    public Feedback mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        Feedback feedback = new Feedback();
        feedback.setId(resultSet.getInt("id"));
        feedback.setPatientId(resultSet.getInt("patient_id"));
        feedback.setPatientName(resultSet.getString("patient_name"));
        feedback.setDoctorId(resultSet.getInt("doctor_id"));
        feedback.setDoctorName(resultSet.getString("doctor_name"));
        feedback.setContent(resultSet.getString("content"));
        feedback.setRating(resultSet.getDouble("rating"));
        return feedback;
    }
}
