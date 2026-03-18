package com.tymnt.main.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tymnt.main.entities.User;
import com.tymnt.main.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	 
	// REGISTER
	public void register(User user) {
		if(userRepository.existsByEmail(user.getEmail())) {
			throw new RuntimeException("Email already registred");
		}
		userRepository.save(user);
	}
	
	//LOGIN
	public User login(String email, String password) {
		User user = userRepository.findByEmail(email);
		
		if(user == null) {
			throw new RuntimeException("User not found");
		}
		
		if(!user.getPassword().equals(password)) {
			throw new RuntimeException("Invalid Password");
		}
				
		return user;
	}
	
	// FTECH USERS
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	

}
