package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "real_estate_images")
public class RealEstateImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url; // File path

    private String fileName; // File name

    @ManyToOne
    @JoinColumn(name = "offer_id", nullable = false)
    @JsonIgnore
    private RealEstateOffer offer;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public RealEstateOffer getOffer() {
        return offer;
    }

    public void setOffer(RealEstateOffer offer) {
        this.offer = offer;
    }
}