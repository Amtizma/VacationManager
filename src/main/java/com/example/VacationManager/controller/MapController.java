package com.example.VacationManager.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Controller
public class MapController {
    Hotels hotels = new Hotels();
    Locations locations = new Locations();
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

    }
    public List<Location> coolLocations() {
        return List.of(
                new Location(new double[]{2.349014, 48.864716}, "Paris"),
                new Location(new double[]{2.173504, 41.403706}, "Barcelona"),
                new Location(new double[]{-0.118092, 51.509865}, "London"),
                new Location(new double[]{13.404954, 52.520008}, "Berlin"),
                new Location(new double[]{12.496366, 41.902782}, "Rome"),
                new Location(new double[]{16.363449, 48.210033}, "Vienna"),
                new Location(new double[]{21.017532, 52.237049}, "Warsaw"),
                new Location(new double[]{37.395744, 55.644466}, "Moscow"),
                new Location(new double[]{26.096306, 44.439663}, "Bucharest"),
                new Location(new double[]{19.040236, 47.497913}, "Budapest"),
                new Location(new double[]{4.351721, 50.85034}, "Brussels"),
                new Location(new double[]{14.418540, 50.073658}, "Prague"),
                new Location(new double[]{12.568337, 55.676098}, "Copenhagen"),
                new Location(new double[]{-73.935242, 40.730610}, "New York")
        );
    }
    @Value("${tomtom.apikey}")
    private String tomTomApiKey;

    @GetMapping("/")
    public String sendReport(@RequestParam(value = "cityName", required = false) String cityName,
                                   @RequestParam(value = "startDate", required = false) String startDate,
                                   @RequestParam(value = "endDate", required = false) String endDate,
                                   @RequestParam(value = "nrofppl", required = false) String nrofppl,
                                   @RequestParam(value = "nrofrooms", required = false) String nrofrooms,
                                   Model model) throws IOException, InterruptedException {
        model.addAttribute("apikey", tomTomApiKey);
        model.addAttribute("coolLocations", coolLocations());
        double[] lnglat = new double[2];

            for (int i = 0; i < coolLocations().size(); i++) {
                if (coolLocations().get(i).description.equals(cityName)) lnglat = coolLocations().get(i).lnglat;
            }

        model.addAttribute("location", locations.getLocations(lnglat));
        model.addAttribute("locationsList", Locations.locationsList);
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