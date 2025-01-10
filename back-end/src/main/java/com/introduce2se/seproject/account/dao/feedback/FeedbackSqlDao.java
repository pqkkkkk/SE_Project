package com.introduce2se.seproject.account.dao.feedback;

import com.introduce2se.seproject.account.model.Feedback;
import com.introduce2se.seproject.account.rowmapper.FeedBackRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class FeedbackSqlDao implements FeedbackDao {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public FeedbackSqlDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public boolean AddFeedback(Feedback feedback) {
        String sql = "INSERT INTO feedback (patient_id, doctor_id, content, rating) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, feedback.getPatientId(), feedback.getDoctorId(), feedback.getContent(), feedback.getRating()) > 0;
    }
    @Override
    public List<Feedback> GetFeedbackByDoctorId(int doctorId) {
        String sql = "SELECT f.*, p.fullName as patient_name, d.fullName as doctor_name FROM feedback f " +
                "JOIN users p ON f.patient_id = p.id " +
                "JOIN users d ON f.doctor_id = d.id " +
                "WHERE doctor_id = ?";
        return jdbcTemplate.query(sql, new FeedBackRowMapper(), doctorId);
    }

    @Override
    public List<Feedback> GetAllFeedback() {
        return null;
    }

    @Override
    public Feedback GetFeedbackById(int feedbackId) {
        String sql = "SELECT f.*, p.fullName as patient_name, d.fullName as doctor_name FROM feedback f " +
                "JOIN users p ON f.patient_id = p.id " +
                "JOIN users d ON f.doctor_id = d.id " +
                "WHERE f.id = ?";
        return jdbcTemplate.queryForObject(sql, new FeedBackRowMapper(), feedbackId);
    }
}
