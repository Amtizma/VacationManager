package com.example.VacationManager.model;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Cities {
    private double lng;
    private double lat;
    private String name;

    public Cities(double lng, double lat, String name) {
        this.lng = lng;
        this.lat = lat;
        this.name = name;
    }

    public Cities() {

    }


    public double getLng() {
        return lng;
    }
    public double getLat() {
        return lat;
    }

    public String getName() {
        return name;
    }


    public List<Cities> ReadFile() {
        List<Cities> cities = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader("orase.csv"))) {
            String line = br.readLine();
            line = br.readLine();
            String[] lineSplit;
            while (line != null) {
                lineSplit = line.split(",");
                cities.add(new Cities(Double.parseDouble(lineSplit[1]), Double.parseDouble(lineSplit[2]), lineSplit[0]));
                line = br.readLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cities;
    }
}
