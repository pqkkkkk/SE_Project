package com.introduce2se.seproject.consultation.dao;

import com.introduce2se.seproject.consultation.model.*;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class ConsultationDao {
    private final JdbcTemplate jdbcTemplate;
    public ConsultationDao(JdbcTemplate jdbctemplate){
        this.jdbcTemplate = jdbctemplate;
    }
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
    public List<Consultation> GetAllConsultationsByPatientIdAndDoctorId(int patientId, int doctorId, String status) {
        String sql = "select * from consultation where doctor_id = ? AND patient_id = ? AND status = ?";
        return jdbcTemplate.query(sql, new ConsultationRowMapper(), doctorId, patientId, status);
    }
    public List<Consultation> GetFilteredConsultations(String userRole, int userId,
                                                       String status, Date consultationDate,Time startTime, Time endTime)
    {
        String sql = "select * from consultation where 1=1 ";
        List<Object> params = new ArrayList<>();
        params.add(userId);
        if (userRole.equals("patient"))
        {
            sql += (" AND patient_id = ?");
        }
        else if (userRole.equals("doctor"))
        {
            sql += (" AND doctor_id = ?");
        }

        if (status != null && !status.equals("All"))
        {
            sql += (" AND status = ?");
            params.add(status);
        }

        if (consultationDate != null)
        {
            sql += (" AND date = ? ");
            params.add(consultationDate);
        }
        if (startTime != null)
        {
            sql += (" AND start_time >= ? ");
            params.add(startTime);
        }
        if (endTime != null)
        {
            sql += (" AND end_time <= ? ");
            params.add(endTime);
        }

        return jdbcTemplate.query(sql, new ConsultationRowMapper(), params.toArray());
    }
    public List<Consultation> GetConsultationsInAWeek(String userRole, int userId, String status, LocalDate consultationDate)
    {
        String sql = "select * from consultation where 1=1 ";
        List<Object> params = new ArrayList<>();
        params.add(userId);
        if (userRole.equals("patient"))
        {
            sql += (" AND patient_id = ?");
        }
        else if (userRole.equals("doctor"))
        {
            sql += (" AND doctor_id = ?");
        }
        if(status != null && !status.equals("All"))
        {
            sql += (" AND status = ?");
            params.add(status);
        }
        int dayOfWeek = consultationDate.getDayOfWeek().getValue();
        LocalDate monday = consultationDate.minusDays(dayOfWeek);
        LocalDate sunday = monday.plusDays(7);
        sql += (" AND date >= ? AND date <= ? ");
        params.add(monday);
        params.add(sunday);

        List<Consultation> result =  jdbcTemplate.query(sql, new ConsultationRowMapper(), params.toArray());
        return result;
    }
    public Consultation GetNextConsultationToday(String userRole, int userId)
    {
        String sql = "select * from consultation where 1=1 ";
        List<Object> params = new ArrayList<>();
        params.add(userId);
        if (userRole.equals("patient"))
        {
            sql += (" AND patient_id = ?");
        }
        else if (userRole.equals("doctor"))
        {
            sql += (" AND doctor_id = ?");
        }
        Date today = new Date();
        sql += (" AND date = ? ");
        params.add(today);
        sql += (" ORDER BY start_time ASC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY");
        try {
            Consultation result = jdbcTemplate.queryForObject(sql, new ConsultationRowMapper(), params.toArray());
            return result;
        }
        catch(EmptyResultDataAccessException e)
        {
            return null;
        }

    }
    public Consultation getConsultationByID(int id){
        String sql = "select * from consultation where id = ?";
        return jdbcTemplate.queryForObject(sql, new ConsultationRowMapper(), id);
    }
    public int updateStatus(int id, String status){
        String sql = "update consultation set status = ? where id = ?";
        return jdbcTemplate.update(sql, status, id);
    }
    public int updateConsultation_result(int id, String result){
        String sql = "update consultation set consultation_result = ? where id = ?";
        return jdbcTemplate.update(sql, result, id);
    }
    public int deleteConsultation(int id){
        String sql = "delete from consultation where id = ?";
        return jdbcTemplate.update(sql, id);
    }
    private static class ConsultationRowMapper implements RowMapper<Consultation> {
        @Override
        public Consultation mapRow(ResultSet rs, int rowNum) throws SQLException {
            Consultation consultation = new Consultation();
            consultation.setConsultationId(rs.getInt("id"));
            consultation.setConsultationDate(rs.getDate("date").toLocalDate());
            consultation.setStartTime(rs.getTime("start_time"));
            consultation.setEndTime(rs.getTime("end_time"));
            consultation.setForm(rs.getString("type"));
            consultation.setStatus(rs.getString("status"));
            consultation.setDoctorId(rs.getInt("doctor_id"));
            consultation.setPatientId(rs.getInt("patient_id"));
            consultation.setConsultationResult(rs.getString("consultation_result"));
            consultation.setReason(rs.getString("reason"));
            return consultation;
        }
    }
}
