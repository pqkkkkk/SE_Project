package com.introduce2se.seproject.drug.dao;

import com.introduce2se.seproject.drug.model.Drug;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class DrugSqlDao implements IDrugDao {

    private final JdbcTemplate jdbcTemplate;

    public DrugSqlDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

    }

    // get all the drugs
    @Override
    public List<Drug> getAllDrugs(){
        String sql = "SELECT * FROM drug";
        return jdbcTemplate.query(sql,new DrugRowMapper());
    }
    // get drugs by id
    @Override
    public Drug getDrugById(int drugId){
        String sql= "SELECT * FROM drug where id = ?";
        return jdbcTemplate.queryForObject(sql, new DrugRowMapper(),drugId);
    }

    // find drug by keyword and type
    @Override
    public List<Drug> findDrugs(String keyword, String drugTypeName) {
        String sql = "SELECT * FROM drug WHERE 1=1";  // Điều kiện mặc định là luôn đúng

        // Thêm điều kiện tìm theo keyword nếu có
        if (keyword != null && !keyword.isEmpty()) {
            sql += " AND name LIKE ?";
        }

        // Thêm điều kiện tìm theo loại thuốc nếu có
        if (drugTypeName != null && !drugTypeName.isEmpty()) {
            sql += " AND drug_type = ?";
        }

        // Thực thi truy vấn với các tham số tương ứng
        if ((keyword != null && !keyword.isEmpty()) && (drugTypeName != null && !drugTypeName.isEmpty())) {
            return jdbcTemplate.query(sql, new DrugRowMapper(), "%" + keyword + "%", drugTypeName);
        }
        else if (keyword != null && !keyword.isEmpty()) {
            return jdbcTemplate.query(sql, new DrugRowMapper(), "%" + keyword + "%");
        }
        else if (drugTypeName != null && !drugTypeName.isEmpty()) {
            return jdbcTemplate.query(sql, new DrugRowMapper(), drugTypeName);
        }
        else return jdbcTemplate.query(sql, new DrugRowMapper());  // Lấy toàn bộ danh sách nếu cả keyword và drugTypeName đều null hoặc rỗng
    }


    @Override
    public int getPriceByDrugId(int drugId) {
        String sql = "SELECT price FROM drugs WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    (rs, rowNum) -> rs.getInt("price"),
                    drugId);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Drug not found for ID: " + drugId);
        }
    }

    public List<String> getAllDrugtypes(){
        String sql = "SELECT distinct drug_type FROM drug";
        return jdbcTemplate.queryForList(sql, String.class);
    }

    // row mapper cho Drug
    public static class DrugRowMapper implements RowMapper<Drug> {
        @Override
        public Drug mapRow(ResultSet rs, int rowNum) throws SQLException {
            Drug drug = new Drug();
            drug.setDrugId(rs.getInt("id"));
            drug.setName(rs.getString("name"));
            drug.setUnit(rs.getString("unit"));
            drug.setPrice(rs.getInt("price"));
            drug.setQuantity(rs.getInt("quantity"));
            drug.setManufactoring_date(rs.getDate("manufacturing_date"));
            drug.setExpiry_date(rs.getDate("expiry_date"));
            drug.setDrugTypeName(rs.getString("drug_type"));
            return drug;
        }
    }

    // row mapper cho drug type
}
