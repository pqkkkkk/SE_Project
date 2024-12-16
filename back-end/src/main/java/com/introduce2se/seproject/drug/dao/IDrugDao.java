package com.introduce2se.seproject.drug.dao;

import com.introduce2se.seproject.drug.model.Drug;


import java.util.List;

public interface IDrugDao {
    // Drug
    public List<Drug> getAllDrugs();
    public Drug getDrugById(int drugId);
    public List<Drug> findDrugs(String keyword, String drugTypeName);
    public int getPriceByDrugId(int drugId); // Lấy giá thuốc theo ID
    public List<String> getAllDrugtypes();
}
