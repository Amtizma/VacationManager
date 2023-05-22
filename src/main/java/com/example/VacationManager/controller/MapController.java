package com.example.VacationManager.controller;

import com.example.VacationManager.model.Cities;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class MapController {
    Cities cities = new Cities();

    @Value("${tomtom.apikey}")
    private String tomTomApiKey;

    @GetMapping("/")
    public String sendReport(@RequestParam(value = "cityName", required = false) String cityName,
                                   @RequestParam(value = "startDate", required = false) String startDate,
                                   @RequestParam(value = "endDate", required = false) String endDate,
                                   @RequestParam(value = "nrofppl", required = false) String nrofppl,
                                   @RequestParam(value = "nrofrooms", required = false) String nrofrooms,
                                   Model model) throws IOException, InterruptedException {
        cities.ReadFile();
        model.addAttribute("apikey", tomTomApiKey);
        model.addAttribute("coolLocations", cities.ReadFile());
       return "home";
    }


}