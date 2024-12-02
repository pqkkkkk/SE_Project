package com.introduce2se.seproject.drug.dao;

import com.introduce2se.seproject.drug.model.Drug;
import com.introduce2se.seproject.drug.model.DrugType;
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

    // find drug by keyword
    @Override
    public List<Drug> findDrugByKeyword(String keyword){
        String sql = "SELECT * from drug where name like ?";
        return jdbcTemplate.query(sql, new DrugRowMapper(),"%" + keyword + "%" );
    }
    @Override
    public List<DrugType> getAllDrugType(){
        String sql = "SELECT * FROM drugtype";
        return jdbcTemplate.query(sql, new DrugTypeRowMapper());
    }
    @Override
    public List<Drug> getDrugByType(String DrugTypeName){
        String sql = "SELECT * FROM drug where drug_type = ?";
        return jdbcTemplate.query(sql,new DrugRowMapper(), DrugTypeName);
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
    public static class DrugTypeRowMapper implements RowMapper<DrugType> {
        @Override
        public DrugType mapRow(ResultSet rs, int rowNum) throws SQLException {
            DrugType drugType = new DrugType();
            drugType.setDrugTypeName(rs.getString("DrugTypeName"));
            return drugType;
        }
    }
}
