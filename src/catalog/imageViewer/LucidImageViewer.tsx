'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Maximize2, Minimize2 } from 'lucide-react'

export default function LucidImageViewer({ src, title }: { src: string, title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const lastTouchDist = useRef<number | null>(null)

  // ✋ Empêche le scroll de la page pendant zoom
  useEffect(() => {
    const preventPageScroll = (e: WheelEvent) => {
      if (containerRef.current?.contains(e.target as Node)) {
        e.preventDefault()
      }
    }
    document.addEventListener('wheel', preventPageScroll, { passive: false })
    return () => {
      document.removeEventListener('wheel', preventPageScroll)
    }
  }, [])

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const cursorX = e.clientX - rect.left
    const cursorY = e.clientY - rect.top
    const zoomFactor = -e.deltaY * 0.0025
    const newScale = Math.max(0.1, Math.min(5, scale + zoomFactor))

    // 💡 Ajuste l'offset pour zoomer sous la souris
    const scaleChange = newScale / scale
    const newOffsetX = (offset.x - cursorX) * scaleChange + cursorX
    const newOffsetY = (offset.y - cursorY) * scaleChange + cursorY

    setScale(newScale)
    setOffset({ x: newOffsetX, y: newOffsetY })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!startPos) return
    const dx = e.clientX - startPos.x
    const dy = e.clientY - startPos.y
    setStartPos({ x: e.clientX, y: e.clientY })
    setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }))
  }

  const handleMouseUp = () => setStartPos(null)

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

useEffect(() => {
  const handleFullscreenChange = () => {
    const isNowFullscreen = !!document.fullscreenElement
    setIsFullscreen(isNowFullscreen)

    // 🔄 Reset zoom et position à chaque transition
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  document.addEventListener('fullscreenchange', handleFullscreenChange)
  return () => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }
}, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      e.preventDefault()
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    } else if (e.touches.length === 2) {
      e.preventDefault()
      const dist = getDistance(e.touches[0], e.touches[1])
      lastTouchDist.current = dist
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && startPos) {
      e.preventDefault()
      const dx = e.touches[0].clientX - startPos.x
      const dy = e.touches[0].clientY - startPos.y
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }))
    } else if (e.touches.length === 2 && lastTouchDist.current !== null) {
      e.preventDefault()
      const newDist = getDistance(e.touches[0], e.touches[1])
      const delta = (newDist - lastTouchDist.current) * 0.005
      const newScale = Math.max(0.1, Math.min(5, scale + delta))
      setScale(newScale)
      lastTouchDist.current = newDist
    }
  }

  const handleTouchEnd = () => {
    setStartPos(null)
    lastTouchDist.current = null
  }

  const getDistance = (a: React.Touch, b: React.Touch) => {
    return Math.sqrt((a.clientX - b.clientX) ** 2 + (a.clientY - b.clientY) ** 2)
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video rounded-md border overflow-hidden select-none touch-none ${
        isFullscreen ? 'bg-white' : ''
      }`}
    >
      <div
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <img
          ref={imageRef}
          src={src}
          alt={title}
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: 'top left',
          }}
        />
      </div>

      <div className="absolute top-2 right-2 z-10">
        <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  )
}
