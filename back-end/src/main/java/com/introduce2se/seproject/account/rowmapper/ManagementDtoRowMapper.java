package com.introduce2se.seproject.account.rowmapper;

import com.introduce2se.seproject.account.dto.ManagementDto;
import com.introduce2se.seproject.account.model.Management;
import com.introduce2se.seproject.account.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ManagementDtoRowMapper implements RowMapper<ManagementDto> {
    @Override
    public ManagementDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        ManagementDto managementDto = new ManagementDto();
        Management management = new Management();
        User opponent = new User();
        management.setId(rs.getInt("id"));
        management.setDoctorId(rs.getInt("doctor_id"));
        management.setPatientId(rs.getInt("patient_id"));
        opponent.setId(rs.getInt("opponent_id"));
        opponent.setFullName(rs.getString("full_name"));
        opponent.setUserRole(rs.getString("role"));
        opponent.setEmail(rs.getString("email"));
        opponent.setPhoneNumber(rs.getString("phone_number"));
        opponent.setAddress(rs.getString("address"));
        opponent.setBirthDay(rs.getDate("birthday"));
        managementDto.setManagement(management);
        managementDto.setOpponent(opponent);

        return managementDto;
    }
}
