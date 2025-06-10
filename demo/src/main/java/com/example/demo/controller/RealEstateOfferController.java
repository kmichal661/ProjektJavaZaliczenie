package com.example.demo.controller;

import com.example.demo.entity.RealEstateImage;
import com.example.demo.entity.RealEstateOffer;
import com.example.demo.repository.RealEstateOfferRepository;
import com.example.demo.repository.RealEstateImageRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class RealEstateOfferController {

    @Autowired
    private RealEstateOfferRepository offerRepository;

    @Autowired
    private RealEstateImageRepository imageRepository; 

    @GetMapping("/offers")
    public List<RealEstateOffer> getOffers() {
        return offerRepository.findAll();
    }

    @PostMapping("/offers")
    public RealEstateOffer createOffer(@RequestBody RealEstateOffer offer) {
        return offerRepository.save(offer);
    }

    @GetMapping("/offers/{id}")
    public ResponseEntity<RealEstateOffer> getOfferById(@PathVariable Long id) {
        Optional<RealEstateOffer> offer = offerRepository.findById(id);
        if (offer.isPresent()) {
            return ResponseEntity.ok(offer.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/offers/{id}")
    public RealEstateOffer updateOffer(@PathVariable Long id, @RequestBody RealEstateOffer updatedOffer) {
        Optional<RealEstateOffer> existingOffer = offerRepository.findById(id);
        if (existingOffer.isPresent()) {
            RealEstateOffer offer = existingOffer.get();
            offer.setTitle(updatedOffer.getTitle());
            offer.setDescription(updatedOffer.getDescription());
            offer.setPrice(updatedOffer.getPrice());
            offer.setAddress(updatedOffer.getAddress());
            offer.setNumberOfBedrooms(updatedOffer.getNumberOfBedrooms());
            offer.setNumberOfBathrooms(updatedOffer.getNumberOfBathrooms());
            offer.setSquareMeters(updatedOffer.getSquareMeters());
            offer.setListingDate(updatedOffer.getListingDate());
            return offerRepository.save(offer);
        } else {
            throw new RuntimeException("Offer not found with id: " + id);
        }
    }

    @DeleteMapping("/offers/{id}")
    public void deleteOffer(@PathVariable Long id) {
        offerRepository.deleteById(id);
    }

    @PostMapping("/offers/{id}/images")
    public ResponseEntity<RealEstateImage> addImageToOffer(@PathVariable Long id, @RequestBody RealEstateImage image) {
        Optional<RealEstateOffer> offerOptional = offerRepository.findById(id);
        if (offerOptional.isPresent()) {
            RealEstateOffer offer = offerOptional.get();
            image.setOffer(offer);
            RealEstateImage savedImage = imageRepository.save(image); // Use imageRepository
            return ResponseEntity.status(HttpStatus.CREATED).body(savedImage);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/offers/{id}/images")
    public ResponseEntity<List<RealEstateImage>> getImagesForOffer(@PathVariable Long id) {
        Optional<RealEstateOffer> offerOptional = offerRepository.findById(id);
        if (offerOptional.isPresent()) {
            RealEstateOffer offer = offerOptional.get();
            return ResponseEntity.ok(offer.getImages());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/offers/{id}/upload-images")
    public ResponseEntity<List<RealEstateImage>> uploadImagesToOffer(@PathVariable Long id, @RequestParam("files") List<MultipartFile> files) {
        Optional<RealEstateOffer> offerOptional = offerRepository.findById(id);
        if (offerOptional.isPresent()) {
            RealEstateOffer offer = offerOptional.get();
            List<RealEstateImage> savedImages = new ArrayList<>();
            try {
                // String uploadDir = "C:/uploads/";
                String uploadDir = System.getenv("UPLOAD_DIR");
                if (uploadDir == null || uploadDir.isEmpty()) {
                    // Use a default directory for local development
                    uploadDir = System.getProperty("user.dir") + "/uploads/";
                }
                java.io.File directory = new java.io.File(uploadDir);

                // Create the directory if it doesn't exist
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                for (MultipartFile file : files) {
                    String originalFileName = file.getOriginalFilename();
                    String randomUUID = java.util.UUID.randomUUID().toString();
                    String newFileName = randomUUID + "-" + originalFileName;

                    // Save the image file locally
                    String filePath = uploadDir + newFileName;
                    file.transferTo(new java.io.File(filePath));

                    // Save the file name and file path in the database
                    RealEstateImage image = new RealEstateImage();
                    image.setUrl(filePath);
                    image.setFileName(newFileName);
                    image.setOffer(offer);
                    RealEstateImage savedImage = imageRepository.save(image);
                    savedImages.add(savedImage);
                }

                return ResponseEntity.status(HttpStatus.CREATED).body(savedImages);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<?> serveImage(@PathVariable String filename) {
        try {
            // String uploadDir = "C:/uploads/";
            String uploadDir = System.getenv("UPLOAD_DIR");
            if (uploadDir == null || uploadDir.isEmpty()) {
                // Use a default directory for local development
                uploadDir = System.getProperty("user.dir") + "/uploads/";
            }
            java.io.File file = new java.io.File(uploadDir + filename);

            if (!file.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
            }

            byte[] imageBytes = java.nio.file.Files.readAllBytes(file.toPath());
            return ResponseEntity.ok()
                    .header("Content-Type", "image/jpeg") // Adjust the content type based on your image format
                    .body(imageBytes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error serving image");
        }
    }
}