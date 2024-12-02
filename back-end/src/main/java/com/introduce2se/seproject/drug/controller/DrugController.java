package com.introduce2se.seproject.drug.controller;

import com.introduce2se.seproject.drug.model.Drug;
import com.introduce2se.seproject.drug.model.DrugType;
import com.introduce2se.seproject.drug.service.DrugService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/drugs")

public class DrugController {

    private final DrugService drugService;

    public DrugController(DrugService drugService) {
        this.drugService = drugService;
    }

    @GetMapping("")
    public ResponseEntity<List<Drug>> getAllDrugs() {
        List<Drug> drugs = drugService.getAllDrugs();
        return ResponseEntity.ok(drugs); // HTTP 200 OK với danh sách thuốc
    }
    @GetMapping("/{id}")
    public ResponseEntity<Drug> getDrugById(@PathVariable int id) {
        Drug drug = drugService.getDrugById(id);
        if(drug!=null) {
            return ResponseEntity.ok(drug); // HTTP 200 OK
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("search")
    public ResponseEntity<List<Drug>> findDrugByKeyword(@RequestParam String keyword) {
        List<Drug> drugs = drugService.findDrugsByKeyword(keyword);
        if(drugs!=null) {
            return ResponseEntity.ok(drugs);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    // get all the drug type
    @GetMapping("DrugType")
    public ResponseEntity<List<DrugType>> getAllDrugType(){
        List<DrugType> drugTypes = drugService.getAllDrugType();
        return ResponseEntity.ok(drugTypes);
    }

    @GetMapping("/DrugType/{drugTypeName}")
    public ResponseEntity<List<Drug>> findDrugsByType(@PathVariable String drugTypeName){
        List<Drug> drugsByType = drugService.getDrugByType(drugTypeName);
        if(drugsByType!=null) {
            return ResponseEntity.ok(drugsByType);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

}

