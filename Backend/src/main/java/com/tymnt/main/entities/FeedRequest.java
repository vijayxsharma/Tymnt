package com.tymnt.main.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "Emo_support_requests")
public class FeedRequest {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String name;
	
	@Column
	private String category;
	
	@Column
	private String description;
	
	@Column
	private String image;
	
	@Column
	private String status;
	
	@Column
	private Integer helpingCost;
	
	@Column
	private Long sessionStartTime;
	
	@Column
	private Long finalSeconds;

	@Column
	private Double finalAmount;
	
	@Column
	private String acceptedBy;
	
	@Column
	private Long createdAt;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getHelpingCost() {
		return helpingCost;
	}
	public void setHelpingCost(Integer helpingCost) {
		this.helpingCost = helpingCost;
	}
	public Long getSessionStartTime() {
		return sessionStartTime;
	}
	public void setSessionStartTime(Long sessionStartTime) {
		this.sessionStartTime = sessionStartTime;
	}
	public Long getFinalSeconds() {
		return finalSeconds;
	}
	public void setFinalSeconds(Long finalSeconds) {
		this.finalSeconds = finalSeconds;
	}
	public Double getFinalAmount() {
		return finalAmount;
	}
	public void setFinalAmount(Double finalAmount) {
		this.finalAmount = finalAmount;
	}
	public String getAcceptedBy() {
		return acceptedBy;
	}
	public void setAcceptedBy(String acceptedBy) {
		this.acceptedBy = acceptedBy;
	}
	public Long getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Long createdAt) {
		this.createdAt = createdAt;
	}
	
	
	

}
