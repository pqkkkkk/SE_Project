package com.introduce2se.seproject.consultation.dao;

import com.introduce2se.seproject.consultation.model.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ConsultationDao {

    private final JdbcTemplate jdbcTemplate;

    public ConsultationDao(JdbcTemplate jdbctemplate){
        this.jdbcTemplate = jdbctemplate;
    }

    //Create consultation
    public int createConsultation(Consultation consultation){
        String sql = "INSERT INTO consultation ( date, start_time, end_time, type, status, patient_id, doctor_id, consultation_result, reason ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(
                sql,
                consultation.getConsultationDate(),
                consultation.getStartTime(),
                consultation.getEndTime(),
                consultation.getForm(),
                consultation.getStatus(),
                consultation.getPatientId(),
                consultation.getDoctorId(),
                consultation.getConsultationResult(),
                consultation.getReason());
    }

    // Get list of consultation of a user
    public List<Consultation> getUserConsultations(int user_id) {
        String sql = "select * from consultation where doctor_id = ? OR patient_id = ?";
        return jdbcTemplate.query(sql, new ConsultationRowMapper(), user_id, user_id);
    }

        // Get a consultation by id:
    public Consultation getConsultationByID(int id){
        String sql = "select * from consultation where id = ?";
        return jdbcTemplate.queryForObject(sql, new ConsultationRowMapper(), id);
    }

    // Update status of a consultation (doctor accept/refuse)
    public int updateStatus(int id, String status){
        String sql = "update consultation set status = ? where id = ?";
        return jdbcTemplate.update(sql, status, id);
    }

    // Update consultation_result receive from doctor
    public int updateConsultation_result(int id, String result){
        String sql = "update consultation set consultation_result = ? where id = ?";
        return jdbcTemplate.update(sql, result, id);
    }

    // Delete a consultation
    public int deleteConsultation(int id){
        String sql = "delete from consultation where id = ?";
        return jdbcTemplate.update(sql, id);
    }

    private static class ConsultationRowMapper implements RowMapper<Consultation> {
        @Override
        public Consultation mapRow(ResultSet rs, int rowNum) throws SQLException {
            Consultation consultation = new Consultation();
            consultation.setConsultationId(rs.getInt("id"));
            consultation.setConsultationDate(rs.getDate("date"));
            consultation.setStartTime(rs.getTime("start_time"));
            consultation.setEndTime(rs.getTime("end_time"));
            consultation.setForm(rs.getString("type"));
            consultation.setStatus(rs.getString("status"));
            consultation.setDoctorId(rs.getString("doctor_id"));
            consultation.setPatientId(rs.getString("patient_id"));
            consultation.setConsultationResult(rs.getString("consultation_result"));
            consultation.setReason(rs.getString("reason"));
            return consultation;
        }
    }

}
