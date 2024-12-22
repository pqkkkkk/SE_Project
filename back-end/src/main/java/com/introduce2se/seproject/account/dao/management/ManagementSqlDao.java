package com.introduce2se.seproject.account.dao.management;

import com.introduce2se.seproject.account.dto.ManagementDto;
import com.introduce2se.seproject.account.rowmapper.ManagementDtoRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ManagementSqlDao implements ManagementDao {
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    @Autowired
    public ManagementSqlDao(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }
    @Override
    public List<ManagementDto> getConnectingUsers(int currentUserId, String currentRole) {
        String sql = "";
        List<ManagementDto> result = null;
        if(currentRole.equals("doctor")) {
            sql = """
                 SELECT u.id as opponent_id , u.fullname as full_name, u.role as role, m.id as id, m.doctor_id as doctor_id, m.patient_id as patient_id
                 FROM management m join users u on m.patient_Id = u.id
                 WHERE doctor_Id = :cui
                 """;
        }
        else if (currentRole.equals("patient")) {
            sql = """
                 SELECT u.id as opponent_id, u.fullname as full_name, u.role as role, m.id as id, m.doctor_id as doctor_id, m.patient_id as patient_id
                 FROM management m join users u on m.doctor_Id = u.id
                 WHERE patient_Id = :cui
                 """;
        }
        Map<String, Object> params = new HashMap<>();
        params.put("cui", currentUserId);

        result = namedParameterJdbcTemplate.query(sql, params, new ManagementDtoRowMapper());
        return result;
    }

}
