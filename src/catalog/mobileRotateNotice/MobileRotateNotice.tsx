import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function MobileRotateNotice() {
  const [showNotice, setShowNotice] = useState(false)
  const [userClosed, setUserClosed] = useState(false)

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth <= 768
      const isPortrait = window.matchMedia("(orientation: portrait)").matches
      // 🔄 Afficher uniquement si l'utilisateur ne l’a pas fermée manuellement
      setShowNotice(isMobile && isPortrait && !userClosed)
    }

    checkOrientation()
    window.addEventListener("resize", checkOrientation)
    window.addEventListener("orientationchange", checkOrientation)

    return () => {
      window.removeEventListener("resize", checkOrientation)
      window.removeEventListener("orientationchange", checkOrientation)
    }
  }, [userClosed]) // important : réévaluer si userClosed change

  const handleClose = () => {
    setShowNotice(false)
    setUserClosed(true)
  }

  return (
    <div
      onClick={handleClose}
      className={cn(
        "fixed bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-sm text-white bg-black/80 rounded-md shadow-md transition-opacity duration-300 z-50 cursor-pointer select-none",
        showNotice ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      📱 Rotate your device for better visibility
    </div>
  )
}
