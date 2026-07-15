'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SmoothScrollHero } from '@/components/smooth-scroll-hero'
import { CinematicLoader } from '@/components/cinematic-loader'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Sirf first time visit pe loader chalega
    const hasVisited = sessionStorage.getItem('hasVisitedKS')

    if (!hasVisited) {
      setIsLoading(true)
      sessionStorage.setItem('hasVisitedKS', 'true')

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2400)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <SmoothScrollHero />
      <AnimatePresence>
        {isLoading && <CinematicLoader />}
      </AnimatePresence>
    </>
  )
}