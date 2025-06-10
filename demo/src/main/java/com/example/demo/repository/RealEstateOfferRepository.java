package com.example.demo.repository;

import com.example.demo.entity.RealEstateOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealEstateOfferRepository extends JpaRepository<RealEstateOffer, Long> {
    // Add custom query methods if needed
}