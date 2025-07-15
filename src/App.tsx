import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Catalog from "./Catalog";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route par défaut : redirige vers /catalogue */}
        <Route path="/" element={<Navigate to="/catalog" />} />

        {/* Page du catalogue */}
        <Route path="/catalog" element={<Catalog />} />

        {/* 404 si aucune route ne correspond */}
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
    </Router>
  );
}