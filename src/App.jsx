import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Hero from "./pages/Hero";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Scooter from "./pages/Scooter";
import Bikes from "./pages/Bikes";
import Pricing from "./pages/Pricing";
import ExploreMap from "./pages/ExploreMap";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
            </>
          }
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/scooters"
          element={<Scooter />}
        />

        <Route
          path="/bikes"
          element={<Bikes />}
        />

        <Route
          path="/pricing"
          element={<Pricing />}
        />

        <Route
          path="/map"
          element={<ExploreMap />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;