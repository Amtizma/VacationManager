package com.example.VacationManager.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@Controller
public class MapController {
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
                new Location(new double[]{2.154007, 41.390205}, "Barcelona"),
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
                new Location(new double[]{12.568337, 55.676098}, "Copenhagen")
        );
    }
    @Value("${tomtom.apikey}")
    private String tomTomApiKey;

    @GetMapping("/")
    public String homePage(Model model) throws IOException, InterruptedException {
        model.addAttribute("apikey", tomTomApiKey);
        model.addAttribute("coolLocations", coolLocations());
        model.addAttribute("hotelList", Hotels.hotelsList);
        model.addAttribute("returnHotels", new Hotels().returnHotels(new City().getCity()));
        return "home";
    }


}