package com.example.VacationManager.controller;

import org.springframework.stereotype.Controller;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class Locations {
    double[] lnglat;
    String name;
    public static List<Locations> locationsList = new ArrayList<>();
    public Locations() {
    }

    public Locations(double[] lnglat, String name) {
        this.lnglat = lnglat;
        this.name = name;
    }

    public double[] getLnglat() {
        return lnglat;
    }

    public void setLnglat(double[] lnglat) {
        this.lnglat = lnglat;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Locations> getLocations(double[] lnglat){
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=9999&lon=" + lnglat[0] +"&lat=" + lnglat[1]))
                    .header("X-RapidAPI-Key", "1fb99e2302msh01a84d95d59109cp1cc453jsn32731c716e00")
                    .header("X-RapidAPI-Host", "opentripmap-places-v1.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            String name = "";
            String lng = "123";
            String lat = "123";
            String[] data = response.body().split(":");
            for (int i = 0; i < data.length; i++) {
                if(data[i].equals("\"Point\",\"coordinates\"")) lng = data[i+1].substring(1,  data[i+1].lastIndexOf("]")).substring(0,data[i+1].substring(1,  data[i+1].lastIndexOf("]")).lastIndexOf(","));
                if(data[i].equals("\"Point\",\"coordinates\"")) lat = data[i+1].substring(1,  data[i+1].lastIndexOf("]")).substring(data[i+1].substring(0,  data[i+1].lastIndexOf("]")).lastIndexOf(","));
                if(data[i].equals("{\"xid\"")) name = data[i+2].substring(1, data[i+2].lastIndexOf(",")-1);
                if(data[i].equals("{\"type\"")) locationsList.add(new Locations(new double[]{Double.parseDouble(lng), Double.parseDouble(lat)}, name));
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        locationsList.remove(0);
        locationsList.remove(0);
        locationsList.remove(0);
        return locationsList;
    }

    @Override
    public String toString() {
        return "Locations{" +
                "lnglat=" + Arrays.toString(lnglat) +
                ", name='" + name + '\'' +
                '}';
    }
}
