package com.introduce2se.seproject.account.rowmapper;

import com.introduce2se.seproject.account.model.Management;
import com.introduce2se.seproject.account.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ManagementRowMapper implements RowMapper<Management> {
    @Override
    public Management mapRow(ResultSet rs, int rowNum) throws SQLException {
        Management management = new Management();
        management.setId(rs.getInt("id"));
        management.setDoctorId(rs.getInt("doctor_id"));
        management.setPatientId(rs.getInt("patient_id"));
        return management;
    }
}
