package com.example.VacationManager;


import com.example.VacationManager.controller.Locations;
import com.example.VacationManager.controller.LocationsV2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;


@SpringBootApplication
public class VacationManagerApplication {

	public static void main(String[] args) throws IOException, InterruptedException {
		SpringApplication.run(VacationManagerApplication.class, args);
	}
}
