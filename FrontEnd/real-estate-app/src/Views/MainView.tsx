import { useEffect, useState } from "react";
import { useAuth } from "@/services/AuthenticationContext";
import { type IOffer } from "../components/Interfaces";
import { OfferCard } from "@/components/OfferCard";
import { Text, Stack } from "@chakra-ui/react";
import { NewOfferDialog } from "@/components/NewOfferDialog";

export function MainView() {
  const { token } = useAuth();
  const [data, setData] = useState<IOffer[] | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/offers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: IOffer[] = await response.json();
      console.log("Data fetched successfully:", data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const offersList = data.map((offer: IOffer) => (
    <OfferCard
      key={offer.id}
      description={offer.description}
      price={offer.price}
      title={offer.title}
      id={offer.id}
      address={offer.address}
      images={offer.images}
      onDelete={fetchData} // Pass the refetch function as a prop
    />
  ));

  return (
    <>
      <NewOfferDialog onOfferCreated={fetchData} />
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        See our amazing offers
      </Text>
      {offersList.length ? (
        <Stack gap="4" direction="row" wrap="wrap">
          {offersList}
        </Stack>
      ) : (
        <Text>No offers available at the moment.</Text>
      )}
    </>
  );
}
