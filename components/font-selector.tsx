"use client"

import { useThemeConfig } from "./active-theme"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

const FONT_OPTIONS = [
  { name: "Sans-serif", value: "sans-serif" },
  { name: "Serif", value: "serif" },
  { name: "Monospace", value: "monospace" },
  { name: "Cursive", value: "cursive" },
  { name: "Fantasy", value: "fantasy" },
  { name: "Inter", value: "'Inter', sans-serif" },
  { name: "Poppins", value: "'Poppins', sans-serif" },
  { name: "Roboto", value: "'Roboto', sans-serif" },
  { name: "Geist", value: "'Geist', sans-serif" },
  { name: "Geist Mono", value: "'Geist Mono', monospace" },
]

export function FontSelector() {
  const { activeFont, setActiveFont } = useThemeConfig()

  return (
    <div className="w-full">
      <Label htmlFor="font-selector" className="sr-only">
        Font
      </Label>
      <Select value={activeFont} onValueChange={setActiveFont}>
        <SelectTrigger id="font-selector" size="sm" className="flex w-full">
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel>Fonts</SelectLabel>
            {FONT_OPTIONS.map((font) => (
              <SelectItem key={font.value} value={font.value} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ fontFamily: font.value }}
                >
                  A
                </span>
                {font.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
