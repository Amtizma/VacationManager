package com.example.VacationManager;


import com.example.VacationManager.controller.Hotels;
import com.example.VacationManager.controller.MapController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Map;


@SpringBootApplication
public class VacationManagerApplication {

	public static void main(String[] args) throws IOException, InterruptedException {
		SpringApplication.run(VacationManagerApplication.class, args);
	}

}
