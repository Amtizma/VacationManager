package com.example.VacationManager.controller;

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
    Hotels hotels = new Hotels();
    Locations locations = new Locations();
    List<Location> cities = new ArrayList<>();

    public static class Location {
        private final double[] lnglat;
        private final String description;
        public Location(double[] lnglat, String description) {
            this.lnglat = lnglat;
            this.description = description;
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
    }
    public void ReadFile(){
        try(BufferedReader br = new BufferedReader(new FileReader("orase.csv"))){
            String line = br.readLine();
            line = br.readLine();
            String[] lineSplit;
            while(line != null){
                lineSplit = line.split(",");
                cities.add(new Location(new double[]{Double.parseDouble(lineSplit[1]), Double.parseDouble(lineSplit[2])}, lineSplit[0]));
                line = br.readLine();
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    public List<Location> coolLocations() {
        return cities;
    };
    @Value("${tomtom.apikey}")
    private String tomTomApiKey;

    @GetMapping("/")
    public String sendReport(@RequestParam(value = "cityName", required = false) String cityName,
                                   @RequestParam(value = "startDate", required = false) String startDate,
                                   @RequestParam(value = "endDate", required = false) String endDate,
                                   @RequestParam(value = "nrofppl", required = false) String nrofppl,
                                   @RequestParam(value = "nrofrooms", required = false) String nrofrooms,
                                   Model model) throws IOException, InterruptedException {
        ReadFile();
        model.addAttribute("apikey", tomTomApiKey);
        model.addAttribute("coolLocations", coolLocations());
        double[] lnglat = new double[2];

            for (int i = 0; i < coolLocations().size(); i++) {
                if (coolLocations().get(i).description.equals(cityName)) lnglat = coolLocations().get(i).lnglat;
            }

       // model.addAttribute("location", locations.getLocations(lnglat));
       // model.addAttribute("locationsList", Locations.locationsList);
        model.addAttribute("hotelList", Hotels.hotelsList);
        model.addAttribute("cityName", cityName);
        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);
        model.addAttribute("nrofppl", nrofppl);
        model.addAttribute("nrofrooms", nrofrooms);
        model.addAttribute("returnHotels", hotels.returnHotels(cityName, startDate, endDate, nrofrooms, nrofppl));
       return "home";
    }


}