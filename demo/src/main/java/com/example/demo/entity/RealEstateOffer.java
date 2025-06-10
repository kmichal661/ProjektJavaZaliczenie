package com.example.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "real_estate_offers")
public class RealEstateOffer {

    @OneToMany(mappedBy = "offer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RealEstateImage> images = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private BigDecimal price;

    private String address;

    private Integer numberOfBedrooms;

    private Integer numberOfBathrooms;

    private Double squareMeters;

    private LocalDateTime listingDate;

    private String phoneNumber; // New field

    // Constructors
    public RealEstateOffer() {
    }

    public RealEstateOffer(String title, String description, BigDecimal price, String address, Integer numberOfBedrooms, Integer numberOfBathrooms, Double squareMeters, LocalDateTime listingDate, String phoneNumber) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.address = address;
        this.numberOfBedrooms = numberOfBedrooms;
        this.numberOfBathrooms = numberOfBathrooms;
        this.squareMeters = squareMeters;
        this.listingDate = listingDate;
        this.phoneNumber = phoneNumber;
    }

    // Getters and Setters

    public List<RealEstateImage> getImages() {
        return images;
    }

    public void setImages(List<RealEstateImage> images) {
        this.images = images;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getNumberOfBedrooms() {
        return numberOfBedrooms;
    }

    public void setNumberOfBedrooms(Integer numberOfBedrooms) {
        this.numberOfBedrooms = numberOfBedrooms;
    }

    public Integer getNumberOfBathrooms() {
        return numberOfBathrooms;
    }

    public void setNumberOfBathrooms(Integer numberOfBathrooms) {
        this.numberOfBathrooms = numberOfBathrooms;
    }

    public Double getSquareMeters() {
        return squareMeters;
    }

    public void setSquareMeters(Double squareMeters) {
        this.squareMeters = squareMeters;
    }

    public LocalDateTime getListingDate() {
        return listingDate;
    }

    public void setListingDate(LocalDateTime listingDate) {
        this.listingDate = listingDate;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}