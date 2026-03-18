package com.tymnt.main.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173","http://192.168.31.189:5173","http://10.20.18.108:5173","http://10.132.112.108:5173"}, allowCredentials = "true")
public class AdminController {
	
	@PostMapping("/login")
	public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> loginData, HttpSession session){
		String email = loginData.get("email");
		String password = loginData.get("password");
		
		if(email.equals("vijay@gmail.com") && password.equals("Vikash@#@1")) {
			session.setAttribute("admin", email);
			return ResponseEntity.ok("Login Successful");
		}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		}
	}
	
	// CHECK SESSION
	@GetMapping("/checkSession")
	public ResponseEntity<?> checkAdminSession(HttpSession session){
		Object admin = session.getAttribute("admin");
		if(admin!=null) {
			return ResponseEntity.ok("Session Active");
		}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session Expired. Please login Again.");
		}
	}
	
	// LOGOUT
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session){
		session.invalidate();
		return ResponseEntity.ok("Logged out Successfully");
	}

}
