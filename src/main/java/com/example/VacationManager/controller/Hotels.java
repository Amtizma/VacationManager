package com.example.VacationManager.controller;

import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

    public class Hotels{
        private String name;
        private String price;
        private String longitude;
        private String latitude;
        private String URL;
        private String PhotoURL;
        List<Hotels> hotelsList = new ArrayList<>();

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


        public List<Hotels> returnHotels(String data){
            String[] datasplit = data.split("\"");
            String url = "";
            String hotel_name = "";
            String latitude = "";
            String longitude = "";
            String gross_price= "";
            String main_photo_url= "";
            for (int i = 0; i < datasplit.length; i++) {
                if (datasplit[i].equals("url")) url = datasplit[i+2];
                if (datasplit[i].equals("hotel_name")) hotel_name = datasplit[i+2];
                if (datasplit[i].equals("latitude")) latitude = datasplit[i+1].substring(1);
                if (datasplit[i].equals("longitude")) longitude = datasplit[i+1].substring(1);
                if ((datasplit[i].equals("gross_amount_hotel_currency") && datasplit[i+1].equals(":{") && datasplit[i+2].equals("value"))) gross_price = datasplit[i+3].substring(1);
                if ((datasplit[i].equals("gross_amount_hotel_currency") && datasplit[i+1].equals(":{") && datasplit[i+2].equals("currency") && datasplit[i+3].equals(":") && datasplit[i+4].equals("EUR")&& datasplit[i+5].equals(",") && datasplit[i+6].equals("value"))) gross_price = datasplit[i+7].substring(1);
                if (datasplit[i].equals("main_photo_url")) main_photo_url = datasplit[i+2];
                if(datasplit[i].equals("max_1440_photo_url"))hotelsList.add(new Hotels(hotel_name, gross_price, longitude, latitude, url, main_photo_url));
            }
            hotelsList.forEach(System.out::println);
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

