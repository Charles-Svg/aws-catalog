import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Archi } from '../lib/types';

type Archis = {
  architectures : Archi[]
}

function Catalog({architectures} : Archis) {
  
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % architectures.length);
  const prev = () =>
    setIndex((i) => (i - 1 + architectures.length) % architectures.length);



  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AWS Architectures
      </h1>
      {
        (architectures.length!==0) &&
        <Card className="w-full max-w-4xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-center">
              {architectures[index]["title"]}
            </h2>
            <div className="aspect-video">
              <iframe
                className="w-full h-full border border-gray-300 rounded-md"
                src={architectures[index]["embedUrl"]}
                allowFullScreen
                title={architectures[index]["title"]}
              ></iframe>
            </div>
            <div className="mt-4 flex justify-between">
              <Button onClick={prev} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
              </Button>
              <Button onClick={next} variant="outline">
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      }

    </div>
  )
}

export default Catalog
