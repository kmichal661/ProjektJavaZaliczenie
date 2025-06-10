import { Button, VStack, Input, Text, Field } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "@/services/AuthenticationContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";

export function Login() {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Logging in with", { email, password });
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const jsonRespone = await response.json();
      console.log("Response from server:", jsonRespone.token);
      if (response.ok) {
        setToken(jsonRespone.token);
        console.log("Login successful, token set.");
        navigation("/"); // Redirect to home page after successful login
      } else {
        console.error("Login failed:", jsonRespone.message);
        toaster.create({
          title: "Wrong username or password",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toaster.create({
        title: "Wrong username or password",
        type: "error",
      });
    }
  };

  return (
    <VStack height={"60vh"} justifyContent="center">
      <Text fontSize="2xl" fontWeight="bold">
        REAL ESTATE APP
      </Text>
      <br />
      <Text>Please login</Text>
      <br />
      <VStack width={"30vw"} alignItems="center">
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
          <Field.Label>Password</Field.Label>
          <Input
            placeholder="Password"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Field.HelperText>Provide your password</Field.HelperText>
        </Field.Root>
        <Button onClick={handleLogin}>Login</Button>
      </VStack>
      <Text>
        Don't have an account?{" "}
        <NavLink to="/register" style={{ color: "blue" }}>
          Register
        </NavLink>
      </Text>
    </VStack>
  );
}
