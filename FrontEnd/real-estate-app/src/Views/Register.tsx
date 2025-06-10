import { Button, VStack, Input, Text, Field } from "@chakra-ui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const navigation = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("Registering with", { email, password, name, username });
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, username }),
      });

      const jsonResponse = await response.json();
      console.log("Response from server:", jsonResponse);
      if (response.ok) {
        console.log("Registration successful");
        navigation("/login");
      } else {
        console.error("Registration failed:", jsonResponse.message);
        toaster.create({
          title: "Failed to register",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toaster.create({
        title: "Failed to register",
        type: "error",
      });
    }
  };

  return (
    <VStack height={"80vh"} justifyContent="center">
      <Text fontSize="2xl" fontWeight="bold">
        REAL ESTATE APP
      </Text>
      <br />
      <Text>Please register</Text>
      <br />
      <VStack width={"30vw"} alignItems="center">
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input
            placeholder="Username"
            onChange={(e: any) => setUsername(e.target.value)}
          />
          <Field.HelperText>Provide your username</Field.HelperText>
        </Field.Root>
        <br />
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            placeholder="Email"
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Field.HelperText>Provide your email address</Field.HelperText>
        </Field.Root>
        <br />
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input
            placeholder="Name"
            onChange={(e: any) => setName(e.target.value)}
          />
          <Field.HelperText>Provide your name</Field.HelperText>
        </Field.Root>
        <br />
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input
            placeholder="Password"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Field.HelperText>Provide your password</Field.HelperText>
        </Field.Root>
        <Button onClick={handleSubmit}>Register</Button>
      </VStack>
      <Text>
        Already have an accont?{" "}
        <NavLink to="/login" style={{ color: "blue" }}>
          Login
        </NavLink>
      </Text>
    </VStack>
  );
}
