'use client'

import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { RiSunLine, RiMoonClearLine } from 'react-icons/ri'

function ThemeToggler() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  const toggleDarkMode = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.cookie = `theme=${newTheme}; path=/`
  }
  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center focus:outline-none"
    >
      {resolvedTheme === 'dark' ? (
        <div className="text-orange-300 mr-2  text-4xl">
          <RiSunLine />
        </div>
      ) : (
        <div className="text-gray-700 mr-2 text-4xl">
          <span className="text-slate-800">
            <RiMoonClearLine />
          </span>
        </div>
      )}
    </button>
  )
}

export default ThemeToggler
