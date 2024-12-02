package com.introduce2se.seproject.drug.service;

import com.introduce2se.seproject.drug.dao.IDrugDao;
import com.introduce2se.seproject.drug.model.Drug;
import com.introduce2se.seproject.drug.model.DrugType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrugService {
    @Autowired
    private final IDrugDao drugdao;
    public DrugService(IDrugDao drugDao){
        this.drugdao = drugDao;
    }

    public List<Drug> getAllDrugs(){
        return drugdao.getAllDrugs();
    }

    public Drug getDrugById(int id){
        return drugdao.getDrugById(id);
    }

    public List<Drug> findDrugsByKeyword(String keyword){
        return drugdao.findDrugByKeyword(keyword);
    }

    public List<DrugType> getAllDrugType(){
        return drugdao.getAllDrugType();
    }

    public List<Drug> getDrugByType(String DrugTypeName){
        return drugdao.getDrugByType(DrugTypeName);
    }

    public int getPriceByDrugId(int drugId) {
        return drugdao.getPriceByDrugId(drugId);
    }
}
