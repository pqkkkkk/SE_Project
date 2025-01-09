package com.introduce2se.seproject.account.dao.user;

import com.introduce2se.seproject.account.model.Doctor;
import com.introduce2se.seproject.account.model.Patient;
import com.introduce2se.seproject.account.model.User;
import com.introduce2se.seproject.account.rowmapper.UserRowMapper;
import org.springframework.context.annotation.Primary;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Repository
@Primary
public class UserSqlDao implements  UserDao {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public UserSqlDao(NamedParameterJdbcTemplate namedParameterJdbcTemplate)
    {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }
    public User getUserByUsername(String username){
        try {
            String sql = "SELECT * FROM users u " +
                    "WHERE u.username = :actualUsername";
            Map<String, Object> params = new HashMap<>();
            params.put("actualUsername", username);
            User user = namedParameterJdbcTemplate.queryForObject(sql, params, new UserRowMapper());
            return user;
        } catch (EmptyResultDataAccessException e) {
            System.out.println("Empty result");
            return null;
        }
    }
    public void createUser(User user){
        String sql = "INSERT INTO users (username, password, email,fullname,phonenumber,address,birthday,role,gender) " +
                "VALUES (:username, :password, :email, :fullname, :phonenumber, :address, :birthday, :role, :gender)";
        Map<String, Object> params = new HashMap<>();
        params.put("username", user.getUserName());
        params.put("password", user.getPassWord());
        params.put("email", user.getEmail());
        params.put("fullname", user.getFullName());
        params.put("phonenumber", user.getPhoneNumber());
        params.put("address", user.getAddress());
        params.put("birthday", user.getBirthDay());
        params.put("role", user.getUserRole());
        params.put("gender", user.getGender());
        namedParameterJdbcTemplate.update(sql, params);
    }
    public ArrayList<User> getAllUsers(String role){
        try {
            String sql = "SELECT * FROM users u " +
                    "WHERE 1=1 ";
            Map<String, Object> params = new HashMap<>();
            if(role != null)
            {
                sql += " AND u.role = :actualRole";
                params.put("actualRole", role);
            }
            ArrayList<User> users = (ArrayList<User>) namedParameterJdbcTemplate.query(sql, params, new UserRowMapper());
            ArrayList<User> result = new ArrayList<User>();

            for(User user : users)
            {
                if(user.getUserRole().equals("doctor")) {
                    String doctorSql = "SELECT * FROM doctor_information d " +
                            "WHERE d.id = :actualDoctorId";
                    Map<String, Object> doctorParams = new HashMap<>();
                    doctorParams.put("actualDoctorId", user.getId());
                    Map<String, Object> doctorInfor = namedParameterJdbcTemplate.queryForMap(doctorSql, doctorParams);
                    Doctor doctor = new Doctor(user, Integer.parseInt(doctorInfor.get("experience_year").toString()), Integer.parseInt(doctorInfor.get("consultation_price").toString()), doctorInfor.get("speciality").toString(), Double.parseDouble(doctorInfor.get("rating").toString()));
                    result.add(doctor);
                }
                else if (user.getUserRole().equals("patient"))
                {
                    Patient patient = new Patient(user, true);
                    result.add(patient);
                }
                else{
                    result.add(user);
                }
            }

            return result;
        }
        catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    @Override
    public User getUserById(int id){
        try {
            String sql = "SELECT * FROM users u " +
                    "WHERE u.id = :actualId";
            Map<String, Object> params = new HashMap<>();
            params.put("actualId", id);
            User user = namedParameterJdbcTemplate.queryForObject(sql, params, new UserRowMapper());
            User result = null;
            if(user.getUserRole().equals("patient"))
            {
                String patientSql = "SELECT * FROM patient_information p " +
                        "WHERE p.id = :actualPatientId";
                Map<String, Object> patientParams = new HashMap<>();
                patientParams.put("actualPatientId", id);
                Map<String, Object> patientInfor = namedParameterJdbcTemplate.queryForMap(patientSql, patientParams);
                Patient patient = new Patient(user, Boolean.parseBoolean(patientInfor.get("health_insurance").toString()));
                result = patient;
            }
            else if (user.getUserRole().equals("doctor"))
            {
                String doctorSql = "SELECT * FROM doctor_information d " +
                        "WHERE d.id = :actualDoctorId";
                Map<String, Object> doctorParams = new HashMap<>();
                doctorParams.put("actualDoctorId", id);
                Map<String, Object> doctorInfor = namedParameterJdbcTemplate.queryForMap(doctorSql, doctorParams);
                Doctor doctor = new Doctor(user, Integer.parseInt(doctorInfor.get("experience_year").toString()), Integer.parseInt(doctorInfor.get("consultation_price").toString()), doctorInfor.get("speciality").toString(),Double.parseDouble(doctorInfor.get("rating").toString()));
                result = doctor;
            }
            else{
                result = user;
            }
            return result;
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    public void addDoctorInformation(Doctor doctor){
        String sql = "INSERT INTO doctor_information (id, experience_year, consultation_price, speciality) " +
                "VALUES (:id, :experience_year, :consultation_price, :speciality)";
        Map<String, Object> params = new HashMap<>();
        params.put("id", doctor.getId());
        params.put("experience_year", doctor.getExperienceYear());
        params.put("consultation_price", doctor.getConsultationPrice());
        params.put("speciality", doctor.getSpeciality());
        namedParameterJdbcTemplate.update(sql, params);
    }
    public void addPatientInformation(Patient patient){

        String sql = "INSERT INTO patient_information (id, health_insurance) " +
                "VALUES (:id, :health_insurance)";
        Map<String, Object> params = new HashMap<>();
        params.put("id", patient.getId());
        params.put("health_insurance", patient.isHealthInsurance());
        namedParameterJdbcTemplate.update(sql, params);
    }

    @Override
    public boolean updateUser(User user) {
        try {
            String sql = "UPDATE users " +
                    "SET username = :username, password = :password, email = :email, fullname = :fullname, " +
                    "phonenumber = :phonenumber, address = :address, birthday = :birthday, role = :role " +
                    "WHERE id = :id";
            Map<String, Object> params = new HashMap<>();
            params.put("username", user.getUserName());
            params.put("password", user.getPassWord());
            params.put("email", user.getEmail());
            params.put("fullname", user.getFullName());
            params.put("phonenumber", user.getPhoneNumber());
            params.put("address", user.getAddress());
            params.put("birthday", user.getBirthDay());
            params.put("role", user.getUserRole());
            params.put("id", user.getId());
            return namedParameterJdbcTemplate.update(sql, params) > 0;
        }
        catch (EmptyResultDataAccessException e) {
            return false;
        }
    }

    @Override
    public boolean updateDoctorInformation(Doctor doctor) {
        try {
            String sql = "UPDATE doctor_information " +
                    "SET experience_year = :experience_year, consultation_price = :consultation_price, speciality = :speciality, " +
                    "rating = :rating " +
                    "WHERE id = :id";
            Map<String, Object> params = new HashMap<>();
            params.put("experience_year", doctor.getExperienceYear());
            params.put("consultation_price", doctor.getConsultationPrice());
            params.put("speciality", doctor.getSpeciality());
            params.put("rating", doctor.getRating());
            params.put("id", doctor.getId());
            return namedParameterJdbcTemplate.update(sql, params) > 0;
        }
        catch (EmptyResultDataAccessException e) {
            return false;
        }
    }

    @Override
    public boolean updatePatientInformation(Patient patient) {
        try {
            String sql = "UPDATE patient_information " +
                    "SET health_insurance = :health_insurance " +
                    "WHERE id = :id";
            Map<String, Object> params = new HashMap<>();
            params.put("health_insurance", patient.isHealthInsurance());
            params.put("id", patient.getId());
            return namedParameterJdbcTemplate.update(sql, params) > 0;
        }
        catch (EmptyResultDataAccessException e) {
            return false;
        }
    }


}
