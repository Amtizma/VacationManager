package com.example.VacationManager.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LocationsV2 {
    public List<LocationsV2> locationsV2List = new ArrayList<>();
    double[] lnglat;

    @Override
    public String toString() {
        return "LocationsV2{" +
                "lnglat=" + Arrays.toString(lnglat) +
                ", name='" + name + '\'' +
                '}';
    }

    String name;

    public LocationsV2(double[] lnglat, String name) {
        this.lnglat = lnglat;
        this.name = name;
    }

    public LocationsV2() {
    }

    public void getLocations() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.tomtom.com/search/2/nearbySearch/.json?key=YcVqidf6VruNp3oLRTLiZySFRw9cep1P&lat=41.902782&lon=12.496366&radius=10000&categorySet=7376"))
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
        String name = "";
        String lng = "123";
        String lat = "123";
        String[] data = response.body().split(":");
        for (int i = 0; i < data.length; i++) {
            if(data[i].equals("{\"lat\"")) {
                lat = data[i + 1].substring(0, data[i + 1].lastIndexOf(","));
                lng = data[i + 2].replaceAll("[^0-9]", "");
            }
            if(data[i].equals("{\"name\""))  name = data[i+1].substring(0, data[i+1].lastIndexOf(","));
            if(data[i].equals("[{\"code\"")) locationsV2List.add(new LocationsV2(new double[]{Double.parseDouble(lng), Double.parseDouble(lat)}, name));

        }
        System.out.println(locationsV2List);
    }
    public void getLocations2() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.tomtom.com/search/2/poiCategories.json?key=YcVqidf6VruNp3oLRTLiZySFRw9cep1P"))
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}
