package com.introduce2se.seproject.drug.dao;

import com.introduce2se.seproject.drug.model.Drug;
import com.introduce2se.seproject.drug.model.DrugType;

import java.util.List;

public interface IDrugDao {
    // Drug
    public List<Drug> getAllDrugs();
    public Drug getDrugById(int drugId);
    public List<Drug> findDrugByKeyword(String keyword);
    public List<Drug> getDrugByType(String DrugTypeName);
    public int getPriceByDrugId(int drugId); // Lấy giá thuốc theo ID

    // Drug Type
    public List<DrugType> getAllDrugType();
}
