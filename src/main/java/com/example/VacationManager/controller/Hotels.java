package com.example.VacationManager.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
    @Controller
    public class Hotels{
        public String name;
        public String price;
        public String longitude;
        public String latitude;
        public String URL;
        public String PhotoURL;
        public static List<Hotels> hotelsList = new ArrayList<>();

        public Hotels(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public String getPrice() {
            return price + "€";
        }

        public String getLongitude() {
            return longitude;
        }

        public String getLatitude() {
            return latitude;
        }

        public String getURL() {
            return URL;
        }

        public String getPhotoURL() {
            return PhotoURL;
        }

        public Hotels(String name, String price, String longitude, String latitude, String URL, String photoURL) {
            this.name = name;
            this.price = price;
            this.longitude = longitude;
            this.latitude = latitude;
            this.URL = URL;
            PhotoURL = photoURL;
        }

        public Hotels() {
        }

        public List<Hotels> returnHotels(String city) throws IOException, InterruptedException {
            double[] lnglat = new double[2];
            MapController controller = new MapController();
            for (int i = 0; i <controller.coolLocations().size(); i++) {
                if(controller.coolLocations().get(i).getDescription().equals(city)){
                    lnglat = controller.coolLocations().get(i).getLnglat();
                }
            }
            /*
            HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=popularity&adults_number=2&units=metric&room_number=1&checkout_date=2022-11-15&filter_by_currency=RON&locale=en-gb&checkin_date=2022-11-12&latitude="+lnglat[1]+"&longitude="+lnglat[0]))
				.header("X-RapidAPI-Key", "1fb99e2302msh01a84d95d59109cp1cc453jsn32731c716e00")
				.header("X-RapidAPI-Host", "booking-com.p.rapidapi.com")
				.method("GET", HttpRequest.BodyPublishers.noBody())
				.build();
		    HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
             */
            String content = new String(Files.readAllBytes(Paths.get("test.txt")));
            String[] datasplit = content.split("\"");
            String url = "";
            String hotel_name = "";
            String latitude = "";
            String longitude = "";
            String gross_price= "";
            String main_photo_url= "";
            for (int i = 0; i < datasplit.length; i++) {
                if (datasplit[i].equals("url")) url = datasplit[i+2];
                if (datasplit[i].equals("hotel_name")) hotel_name = datasplit[i+2];
                if (datasplit[i].equals("latitude")) latitude = datasplit[i+1].substring(1).replace(',',' ');
                if (datasplit[i].equals("longitude")) longitude = datasplit[i+1].substring(1).replace(',',' ');
                if ((datasplit[i].equals("gross_amount_hotel_currency") && datasplit[i+1].equals(":{") && datasplit[i+2].equals("value"))) gross_price = datasplit[i+3].substring(1).replace('}',' ').replace(',',' ');
                if ((datasplit[i].equals("gross_amount_hotel_currency") && datasplit[i+1].equals(":{") && datasplit[i+2].equals("currency") && datasplit[i+3].equals(":") && datasplit[i+4].equals("EUR")&& datasplit[i+5].equals(",") && datasplit[i+6].equals("value"))) gross_price = datasplit[i+7].substring(1).replace('}',' ').replace(',',' ');
                if (datasplit[i].equals("max_photo_url")) main_photo_url = datasplit[i+2];
                if(datasplit[i].equals("max_1440_photo_url"))hotelsList.add(new Hotels(hotel_name, gross_price, longitude, latitude, url, main_photo_url));
            }
            hotelsList.forEach(System.out::println);
            System.out.println(city);
            return hotelsList;
        }
        @Override
        public String toString() {
            return "Hotels{" +
                    "name='" + name + '\'' +
                    ", price='" + price + '\'' +
                    ", longitude='" + longitude + '\'' +
                    ", latitude='" + latitude + '\'' +
                    ", URL='" + URL + '\'' +
                    ", PhotoURL='" + PhotoURL + '\'' +
                    '}';
        }

    }

