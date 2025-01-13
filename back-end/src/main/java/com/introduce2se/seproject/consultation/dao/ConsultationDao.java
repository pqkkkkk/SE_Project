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
import java.util.*;

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
        String sql = "select c.*, p.fullName as patient_name, d.fullName as doctor_name from consultation c join users p on c.patient_id = p.id " +
                "join users d on c.doctor_id = d.id " +
                " where c.doctor_id = ? AND c.patient_id = ? AND c.status = ?";
        return jdbcTemplate.query(sql, new ConsultationRowMapper(), doctorId, patientId, status);
    }
    public List<Consultation> GetFilteredConsultations(String userRole, int userId,
                                                       String status, LocalDate consultationDate,Time startTime, Time endTime)
    {
        try{
            String sql = "select c.*, p.fullName as patient_name, d.fullName as doctor_name from consultation c " +
                    "join users p on c.patient_id = p.id " +
                    "join users d on c.doctor_id = d.id " +
                    " where 1=1 ";
            List<Object> params = new ArrayList<>();
            params.add(userId);
            if (userRole.equals("patient"))
            {
                sql += (" AND c.patient_id = ?");
            }
            else if (userRole.equals("doctor"))
            {
                sql += (" AND c.doctor_id = ?");
            }

            if (status != null && !status.equals("All"))
            {
                sql += (" AND c.status = ?");
                params.add(status);
            }

            if (consultationDate != null)
            {
                sql += (" AND c.date = ? ");
                params.add(consultationDate);
            }
            if (startTime != null)
            {
                sql += (" AND c.start_time >= CAST (? as TIME) ");
                params.add(startTime);
            }
            if (endTime != null)
            {
                sql += (" AND c.end_time <= CAST (? as TIME) ");
                params.add(endTime);
            }
            sql += (" ORDER BY c.date DESC, c.start_time DESC");
            return jdbcTemplate.query(sql, new ConsultationRowMapper(), params.toArray());
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            return null;
        }
    }
    public List<Consultation> GetConsultationsInAWeek(String userRole, int userId, String status, LocalDate consultationDate)
    {
        String sql = "select c.*, p.fullName as patient_name, d.fullName as doctor_name from consultation c " +
                "join users p on c.patient_id = p.id " +
                "join users d on c.doctor_id = d.id " +
                 "where 1=1 ";
        List<Object> params = new ArrayList<>();
        params.add(userId);
        if (userRole.equals("patient"))
        {
            sql += (" AND c.patient_id = ?");
        }
        else if (userRole.equals("doctor"))
        {
            sql += (" AND c.doctor_id = ?");
        }
        if(status != null && !status.equals("All"))
        {
            sql += (" AND c.status = ?");
            params.add(status);
        }
        int dayOfWeek = consultationDate.getDayOfWeek().getValue();
        LocalDate monday = consultationDate.minusDays(dayOfWeek);
        LocalDate sunday = monday.plusDays(7);
        sql += (" AND c.date >= ? AND c.date <= ? ");
        params.add(monday);
        params.add(sunday);

        List<Consultation> result =  jdbcTemplate.query(sql, new ConsultationRowMapper(), params.toArray());
        return result;
    }
    public Consultation GetNextConsultationToday(String userRole, int userId)
    {
        String sql = "select c.*, p.fullName as patient_name, d.fullName as doctor_name from consultation c " +
                "join users p on c.patient_id = p.id " +
                "join users d on c.doctor_id = d.id " +
                "where 1=1 ";
        List<Object> params = new ArrayList<>();
        params.add(userId);
        if (userRole.equals("patient"))
        {
            sql += (" AND c.patient_id = ?");
        }
        else if (userRole.equals("doctor"))
        {
            sql += (" AND c.doctor_id = ?");
        }
        Date today = new Date();
        sql += (" AND c.date = ? ");
        params.add(today);
        sql += (" ORDER BY c.start_time ASC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY");
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
        String sql = "select c.*, p.fullName as patient_name, d.fullName as doctor_name from consultation c " +
                "join users p on c.patient_id = p.id " +
                "join users d on c.doctor_id = d.id "
                + "where c.id = ?";
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
    public int UpdateAllMissedConsultation(String userRole, int userId)
    {
        try{
        String sql = "";
        if (userRole.equals("doctor"))
        {
            sql = """
                UPDATE consultation
                SET status = 'Missed'
                WHERE  (date < ? OR date = ? AND end_time < CAST (? as TIME))  AND status = 'Accepted' AND doctor_id = ?
                """;
        }
        else if (userRole.equals("patient"))
        {
            sql = """
                UPDATE consultation
                SET status = 'Missed'
                WHERE (date < ? OR date = ? AND end_time < CAST (? as TIME))  AND status = 'Accepted' AND patient_id = ?
                """;
        }
        Time now = new Time(new Date().getTime());
        LocalDate today = LocalDate.now();
        int result = jdbcTemplate.update(sql,today, today, now, userId);
        return result;
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            return -1;
        }
    }

    public Map<String, Integer> getPathologyCountByYear(int year){
        Map<String, Integer> pathologyCount = new HashMap<>();
        String sql = "SELECT p.name, COUNT(c.id) AS Count " +
                "FROM pathology p " +
                "LEFT JOIN consultation c ON p.name = c.pathology " +
                "AND YEAR(c.date) = ? GROUP BY p.name";


        jdbcTemplate.query(sql, new Object[]{year}, (rs) -> {
            String pathology = rs.getString("name");
            int count = rs.getInt("Count");
            pathologyCount.put(pathology, count);
        });


        return pathologyCount;
    }


    public Map<String, Integer> getPathologyCountByMonth(int year,int month){
        Map<String, Integer> pathologyCount = new HashMap<>();
        String sql = "SELECT p.name, COUNT(c.id) AS Count " +
                "FROM pathology p LEFT JOIN consultation c " +
                "ON p.name = c.pathology AND YEAR(c.date) = ? AND MONTH(c.date) = ? " +
                "GROUP BY p.name ";


        jdbcTemplate.query(sql, new Object[]{year, month}, (rs) -> {
            String pathology = rs.getString("name");
            int count = rs.getInt("Count");
            pathologyCount.put(pathology, count);
        });


        return pathologyCount;
    }


    public Map<String, Integer> getPathologyCountByWeek(int year, int month,int week){
        Map<String, Integer> pathologyCount = new HashMap<>();
        String sql = "SELECT p.name AS pathology_name, COUNT(c.id) AS consultation_count " +
                "FROM pathology p " +
                "LEFT JOIN consultation c ON p.name = c.pathology " +
                "AND YEAR(c.date) = ? AND MONTH(c.date) = ? AND DATEPART(WEEK, c.date) - DATEPART(WEEK, DATEFROMPARTS(YEAR(c.date), MONTH(c.date), 1)) + 1 = ? " +
                "GROUP BY p.name ";


        jdbcTemplate.query(sql, new Object[]{year,month,week}, (rs) -> {
            String pathology = rs.getString("pathology_name");
            int count = rs.getInt("consultation_count");
            pathologyCount.put(pathology, count);
        });
        return pathologyCount;
    }


    public Map<Integer, Integer>countOnlineConsultationByYear(int year){
        Map<Integer, Integer> onlineConsultationCount = new HashMap<>();
        String sql = "SELECT m.month as month, COUNT(c.id) AS count " +
                "FROM (VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (11), (12)) AS m(month) " +
                "LEFT JOIN consultation c " +
                "ON MONTH(c.date) = m.month " +
                "AND YEAR(c.date) = ? " +
                "AND c.type = 'online' " +
                "GROUP BY m.month " +
                "ORDER BY m.month ";
        jdbcTemplate.query(sql, new Object[]{year}, (rs) -> {
            int month = rs.getInt("month");
            int count = rs.getInt("count");
            onlineConsultationCount.put(month, count);
        });
        return onlineConsultationCount;
    }


    public Map<Integer, Integer>countOnlineConsultationByMonth(int year, int month){
        Map<Integer, Integer> onlineConsultationCount = new HashMap<>();
        String sql = "SELECT DATEPART(WEEK, c.date) - DATEPART(WEEK, DATEADD(MONTH, DATEDIFF(MONTH, 0, c.date), 0)) + 1 AS WeekOfMonth, COUNT(c.id) AS count " +
                "FROM consultation c " +
                "WHERE YEAR(c.date) = ? AND MONTH(c.date) = ? AND c.type = 'online' " +
                "GROUP BY " +
                "DATEPART(WEEK, c.date) - DATEPART(WEEK, DATEADD(MONTH, DATEDIFF(MONTH, 0, c.date), 0)) + 1 " +
                "ORDER BY WeekOfMonth ";


        jdbcTemplate.query(sql, new Object[]{year,month}, (rs) -> {
            int week = rs.getInt("WeekOfMonth");
            int count = rs.getInt("count");
            onlineConsultationCount.put(week, count);
        });
        return onlineConsultationCount;
    }


    public Map<Integer, Integer>countOnlineConsultationByWeek(int year, int month, int week){
        Map<Integer, Integer> onlineConsultationCount = new HashMap<>();
        String sql = "SELECT DATEPART(WEEKDAY, c.date) AS day_of_week, COUNT(c.id) AS count " +
                "FROM " +
                "consultation c " +
                "WHERE YEAR(c.date) = ? " +
                "AND MONTH(c.date) = ? " +
                "AND ((DAY(c.date) - 1) / 7 + 1) = ? " +
                "AND c.type = 'online' " +
                "GROUP BY " +
                "DATEPART(WEEKDAY, c.date) " +
                "ORDER BY " +
                "DATEPART(WEEKDAY, c.date) ";


        jdbcTemplate.query(sql, new Object[]{year,month,week}, (rs) -> {
            int day = rs.getInt("day_of_week");
            int count = rs.getInt("count");
            onlineConsultationCount.put(day, count);
        });
        return onlineConsultationCount;
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
            consultation.setPatientName(rs.getString("patient_name"));
            consultation.setDoctorName(rs.getString("doctor_name"));
            return consultation;
        }
    }
}
