package com.tymnt.main.dto;

public class RequestStatusUpdate {
	
	private String status;
	private String acceptedBy;
	
	public RequestStatusUpdate() {}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAcceptedBy() {
		return acceptedBy;
	}

	public void setAcceptedBy(String acceptedBy) {
		this.acceptedBy = acceptedBy;
	}
	
	

}
