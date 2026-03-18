package com.tymnt.main.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tymnt.main.dto.RequestStatusUpdate;
import com.tymnt.main.entities.FeedRequest;
import com.tymnt.main.repositories.FeedRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:5173","http://10.20.18.108:5173","http://192.168.31.189:5173","http://10.132.112.108:5173"})
public class FeedController {

    @Autowired
    private FeedRepository repository;

 // ================= CREATE =================
    @PostMapping("/api/requests")
    public ResponseEntity<FeedRequest> createRequest(
            @RequestBody FeedRequest request) {
    	request.setStatus("active");
    	request.setCreatedAt(System.currentTimeMillis());

        FeedRequest saved = repository.save(request);
        return ResponseEntity.ok(saved);
    }

 // ================= FETCH =================
    @GetMapping("/api/requests")
    public ResponseEntity<List<FeedRequest>> getAllRequests() {

        List<FeedRequest> list =
                repository.findAll(Sort.by(Sort.Direction.DESC, "id"));

        return ResponseEntity.ok(list);
    }
    
 // ================= DELETE =================
    @DeleteMapping("/api/requests/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id){
    	repository.deleteById(id);
    	return ResponseEntity.ok().build();
    }
    
    @GetMapping("/api/requests/user/{username}")
    public ResponseEntity<List<FeedRequest>> getUserRequest(@PathVariable String username){
    	List<FeedRequest> userRequests = repository.findByAcceptedBy(username);
    	
    	return ResponseEntity.ok(userRequests);
    }
    
 // ================= UPDATE STATUS =================
    @PutMapping("/api/requests/{id}/status")
    public ResponseEntity<FeedRequest> updateStatus(@PathVariable Long id, @RequestBody RequestStatusUpdate updatedRequest){
    	return repository.findById(id).map(request ->{
    		
    		String newStatus = updatedRequest.getStatus();
    		request.setStatus(newStatus);
    		     
    		if ("pending".equals(newStatus) && request.getAcceptedBy() == null) {
    		    request.setAcceptedBy(updatedRequest.getAcceptedBy());
    		}
    		
    		if ("executing".equals(newStatus)) {
    		            request.setSessionStartTime(System.currentTimeMillis());
    		}

    		if ("completed".equals(newStatus)) {

    		      if (request.getSessionStartTime() != null) {

    		                long now = System.currentTimeMillis();
    		                long secondsSpent =
    		                        (now - request.getSessionStartTime()) / 1000;

    		                request.setFinalSeconds(secondsSpent);

    		                double totalAmount =
    		                        request.getHelpingCost() * (secondsSpent / 3600.0);

    		                request.setFinalAmount(totalAmount);

    		                request.setSessionStartTime(null);
    		      }
    		 }
    		        // Optional: clear start time when finished
//    		        if ("active".equals(newStatus) || "pending".equals(newStatus)) {
//    		            request.setSessionStartTime(null);
//    		        }

    		     
    		     FeedRequest saved = repository.save(request);
    		     return ResponseEntity.ok(saved);
    	})
    			.orElse(ResponseEntity.notFound().build());
    }
    
}
