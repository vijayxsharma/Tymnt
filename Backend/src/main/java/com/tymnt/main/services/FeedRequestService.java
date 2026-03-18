package com.tymnt.main.services;

import com.tymnt.main.entities.FeedRequest;
import com.tymnt.main.repositories.FeedRepository;

public class FeedRequestService {
	
	private FeedRepository repositorty;
	
	public FeedRequest saveRequest(FeedRequest request) {
		return repositorty.save(request);
	}

}
