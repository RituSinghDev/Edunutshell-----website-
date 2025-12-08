"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const phiRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const globeRef = useRef<{ destroy: () => void } | null>(null)
  const [r, setR] = useState(0)

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, number>) => {
      if (!pointerInteracting.current) phiRef.current += 0.005
      state.phi = phiRef.current + r
    },
    [r],
  )

  useEffect(() => {
    if (!canvasRef.current) return

    let resizeTimeout: NodeJS.Timeout
    let mounted = true
    let initAttempts = 0
    const maxAttempts = 10

    const initGlobe = () => {
      if (!canvasRef.current || !mounted) return
      
      const width = canvasRef.current.offsetWidth
      
      if (width === 0 && initAttempts < maxAttempts) {
        // If width is 0, wait a bit and try again with limit
        initAttempts++
        setTimeout(() => {
          if (mounted) initGlobe()
        }, 100)
        return
      }

      if (width === 0) {
        // Give up after max attempts
        return
      }

      if (globeRef.current) {
        globeRef.current.destroy()
      }

      globeRef.current = createGlobe(canvasRef.current, {
        ...config,
        width: width * 2,
        height: width * 2,
        onRender,
      })

      if (canvasRef.current && mounted) {
        canvasRef.current.style.opacity = "1"
      }
    }

    const handleResize = () => {
      // Debounce resize to avoid too many reinitializations
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (mounted) initGlobe()
      }, 250)
    }

    // Delay initial globe creation to avoid blocking initial render
    const initTimeout = setTimeout(() => {
      if (mounted) initGlobe()
    }, 200)

    // Add resize listener
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      mounted = false
      clearTimeout(initTimeout)
      clearTimeout(resizeTimeout)
      window.removeEventListener("resize", handleResize)
      if (globeRef.current) {
        globeRef.current.destroy()
      }
    }
  }, [onRender, config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
