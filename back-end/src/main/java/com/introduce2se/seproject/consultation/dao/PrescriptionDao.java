package com.introduce2se.seproject.consultation.dao;

import com.introduce2se.seproject.consultation.model.*;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Repository
public class PrescriptionDao {

    private final JdbcTemplate jdbcTemplate;

    public PrescriptionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Prescription getPrescriptionByConsultationId(int consultationId) {
        try {
            String sql = "SELECT * FROM prescription WHERE consultation_id = ?";
            return jdbcTemplate.queryForObject(sql, new PrescriptionRowMapper(), consultationId);
        }
        catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    private static class PrescriptionRowMapper implements RowMapper<Prescription> {
        @Override
        public Prescription mapRow(ResultSet rs, int rowNum) throws SQLException {
            Prescription prescription = new Prescription();
            prescription.setPrescriptionId(rs.getInt("id"));
            prescription.setTotalPrice(rs.getInt("total_price"));
            prescription.setCreatedDay(rs.getDate("created_day"));
            prescription.setConsultationId(rs.getInt("consultation_id"));
            prescription.setStatus(rs.getString("status"));
            return prescription;
        }
    }
    public List<PrescriptionDetail> getPrescriptionDetails(int prescriptionId) {
        String sql = "SELECT pd.*, d.name FROM prescription_detail pd JOIN drug d on pd.drug_id = d.id  WHERE pd.prescription_id = ?";
        return jdbcTemplate.query(sql, new PrescriptionDetailRowMapper(), prescriptionId);
    }
    public Prescription getPrescriptionById(int prescriptionId){
        String sql = "SELECT * FROM prescription WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new PrescriptionRowMapper(), prescriptionId);
    }
    public int createPrescription(Prescription prescription) {
        String sql = "INSERT INTO prescription (total_price, created_day, consultation_id, status) VALUES (?, ?, ?,?)";
        jdbcTemplate.update(sql,
                prescription.getTotalPrice(),
                prescription.getCreatedDay(),
                prescription.getConsultationId(),
                "unpaid");

        String thisPrescriptionId = "SELECT @@IDENTITY";
        Optional<Integer> lastId = Optional.ofNullable(jdbcTemplate.queryForObject(thisPrescriptionId, Integer.class));

        return lastId.orElseThrow(() -> new RuntimeException("Failed to retrieve the last inserted ID"));
    }
    public void addPrescriptionDetail(PrescriptionDetail prescriptionDetail) {
        String sql ="INSERT INTO prescription_detail (quantity, usage, prescription_id, drug_id,total_price) VALUES (?, ?, ?, ?,?)";
        jdbcTemplate.update(sql,
                prescriptionDetail.getQuantity(),
                prescriptionDetail.getUsage(),
                prescriptionDetail.getPrescriptionId(),
                prescriptionDetail.getDrugId()
                ,prescriptionDetail.getTotalPrice());
    }
    public List<Prescription> GetPrescriptionsOfPatient(int userId, String consultationStatus, String prescriptionStatus) {
        List<Prescription> prescriptions = null;
        String sql = """
                    select * from prescription p join consultation c on p.consultation_id = c.id
                                                 join users u on u.id = c.patient_id
                    Where u.id = ? and c.status = ? and p.status = ?
    """;
        prescriptions = jdbcTemplate.query(sql, new PrescriptionRowMapper(),
                userId, consultationStatus, prescriptionStatus);
        return prescriptions;
    }
    public void updatePrescriptionStatus(int prescriptionId, String status) {
        String sql = "UPDATE prescription SET status = ? WHERE id = ?";
        jdbcTemplate.update(sql, status, prescriptionId);
    }

    public Map<Integer,Integer> calculateRevenueByYear(int year){
        Map<Integer,Integer> revenueByYear = new HashMap<>();
        String sql = "select month(created_day) as month, sum(total_price) as total " +
                "from prescription " +
                "where year(created_day) = ? and status = 'Paid' " +
                "group by month(created_day) ";
        jdbcTemplate.query(sql, new Object[]{year}, (rs) -> {
            int month = rs.getInt("month");
            int total = rs.getInt("total");
            revenueByYear.put(month, total);
        });
        return revenueByYear;
    }


    public Map<Integer,Integer> calculateRevenueByMonth(int year,int month){
        Map<Integer,Integer> revenueByMonth = new HashMap<>();
        String sql = "SELECT DATEPART(WEEK, created_day) - DATEPART(WEEK, DATEADD(DAY, 1 - DAY(created_day), created_day)) + 1 AS week,SUM(total_price) AS total " +
                "FROM prescription " +
                "WHERE YEAR(created_day) = ? AND MONTH(created_day) = ? AND status = 'Paid' " +
                "GROUP BY DATEPART(WEEK, created_day) - DATEPART(WEEK, DATEADD(DAY, 1 - DAY(created_day), created_day)) + 1 " +
                "ORDER BY week";
        jdbcTemplate.query(sql, new Object[]{year,month},(rs)-> {
            int week = rs.getInt("week");
            int total = rs.getInt("total");
            revenueByMonth.put(week, total);
        });
        return revenueByMonth;
    }


    public Map<Integer,Integer> calculateRevenueByWeek(int year,int month, int week){
        Map<Integer,Integer> revenueByWeek = new HashMap<>();
        String sql = "SELECT DATEPART(WEEKDAY, created_day) AS day, SUM(total_price) AS total " +
                "FROM prescription " +
                "WHERE YEAR(created_day) = ? AND MONTH(created_day) = ? AND DATEPART(WEEK, created_day) - DATEPART(WEEK, DATEADD(DAY, 1 - DAY(created_day), created_day)) + 1 = ? AND status = 'Paid' " +
                "GROUP BY DATEPART(WEEKDAY, created_day) " +
                "ORDER BY day";
        jdbcTemplate.query(sql, new Object[]{year,month,week},(rs)-> {
            int day = rs.getInt("day");
            int total = rs.getInt("total");
            revenueByWeek.put(day, total);
        });
        return revenueByWeek;
    }

    private static class PrescriptionDetailRowMapper implements RowMapper<PrescriptionDetail> {
        @Override
        public PrescriptionDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
            PrescriptionDetail detail = new PrescriptionDetail();
            detail.setId(rs.getInt("id"));
            detail.setQuantity(rs.getInt("quantity"));
            detail.setUsage(rs.getString("usage"));
            detail.setPrescriptionId(rs.getInt("prescription_id"));
            detail.setDrugId(rs.getInt("drug_id"));
            detail.setTotalPrice(rs.getInt("total_price"));
            detail.setName(rs.getString("name"));
            return detail;
        }
    }
}
