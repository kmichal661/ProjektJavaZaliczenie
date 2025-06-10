import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Input,
  Field,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useAuth } from "@/services/AuthenticationContext";

export function NewOfferDialog({
  onOfferCreated,
}: {
  onOfferCreated: () => void;
}) {
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      address: "",
      listingDate: "",
      numberOfBathrooms: 0,
      numberOfBedrooms: 0,
      squareMeters: 0,
      phoneNumber: "",
      images: [] as File[],
    },
    onSubmit: async (values) => {
      try {
        // Step 1: Create the offer using JSON body
        const offerResponse = await fetch("http://localhost:8080/offers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            price: values.price,
            address: values.address,
            listingDate: new Date(values.listingDate).toISOString(),
            numberOfBathrooms: values.numberOfBathrooms,
            numberOfBedrooms: values.numberOfBedrooms,
            squareMeters: values.squareMeters,
            phoneNumber: values.phoneNumber,
          }),
        });

        if (!offerResponse.ok) {
          console.error("Failed to create offer");
          return;
        }

        const offerData = await offerResponse.json();
        const offerId = offerData.id; // Extract the ID from the response

        console.log("Offer created successfully with ID:", offerId);

        // Step 2: Upload images using FormData
        const formData = new FormData();
        values.images.forEach((image) => formData.append("files", image));

        const imageUploadResponse = await fetch(
          `http://localhost:8080/offers/${offerId}/upload-images`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (imageUploadResponse.ok) {
          console.log("Images uploaded successfully!");
        } else {
          console.error("Failed to upload images");
        }
      } catch (error) {
        console.error("Error submitting offer:", error);
      }
      onOfferCreated(); // Call the callback to refetch data
    },
  });

  return (
    <Dialog.Root key={"md"} size={"md"}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size={"md"}>
          Add new offer
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add new offer</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={formik.handleSubmit}>
                <VStack gap="4" alignItems="stretch">
                  <Field.Root>
                    <Field.Label>
                      <Text>Title</Text>
                    </Field.Label>
                    <Input
                      name="title"
                      placeholder="Enter title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      <Text>Description</Text>
                    </Field.Label>
                    <Input
                      name="description"
                      placeholder="Enter description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      <Text>Price</Text>
                    </Field.Label>
                    <Input
                      name="price"
                      type="number"
                      placeholder="Enter price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      <Text>Address</Text>
                    </Field.Label>
                    <Input
                      name="address"
                      placeholder="Enter address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      <Text>Listing Date</Text>
                    </Field.Label>
                    <Input
                      name="listingDate"
                      type="date"
                      placeholder="Enter listing date"
                      value={formik.values.listingDate}
                      onChange={formik.handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      <Text>Number of Bathrooms</Text>
                    </Field.Label>
                    <Input
                      name="numberOfBathrooms"
                      type="number"
                      placeholder="Enter number of bathrooms"
                      value={formik.values.numberOfBathrooms}
                      onChange={formik.handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      <Text>Number of Bedrooms</Text>
                    </Field.Label>
                    <Input
                      name="numberOfBedrooms"
                      type="number"
                      placeholder="Enter number of bedrooms"
                      value={formik.values.numberOfBedrooms}
                      onChange={formik.handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      <Text>Square Meters</Text>
                    </Field.Label>
                    <Input
                      name="squareMeters"
                      type="number"
                      placeholder="Enter square meters"
                      value={formik.values.squareMeters}
                      onChange={formik.handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      <Text>Phone number</Text>
                    </Field.Label>
                    <Input
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      <Text>Images</Text>
                    </Field.Label>
                    <Input
                      name="images"
                      type="file"
                      multiple
                      onChange={(event) => {
                        const files = event.currentTarget.files;
                        if (files) {
                          formik.setFieldValue(
                            "images",
                            Array.from(files) as File[]
                          );
                        }
                      }}
                    />
                  </Field.Root>
                </VStack>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button type="submit">Save</Button>
                </Dialog.Footer>
              </form>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
