package com.introduce2se.seproject.consultation.dao;

import com.introduce2se.seproject.consultation.model.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class PrescriptionDao {

    private final JdbcTemplate jdbcTemplate;

    public PrescriptionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // get prescription of a consultation
    public Prescription getPrescriptionByConsultationId(int consultationId) {
        String sql = "SELECT * FROM prescription WHERE consultation_id = ?";
        return jdbcTemplate.queryForObject(sql, new PrescriptionRowMapper(), consultationId);
    }

    // RowMapper cho Prescription
    private static class PrescriptionRowMapper implements RowMapper<Prescription> {
        @Override
        public Prescription mapRow(ResultSet rs, int rowNum) throws SQLException {
            Prescription prescription = new Prescription();
            prescription.setPrescriptionId(rs.getInt("id"));
            prescription.setTotalPrice(rs.getInt("total_price"));
            prescription.setCreatedDay(rs.getDate("created_day"));
            prescription.setConsultationId(rs.getInt("consultation_id"));
            return prescription;
        }
    }
    // get all prescription detail of a prescription
    public List<PrescriptionDetail> getPrescriptionDetails(int prescriptionId) {
        String sql = "SELECT * FROM prescription_detail WHERE prescription_id = ?";
        return jdbcTemplate.query(sql, new PrescriptionDetailRowMapper(), prescriptionId);
    }

    // get a prescription by id
    public Prescription getPrescriptionById(int prescriptionId){
        String sql = "SELECT * FROM prescription WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new PrescriptionRowMapper(), prescriptionId);
    }

    // Create a prescription into database and get prescription id
    public int createPrescription(Prescription prescription) {
        String sql = "INSERT INTO prescription (total_price, created_day, consultation_id) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql,
                prescription.getTotalPrice(),
                prescription.getCreatedDay(),
                prescription.getConsultationId());

        // Lấy id của prescription vừa tạo
        String thisPrescriptionId = "SELECT @@IDENTITY";
        Optional<Integer> lastId = Optional.ofNullable(jdbcTemplate.queryForObject(thisPrescriptionId, Integer.class));

        return lastId.orElseThrow(() -> new RuntimeException("Failed to retrieve the last inserted ID"));
    }

    // Add a prescription detail
    public void addPrescriptionDetail(PrescriptionDetail prescriptionDetail) {
        String sql ="INSERT INTO prescription_detail (quantity, usage, prescription_id, drug_id) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                prescriptionDetail.getQuantity(),
                prescriptionDetail.getUsage(),
                prescriptionDetail.getPrescriptionId(),
                prescriptionDetail.getDrugId());
    }

    // RowMapper cho PrescriptionDetail
    private static class PrescriptionDetailRowMapper implements RowMapper<PrescriptionDetail> {
        @Override
        public PrescriptionDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
            PrescriptionDetail detail = new PrescriptionDetail();
            detail.setId(rs.getInt("id"));
            detail.setQuantity(rs.getInt("quantity"));
            detail.setUsage(rs.getString("usage"));
            detail.setPrescriptionId(rs.getInt("prescription_id"));
            detail.setDrugId(rs.getInt("drug_id"));
            return detail;
        }
    }
}
