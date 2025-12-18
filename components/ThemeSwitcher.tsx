"use client"

import { useEffect, useState } from "react"
import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark =
    theme === "dark" || (theme === "system" && resolvedTheme === "dark")

  const activeClass = isDark
    ? "peer-checked:bg-gray-600 peer-checked:text-foreground-strong peer-checked:border peer-checked:border-gray-600"
    : "peer-checked:bg-blue-100 peer-checked:text-foreground-strong peer-checked:border peer-checked:border-blue-200"

  const baseClass =
    "relative flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full text-text-muted"

  return (
    <div className="flex w-fit rounded-full bg-surface border border-border">
      {/* SYSTEM */}
      <span>
        <input
          className="peer sr-only"
          type="radio"
          id="theme-system"
          value="system"
          checked={theme === "system"}
          onChange={(e) => setTheme(e.target.value)}
        />
        <label
          htmlFor="theme-system"
          className={`${baseClass} ${activeClass}`}
        >
          <LaptopIcon className="h-4 w-4" />
        </label>
      </span>

      {/* LIGHT */}
      <span>
        <input
          className="peer sr-only"
          type="radio"
          id="theme-light"
          value="light"
          checked={theme === "light"}
          onChange={(e) => setTheme(e.target.value)}
        />
        <label
          htmlFor="theme-light"
          className={`${baseClass} peer-checked:bg-blue-100 peer-checked:text-foreground-strong peer-checked:border peer-checked:border-blue-200`}
        >
          <SunIcon className="h-4 w-4" />
        </label>
      </span>

      {/* DARK */}
      <span>
        <input
          className="peer sr-only"
          type="radio"
          id="theme-dark"
          value="dark"
          checked={theme === "dark"}
          onChange={(e) => setTheme(e.target.value)}
        />
        <label
          htmlFor="theme-dark"
          className={`${baseClass} peer-checked:bg-gray-600 peer-checked:text-foreground-strong peer-checked:border peer-checked:border-gray-600`}
        >
          <MoonIcon className="h-4 w-4" />
        </label>
      </span>
    </div>
  )
}
