import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Archi } from '../lib/types';
import { useSwipeable } from "react-swipeable";
import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MarkdownContent from "../markdownContent/MarkdownContent"

type Archis = {
  architectures : Archi[]
}

function Catalog({architectures} : Archis) {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSwiping, setisSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  let error = false;
  const index = architectures.findIndex((archi) => archi.id === Number(id));
  
  // Ne continue que si l'index est valide
    if(index===-1) error = true;
  
  const archi = architectures[index]

  const next = () =>{if (index < architectures.length - 1) navigate(`/catalog/${architectures[index + 1].id}`)}
  const prev = () => {if (index > 0) navigate(`/catalog/${architectures[index - 1].id}`)}

  console.log("index", index, "id", id, "archi", archi);
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setSwipeDirection("left");
      setisSwiping(false);
      next();
    }, 
    onSwipedRight: () => {
      setSwipeDirection("right");
      setisSwiping(false);
      prev();
    },
    onSwipeStart : () => setisSwiping(true),
    trackMouse: false,
  });

  return (
  <>
    <Button
        variant="ghost"
        onClick={() => navigate("/list")}
        className="flex items-center space-x-1 z-10 lg:absolute lg:top-4 lg:left-4"
      >
        <ChevronLeft className="h-4 w-4 " />
        <span className="text-sm">Back to list</span>
    </Button>
  {(architectures.length !== 0 && !error) &&
   <div {...swipeHandlers} className={`flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto transition-transform duration-200 ease-in-out lg:pt-12 
        ${isSwiping ? 'scale-[1.02] opacity-80 shadow-lg' : ''} 
        ${swipeDirection == 'left' ? "-translate-x-[15vw]" : ""} 
        ${swipeDirection == 'right' ? "translate-x-[15vw]" : ""} `}
        onTransitionEnd={() => {setSwipeDirection(null);}}>

      <h1 className={`text-2xl md:text-4xl font-bold text-gray-800 text-center `}>
      {archi["title"]}
      </h1>
          {/* Flèche Précédent (desktop uniquement) */}
          {index > 0 && (
            <button
              onClick={prev}
              className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Flèche Suivant (desktop uniquement) */}
          {index < architectures.length - 1 && (
            <button
              onClick={next}
              className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div className="w-full h-full aspect-video">
            <iframe
              src={archi["embedUrl"]}
              title={archi["title"]}
              allowFullScreen
              className="w-full h-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="text-center text-sm text-gray-500 animate-pulse block lg:hidden">
            Swipe left or right to navigate
          </div>
        {/* Description */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <div className="text-gray-700 whitespace-pre-line text-left leading-[1.2]"><MarkdownContent fichier={`description_${archi["id"]}`}/></div>
        </div>
    </div>}
    {(error && 
      <div className="text-center ">
        <p className="text-red-500">Erreur sur l'architecture revenez à la page de liste</p>
        <button onClick={() => navigate("/list")} className="text-blue-500 hover:underline">Retour à la liste</button>
      </div>)}
  </>
  )
}

export default Catalog
