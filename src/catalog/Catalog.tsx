import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Archi } from '../lib/types';
import { useSwipeable } from "react-swipeable";
import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MarkdownContent from "../markdownContent/MarkdownContent"
import LucidImageViewer from "./imageViewer/LucidImageViewer";
import { MobileRotateNotice } from "./mobileRotateNotice/MobileRotateNotice";

type Archis = {
  architectures : Archi[]
}

function Catalog({architectures} : Archis) {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSwiping, setisSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [translateX, setTranslateX] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (Math.abs(eventData.deltaX) > Math.abs(eventData.deltaY)) {
        setTranslateX(eventData.deltaX);
      }
    },
    onSwiped: (eventData) => {
      const threshold = 150; // px à franchir pour déclencher la navigation
      if (eventData.deltaX < -threshold) {
        next();
      } else if (eventData.deltaX > threshold) {
        prev();
      }
      setTranslateX(0); // reset après swipe
    },
    onSwipedLeft: () => {
      setSwipeDirection("left");
      setisSwiping(false);
      // next();
    }, 
    onSwipedRight: () => {
      setSwipeDirection("right");
      setisSwiping(false);
      // prev();
    },
    onSwipeStart : () => setisSwiping(true),
    trackMouse: false,
  });

  let error = false;
  const index = architectures.findIndex((archi) => archi.id === Number(id));
  
  // Ne continue que si l'index est valide
    if(index===-1) error = true;
  
  const archi = architectures[index]

  const next = () =>{if (index < architectures.length - 1) navigate(`/catalog/${architectures[index + 1].id}`)}
  const prev = () => {if (index > 0) navigate(`/catalog/${architectures[index - 1].id}`)}

  console.log("index", index, "id", id, "archi", archi);
  

  return (
  <>
  <Button
      variant="ghost"
      onClick={() => navigate("/list")}
      className="flex items-center space-x-1 z-10 absolute top-4 left-4"
    >
      <ChevronLeft className="h-4 w-4 " />
      <span className="text-sm">Back to list</span>
  </Button>
  {(architectures.length !== 0 && !error) &&
   <div className={
    `m-auto flex flex-col gap-6 p-4 md:p-8 max-w-5xl lg:pt-12mx-auto transition-opacity duration-200 ease-in-out    
    `}>

    {/* Flèche Précédent (desktop uniquement) */}
      {index > 0 && (
        <button
        onClick={prev}
        className="hidden lg:flex absolute lg:left-[5vw] xl:left-[8vw] xxl:left-[12vw] z-50 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Flèche Suivant (desktop uniquement) */}
      {index < architectures.length - 1 && (
        <button
        onClick={next}
        className="hidden lg:flex absolute z-50 lg:right-[5vw] xl:right-[8vw] xxl:right-[12vw] top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
        >
          <ChevronRight size={24} />
        </button>
      )}


      <div style= {{
          transform: `translateX(${translateX}px)`,
          transition: swipeDirection ? 'transform 0.3s ease-out' : undefined,
          opacity: 1 - Math.min(Math.abs(translateX) / 300, 0.5),
        }}
        onTransitionEnd={() => {setSwipeDirection(null);}}
        className={`transform ${isSwiping ? 'scale-[1.02] shadow-lg' : ''} transition-transform`}>
          
        <h2 className={`text-xl md:text-2xl font-bold text-gray-800 text-center `}>
          {archi["title"]}
        </h2>

        <LucidImageViewer
          src={`/img/${archi["image"]}`}
          title={archi["title"]}
        />
        
        <div {...swipeHandlers}>
          <div className="text-center text-sm text-gray-500 animate-pulse block lg:hidden">
              ⬅️ Swipe left or right to navigate ➡️
          </div>
          {/* Description */}
          <div  className="w-full">
            <h3 className="text-xl font-semibold" style={{marginBottom: "1rem", marginTop: "1rem"}}>Description</h3>
            <div className="text-gray-700 whitespace-pre-line text-left leading-[1.2]"><MarkdownContent fichier={`description_${archi["id"]}`}/></div>
          </div>
        </div>
      </div>
      <MobileRotateNotice />
    </div>
    
    }
    {(error && 
      <div className="text-center ">
        <p className="text-red-500">Erreur sur l'architecture revenez à la page de liste</p>
        <button onClick={() => navigate("/list")} className="text-blue-500 hover:underline">Retour à la liste</button>
      </div>)}
  </>
  )
}

export default Catalog
