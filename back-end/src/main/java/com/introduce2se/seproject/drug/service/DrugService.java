package com.introduce2se.seproject.drug.service;

import com.introduce2se.seproject.drug.dao.IDrugDao;
import com.introduce2se.seproject.drug.model.Drug;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrugService {

    private final IDrugDao drugdao;
    @Autowired
    public DrugService(IDrugDao drugDao){
        this.drugdao = drugDao;
    }

    public List<Drug> getAllDrugs(){
        return drugdao.getAllDrugs();
    }

    public Drug getDrugById(int id){
        return drugdao.getDrugById(id);
    }

    public List<Drug> findDrugs(String keyword, String type){
        return drugdao.findDrugs(keyword, type);
    }

    public int getPriceByDrugId(int drugId) {
        return drugdao.getPriceByDrugId(drugId);
    }

    public List<String> getALLDrugTypes(){
        return drugdao.getAllDrugtypes();
    }
    public boolean createDrug(Drug drug){
        return drugdao.createDrug(drug);
    }
    public boolean updateDrug(Drug drug){
        return drugdao.updateDrug(drug);
    }
}
