import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Catalog from "./Catalog";
import { useState, useEffect } from "react";
import type { Archi } from "./lib/types";



export default function App() {
  const [architectures, setArchitectures] = useState<Archi[]>([]);
    
  useEffect(()=>{
      fetch("/data/archit.json", {
      headers: {
      "Content-Type": "application/json",
    },
  }).then((response)=> response.json())
  .then((data)=>{ setArchitectures(data); console.log(data)})
  .catch((err) => console.error("Erreur de chargement du JSON :", err));
  },[])

  return (
    <Router>
      <Routes>
        {/* Route par défaut : redirige vers /catalogue */}
        <Route path="/" element={<Navigate to="/catalog" />} />

        {/* Page du catalogue */}
        <Route path="/catalog" >
          <Catalog architectures={architectures}/>
        </Route>

        {/* 404 si aucune route ne correspond */}
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
    </Router>
  );
}