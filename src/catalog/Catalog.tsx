import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Archi } from '../lib/types';
import { useParams } from "react-router-dom";

type Archis = {
  architectures : Archi[]
}

function Catalog({architectures} : Archis) {
  
  const { id } = useParams();
  const idNumber = Number(id);
  const indexFound = architectures.findIndex(archi => archi.id == idNumber);
  const initialIndex = indexFound !== -1 ? indexFound : 0;

  const [index, setIndex] = useState(initialIndex);
  const next = () => setIndex((i) => (i + 1) % architectures.length);
  const prev = () =>
    setIndex((i) => (i - 1 + architectures.length) % architectures.length);



  return (
  (architectures.length!==0) &&
   <div className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center">{architectures[index]["title"]}</h1>

          <div className="w-full h-full aspect-video">
            <iframe
              src={architectures[index]["embedUrl"]}
              title={architectures[index]["title"]}
              allowFullScreen
              className="w-full h-full border border-gray-300 rounded-md"
            />
          </div>

        {/* Description */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{architectures[index]["description"]}</p>
        </div>
      </div>
  )
}

export default Catalog
