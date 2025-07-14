import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

import './App.css'

const architectures = [
  {
    title: "Architecture Serverless avec Lambda et API Gateway",
    embedUrl:
      "https://lucid.app/documents/embedded/0dc434ea-30cf-4af2-8f72-1c6b00532605", // Remplace par tes vrais liens Lucidchart
  },
  {
    title: "Infrastructure ECS avec Fargate et RDS",
    embedUrl:
      "https://lucid.app/documents/embeddedchart/xxxxxx-2",
  },
  {
    title: "Architecture Data Lake sur AWS avec Glue et Athena",
    embedUrl:
      "https://lucid.app/documents/embeddedchart/xxxxxx-3",
  },
];

function App() {
  const [index, setIndex] = useState(0);
  const current = architectures[index];

  const next = () => setIndex((i) => (i + 1) % architectures.length);
  const prev = () =>
    setIndex((i) => (i - 1 + architectures.length) % architectures.length);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Catalogue d’architectures AWS
      </h1>
      <Card className="w-full max-w-4xl">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-center">
            {current.title}
          </h2>
          <div className="aspect-video">
            <iframe
              className="w-full h-full border border-gray-300 rounded-md"
              src={current.embedUrl}
              allowFullScreen
              title={current.title}
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
    </div>
  )
}

export default App
