import "./App.css";
import { Login, Register, MainView, OfferEntityView } from "./Views";
import { NavBar } from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import { useAuth } from "./services/AuthenticationContext";

function App() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              authenticated ? (
                <MainView />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/:id"
            element={
              authenticated ? (
                <OfferEntityView />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/login"
            element={
              authenticated ? <Navigate to="/" replace={true} /> : <Login />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
