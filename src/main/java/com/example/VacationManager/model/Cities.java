package com.example.VacationManager.model;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Cities {
    List<Cities> cities = new ArrayList<>();
    private double[] lnglat;
    private String description;

    public Cities(double[] lnglat, String description) {
        this.lnglat = lnglat;
        this.description = description;
    }

    public Cities() {

    }


    public double[] getLnglat() {
        return lnglat;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return "Location{" +
                "lnglat=" + Arrays.toString(lnglat) +
                ", description='" + description + '\'' +
                '}';
    }

    public void ReadFile() {
        try (BufferedReader br = new BufferedReader(new FileReader("orase.csv"))) {
            String line = br.readLine();
            line = br.readLine();
            String[] lineSplit;
            while (line != null) {
                lineSplit = line.split(",");
                cities.add(new Cities(new double[]{Double.parseDouble(lineSplit[1]), Double.parseDouble(lineSplit[2])}, lineSplit[0]));
                line = br.readLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public List<Cities> coolLocations() {
        return cities;
    };
}
