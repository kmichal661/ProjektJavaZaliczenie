import { type IOffer } from "./Interfaces";
import { Button, Card, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/services/AuthenticationContext";

export function OfferCard({
  id,
  description,
  price,
  title,
  images,
  onDelete, // Callback function to refetch data
}: IOffer & { onDelete: () => void }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [_, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/offers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Offer deleted successfully");
        setIsDialogOpen(false); // Close the dialog after successful deletion
        onDelete(); // Trigger refetch in MainView
      } else {
        console.error("Failed to delete offer");
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image
        src={`http://localhost:8080/images/${images?.[0]?.fileName}`}
        alt="Green double couch with wooden legs"
      />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          ${price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button onClick={() => navigate(`/${id}`)} variant="solid">
          View more
        </Button>
        <Button onClick={handleDelete} variant="solid" colorPalette="red">
          Delete
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
