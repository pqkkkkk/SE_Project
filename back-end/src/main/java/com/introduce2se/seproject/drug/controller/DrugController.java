package com.introduce2se.seproject.drug.controller;

import com.introduce2se.seproject.drug.model.Drug;
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

    // oke
    @GetMapping("/find")
    public ResponseEntity<List<Drug>> findDrugs(@RequestParam String keyword, @RequestParam String type) {
        List<Drug> drugs = drugService.findDrugs(keyword, type);
        if(drugs!=null) {
            return ResponseEntity.ok(drugs);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    // get all the drug type

    //OKE
    @GetMapping("/DrugType")
    public ResponseEntity<List<String>> findDrugsByType(){
        List<String> drugsType = drugService.getALLDrugTypes();
        if(drugsType!=null) {
            return ResponseEntity.ok(drugsType);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

}

