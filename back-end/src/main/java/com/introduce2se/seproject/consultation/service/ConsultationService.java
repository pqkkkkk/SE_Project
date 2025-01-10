package com.introduce2se.seproject.consultation.service;

import com.introduce2se.seproject.consultation.dao.ConsultationDao;
import com.introduce2se.seproject.consultation.model.Consultation;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDate;
import java.util.*;

@Service
public class ConsultationService {
    private  static final Map<Integer, String> monthMap = new HashMap<>();
    {
        monthMap.put(1, "January");
        monthMap.put(2, "February");
        monthMap.put(3, "March");
        monthMap.put(4, "April");
        monthMap.put(5, "May");
        monthMap.put(6, "June");
        monthMap.put(7, "July");
        monthMap.put(8, "August");
        monthMap.put(9, "September");
        monthMap.put(10, "October");
        monthMap.put(11, "November");
        monthMap.put(12, "December");
    }
    private static final Map<Integer, String> weekMap = new HashMap<>();
    {
        weekMap.put(1, "First Week");
        weekMap.put(2, "Second Week");
        weekMap.put(3, "Third Week");
        weekMap.put(4, "Fourth Week");
        weekMap.put(5, "Fifth Week");
    }
    private static final Map<Integer, String> dayMap = new HashMap<>();
    {
        dayMap.put(1, "Monday");
        dayMap.put(2, "Tuesday");
        dayMap.put(3, "Wednesday");
        dayMap.put(4, "Thursday");
        dayMap.put(5, "Friday");
        dayMap.put(6, "Saturday");
        dayMap.put(7, "Sunday");
    }
    private final ConsultationDao consultationDao;

    public ConsultationService(ConsultationDao consultationDao) {
        this.consultationDao = consultationDao;
    }

    public List<Consultation> GetAllConsultationsByPatientIdAndDoctorId(int patientId, int doctorId, String status) {
        return consultationDao.GetAllConsultationsByPatientIdAndDoctorId(patientId,doctorId, status);
    }
    public int createConsultation(Consultation consultation){
        return consultationDao.createConsultation(consultation);
    }
    public Consultation getConsultationById(int id) {
        return consultationDao.getConsultationByID(id);
    }
    public int updateStatus(int id, String status) {
        return consultationDao.updateStatus(id, status);
    }
    public int updateConsultation_result(int id, String result){
        return consultationDao.updateConsultation_result(id, result);
    }
    public int deleteConsultation(int id) {
        return consultationDao.deleteConsultation(id);
    }
    public List<Consultation> getFilteredConsultations(String userRole, int userId, String status, LocalDate consultationDate, Time startTime, Time endTime) {
        return consultationDao.GetFilteredConsultations(userRole, userId, status, consultationDate, startTime, endTime);
    }
    public List<Consultation> GetConsultationsInAWeek(String userRole, int userId, String status, LocalDate date) {
        return consultationDao.GetConsultationsInAWeek(userRole, userId, status, date);
    }
    public Consultation GetNextConsultationToday(String userRole, int userId) {
        return consultationDao.GetNextConsultationToday(userRole, userId);
    }
    public int UpdateAllMissedConsultations(String userRole, int userId) {
        int result = consultationDao.UpdateAllMissedConsultation(userRole, userId);
        return result;
    }

    public Map<String, Integer> getPathologyCount(int year,int month, int week) {
        if (week == -1 && month == -1) {
            return consultationDao.getPathologyCountByYear(year);
        } else {
            if (week == -1) {
                return consultationDao.getPathologyCountByMonth(year, month);
            } else {
                return consultationDao.getPathologyCountByWeek(year, month, week);
            }
        }
    }

    public Map<String, Integer> countOnlineConsultation(int year, int month, int week)
    {
        Map<String, Integer> map = new HashMap<>();
            if(week == -1 && month == -1){
                Map<Integer, Integer> rawData = consultationDao.countOnlineConsultationByYear(year);
                for(int i = 1;i<=12;i++){
                    if(!rawData.containsKey(i)){
                        map.put(monthMap.get(i),0);
                    }
                    else{
                        map.put(monthMap.get(i),rawData.get(i));
                    }
                }
                return map;
            }
            else if(week == -1) {
                Map<Integer, Integer> rawData = consultationDao.countOnlineConsultationByMonth(year, month);
                for(int i = 1;i<=5;i++){
                    if(!rawData.containsKey(i)){
                        map.put(weekMap.get(i),0);
                    }
                    else{
                        map.put(weekMap.get(i),rawData.get(i));
                    }
                }
                return map;
            }
            else {
                Map<Integer, Integer> rawData = consultationDao.countOnlineConsultationByWeek(year, month, week);

                for(int i = 1;i<=7;i++){
                    if(!rawData.containsKey(i)){
                        map.put(dayMap.get(i),0);
                    }
                    else {
                        map.put(dayMap.get(i),rawData.get(i));
                    }
                }
                return map;
            }
    };
}
