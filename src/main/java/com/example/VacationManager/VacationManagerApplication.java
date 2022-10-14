package com.example.VacationManager;


import com.example.VacationManager.controller.Hotels;
import jdk.internal.access.JavaNetUriAccess;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;


@SpringBootApplication
public class VacationManagerApplication {

	public static void main(String[] args) throws IOException, InterruptedException {
		SpringApplication.run(VacationManagerApplication.class, args);
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=popularity&adults_number=2&units=metric&room_number=1&checkout_date=2022-11-15&filter_by_currency=RON&locale=en-gb&checkin_date=2022-11-12&latitude=48.210033&longitude=16.363449"))
				.header("X-RapidAPI-Key", "1fb99e2302msh01a84d95d59109cp1cc453jsn32731c716e00")
				.header("X-RapidAPI-Host", "booking-com.p.rapidapi.com")
				.method("GET", HttpRequest.BodyPublishers.noBody())
				.build();
		HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		Hotels hot = new Hotels();
		hot.returnHotels(response.body());


	}

}
