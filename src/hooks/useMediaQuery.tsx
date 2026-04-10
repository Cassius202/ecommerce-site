'use client'

import { useEffect, useState } from 'react'

/**
 * Custom hook to detect media query matches
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns boolean - true if media query matches, false otherwise
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isDark = useMediaQuery('(prefers-color-scheme: dark)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    // Create media query list
    const mediaQueryList = window.matchMedia(query)

    // Set initial value
    setMatches(mediaQueryList.matches)

    // Handler for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener (modern browsers)
    mediaQueryList.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQueryList.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

// Tailwind breakpoint shortcuts
export function useIsMobile() {
  return useMediaQuery('(max-width: 640px)') // sm
}

export function useIsTablet() {
  return useMediaQuery('(max-width: 1024px)') // lg
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1025px)')
}

export function useIsDarkMode() {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

export function useIsLandscape() {
  return useMediaQuery('(orientation: landscape)')
}

export function useIsPortrait() {
  return useMediaQuery('(orientation: portrait)')
}

// Tailwind breakpoints mapped
export function useTailwindBreakpoint() {
  const sm = useMediaQuery('(min-width: 640px)')
  const md = useMediaQuery('(min-width: 768px)')
  const lg = useMediaQuery('(min-width: 1024px)')
  const xl = useMediaQuery('(min-width: 1280px)')
  const xl2 = useMediaQuery('(min-width: 1536px)')

  return { sm, md, lg, xl, xl2 }
}