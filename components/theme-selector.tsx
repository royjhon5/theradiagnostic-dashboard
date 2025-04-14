"use client"
import { useThemeConfig } from "./active-theme"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select"

const THEME_COLORS: Record<string, string> = {
  default: "#ffffff",
  red: "#DC2626",
  rose: "#E11D48",
  orange: "#EA580C",
  green: "#22C55E",
  blue: "#3B82F6",
  yellow: "#FACC15",
  violet: "#6D28D9",
  amber: "#f59e0b",
  "default-scaled": "#e5e7eb",
  "red-scaled": "#DC2626",
  "rose-scaled": "#E11D48",
  "orange-scaled": "#EA580C",
  "green-scaled": "#22C55E",
  "blue-scaled": "#3B82F6",
  "yellow-scaled": "#FACC15",
  "violet-scaled": "#6D28D9",
  "amber-scaled": "#f59e0b",
  "mono-scaled": "#6b7280",
}

const DEFAULT_THEMES = [
  { name: "Default", value: "default" },
  { name: "Red", value: "red" },
  { name: "Rose", value: "rose" },
  { name: "Orange", value: "orange" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
  { name: "Yellow", value: "yellow" },
  { name: "Violet", value: "violet" },
  { name: "Amber", value: "amber" },
]

const SCALED_THEMES = [
  { name: "Default", value: "default-scaled" },
  { name: "Red", value: "red-scaled" },
  { name: "Rose", value: "rose-scaled" },
  { name: "Orange", value: "orange-scaled" },
  { name: "Green", value: "green-scaled" },
  { name: "Blue", value: "blue-scaled" },
  { name: "Yellow", value: "yellow-scaled" },
  { name: "Violet", value: "violet-scaled" },
  { name: "Amber", value: "amber-scaled" },
]

const MONO_THEMES = [
  { name: "Mono", value: "mono-scaled" },
]

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig()

  return (
    <div className="w-full">
      <Label htmlFor="theme-selector" className="sr-only">
        Theme
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger
          id="theme-selector"
          size="sm"
          className="flex w-full"
        >
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent align="end" className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:bg-gradient-to-t ">
          <SelectGroup>
            <SelectLabel>Default</SelectLabel>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem key={theme.value} value={theme.value} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: THEME_COLORS[theme.value] }}
                />
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Scaled</SelectLabel>
            {SCALED_THEMES.map((theme) => (
              <SelectItem key={theme.value} value={theme.value} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: THEME_COLORS[theme.value] }}
                />
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Monospaced</SelectLabel>
            {MONO_THEMES.map((theme) => (
              <SelectItem key={theme.value} value={theme.value} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: THEME_COLORS[theme.value] }}
                />
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
