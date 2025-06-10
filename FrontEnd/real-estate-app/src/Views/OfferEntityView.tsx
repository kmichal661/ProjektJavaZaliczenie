import { useParams, useNavigate } from "react-router-dom";
import { type IOffer } from "@/components/Interfaces";
import { useEffect, useState } from "react";
import { useAuth } from "@/services/AuthenticationContext";
import {
  Text,
  VStack,
  Box,
  Button,
  Image,
  HStack,
  Stack,
  Table,
  IconButton,
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";

export function OfferEntityView() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();

  const navigate = useNavigate();

  const [phoneNumberVisible, setPhoneNumberVisible] = useState<boolean>(false);
  const [offer, setOffer] = useState<IOffer | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("No ID provided in URL parameters");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/offers/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: IOffer = await response.json();
        console.log("Data fetched successfully:", data);
        setOffer(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, token]);

  if (!offer) {
    return <div>Loading...</div>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      offer.images && prevIndex < offer.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      offer.images && prevIndex > 0
        ? prevIndex - 1
        : (offer.images?.length || 1) - 1
    );
  };

  return (
    <>
      <Stack direction="row" justify="space-between" padding={4}>
        <IconButton onClick={() => navigate("/")} aria-label="Back to offers">
          <IoMdArrowRoundBack />
        </IconButton>
      </Stack>

      <Stack align="center" justify="center">
        <VStack align="center" padding={4}>
          <Box position="relative" alignItems="center">
            {offer.images && offer.images.length > 0 ? (
              <Image
                src={`http://localhost:8080/images/${offer.images[currentImageIndex]?.fileName}`}
                alt={`Offer Image ${currentImageIndex + 1}`}
                rounded="md"
                h="400px"
                w="600px"
                fit="contain"
              />
            ) : (
              <Text>No images available</Text>
            )}
          </Box>

          <VStack marginTop={4}>
            <HStack justify="center">
              <Button onClick={handlePreviousImage}>Prev</Button>
              <Button onClick={handleNextImage}>Next</Button>
            </HStack>
          </VStack>
          <Text fontSize="2xl" fontWeight="bold">
            {offer.title}
          </Text>
          <Text fontSize="md" color="gray.600">
            {offer.description}
          </Text>
          {/* Table for offer details */}
          <Table.Root size="sm" marginTop={4}>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Price</Table.Cell>
                <Table.Cell>${offer.price}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Address</Table.Cell>
                <Table.Cell>{offer.address}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Listing Date</Table.Cell>
                <Table.Cell>{offer.listingDate}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Bedrooms</Table.Cell>
                <Table.Cell>{offer.numberOfBedrooms}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Bathrooms</Table.Cell>
                <Table.Cell>{offer.numberOfBathrooms}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Square Meters</Table.Cell>
                <Table.Cell>{offer.squareMeters}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Phone Number</Table.Cell>
                <Table.Cell>
                  {phoneNumberVisible ? (
                    offer?.phoneNumber
                  ) : (
                    <Button
                      size={"sm"}
                      onClick={() => setPhoneNumberVisible(!phoneNumberVisible)}
                    >
                      Show phone
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </VStack>
      </Stack>
    </>
  );
}
