package com.tymnt.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tymnt.main.dto.UserLoginRequest;
import com.tymnt.main.entities.User;
import com.tymnt.main.repositories.UserRepository;
import com.tymnt.main.services.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173","http://192.168.31.189:5173","http://10.20.18.108:5173","http://10.132.112.108:5173"},allowCredentials = "true")
public class UserController {

    private final UserRepository userRepository;
	
	@Autowired
	private UserService userService;

    UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
	
    
    // Register
	@PostMapping("/register")
	public ResponseEntity<String> register (@RequestBody User user){
		userRepository.save(user);
		return ResponseEntity.ok("Register successfully");
	}
	
//	 Login - session created 
	@PostMapping("/login")
	public ResponseEntity<?> login (@RequestBody UserLoginRequest request, HttpSession session ){
		User user = userService.login(
				request.getEmail(),
				request.getPassword()
				);
		session.setAttribute("LOGGED_USER", user);
		return ResponseEntity.ok(user);
	}
	
	// CHECK SESSION
	@GetMapping("/me")
	public ResponseEntity<?> getLoggedUser(HttpSession session){
		User user = (User) session.getAttribute("LOGGED_USER");
		if(user==null) {
			return ResponseEntity.status(401).body("Not logged in");
		}
		return ResponseEntity.ok(user);
	}
	
	// LOGOUT - SESSION DESTROYED
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session){
		session.invalidate();
		return ResponseEntity.ok("Logged out successfully");
	}
	
	//FETCH ALL USERS
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers(){
		return ResponseEntity.ok(userService.getAllUsers());
	}

	// UPDATE USER
	@PutMapping("/users/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updateUser){
		User existingUser = userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
		
		existingUser.setName(updateUser.getName());
		existingUser.setEmail(updateUser.getEmail());
		existingUser.setImage(updateUser.getImage());
		existingUser.setMobile(updateUser.getMobile());
		
		userRepository.save(existingUser);
		
		return ResponseEntity.ok(existingUser);
	}
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id){
		if(!userRepository.existsById(id)){
			return ResponseEntity.status(404).body("User not found");
		}
		
		userRepository.deleteById(id);
		return ResponseEntity.ok("User deleted successfully");
	}
}
