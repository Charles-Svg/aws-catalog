import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Catalog from "./catalog/Catalog";
import { useState, useEffect } from "react";
import type { Archi } from "./lib/types";
import ArchiTable from "./table/ArchiTable";

import './App.css';
import Title from "./title/Title";


export default function App() {
  const [architectures, setArchitectures] = useState<Archi[]>([]);
    
  useEffect(()=>{
      fetch("/data/archit.json", {
      headers: {
      "Content-Type": "application/json",
    },
  }).then((response)=> response.json())
  .then((data)=>{ 
    setArchitectures(data); 
   })
  .catch((err) => console.error("Erreur de chargement des architectures :", err));
  },[])

  return (
    <Router>
      <Routes>
        {/* Route par défaut : redirige vers /catalogue */}
        <Route path="/" element={<Navigate to="/list" />} />

        {/* Page du catalogue */}
        <Route path="/catalog/:id" element = {
          <>
            <Title/>
            <Catalog architectures={architectures}/>
          </>
        }>
        </Route>

        <Route path="/list" element={
          <>
            <Title/>
            <ArchiTable architectures={architectures}/>
          </>
          }/>

        {/* 404 si aucune route ne correspond */}
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
    </Router>
  );
}