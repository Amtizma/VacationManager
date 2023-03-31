package com.example.VacationManager.model;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Cities {
    private double[] lnglat;
    private String name;

    public Cities(double[] lnglat, String name) {
        this.lnglat = lnglat;
        this.name = name;
    }

    public Cities() {

    }


    public double[] getLnglat() {
        return lnglat;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Location{" +
                "lnglat=" + Arrays.toString(lnglat) +
                ", name='" + name + '\'' +
                '}';
    }

    public List<Cities> ReadFile() {
        List<Cities> cities = new ArrayList<>();
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
        return cities;
    }
}
