"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

const THEME_COOKIE = "active_theme"
const FONT_COOKIE = "active_font"
const DEFAULT_THEME = "default"
const DEFAULT_FONT = "sans-serif"

function setCookie(name: string, value: string) {
  if (typeof window === "undefined") return
  document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === "https:" ? "Secure;" : ""}`
}

type ThemeContextType = {
  activeTheme: string
  setActiveTheme: (theme: string) => void
  activeFont: string
  setActiveFont: (font: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ActiveThemeProvider({
  children,
  initialTheme,
  initialFont,
}: {
  children: ReactNode
  initialTheme?: string
  initialFont?: string
}) {
  const [activeTheme, setActiveTheme] = useState<string>(
    () => initialTheme || DEFAULT_THEME
  )
  const [activeFont, setActiveFont] = useState<string>(
    () => initialFont || DEFAULT_FONT
  )

  useEffect(() => {
    // Apply theme
    setCookie(THEME_COOKIE, activeTheme)
    document.body.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        document.body.classList.remove(className)
      }
    })
    document.body.classList.add(`theme-${activeTheme}`)
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled")
    }
  }, [activeTheme])

  useEffect(() => {
    setCookie(FONT_COOKIE, activeFont)
    document.body.style.fontFamily = activeFont
  }, [activeFont])

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme, activeFont, setActiveFont }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeConfig() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within an ActiveThemeProvider")
  }
  return context
}
