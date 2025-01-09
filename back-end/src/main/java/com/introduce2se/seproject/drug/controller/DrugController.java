package com.introduce2se.seproject.drug.controller;

import com.introduce2se.seproject.drug.model.Drug;
import com.introduce2se.seproject.drug.service.DrugService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drugs")
public class DrugController {

    private final DrugService drugService;

    public DrugController(DrugService drugService) {
        this.drugService = drugService;
    }
    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Integer> createDrug(@RequestBody Drug drug) {
        boolean result = drugService.createDrug(drug);
        if(result) {
            return ResponseEntity.ok().body(1);
        }
        else {
            return ResponseEntity.badRequest().body(0);
        }
    }
    @PutMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Integer> updateDrug(@RequestBody Drug drug) {
        boolean result = drugService.updateDrug(drug);
        if(result) {
            return ResponseEntity.ok().body(1);
        }
        else {
            return ResponseEntity.badRequest().body(0);
        }
    }
    @GetMapping("")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Drug>> getAllDrugs() {
        List<Drug> drugs = drugService.getAllDrugs();
        return ResponseEntity.ok(drugs);
    }
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
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
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Drug>> findDrugs(@RequestParam String keyword, @RequestParam String type) {
        List<Drug> drugs = drugService.findDrugs(keyword, type);
        if(drugs!=null) {
            return ResponseEntity.ok(drugs);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/DrugType")
    @CrossOrigin(origins = "http://localhost:3000")
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

