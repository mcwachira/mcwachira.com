'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

// Props for the Tab component
interface TabProps {
    tabName?: string | null
    directory: string
}

// Individual Tab component
function Tab({ tabName, directory }: TabProps) {
    const isDefaultTab = tabName == null
    let tabSlug: string | undefined
    let nestedDirectory = ''
    if (!isDefaultTab) {
        tabSlug = tabName.replace(/ /g, '-').toLowerCase()
        nestedDirectory = '/categories'
    }
    const href = isDefaultTab
        ? `/${directory}`
        : `/${directory}${nestedDirectory}/${tabSlug}`
    const path = usePathname()
    const isActive = path === href

    if (tabName == null) {
        tabName = directory === 'articles' ? 'All Articles' : 'All Projects'
    }

    return (
        <li>
            <Link
                href={href}
                scroll={false}
                className={clsx(
                    'inline-block rounded-full px-5 py-1.5 text-md font-medium transition',
                    isActive
                        ? 'bg-slate-50 text-sky-800 shadow-sm shadow-sky-100/50 ring-1 ring-slate-900/5'
                        : 'bg-light dark:bg-dark text-slate-700 duration-200 ease-in-out hover:bg-slate-50/95'
                )}
            >
                {tabName}
            </Link>
        </li>
    )
}

// Props for the Tabs component
interface TabsProps extends React.HTMLAttributes<HTMLUListElement> {
    tabs: string[] // Properly typed tabs as an array of strings
    directory: string
    className?: string
}

// Tabs component that renders a list of Tab components
export function Tabs({ tabs, directory, className, ...props }: TabsProps) {
    useEffect(() => {
        // Scroll to top on page load
        window.scrollTo({ top: 0, left: 0 })
    }, [])

    return (
        <ul className={clsx('flex flex-wrap items-center', className)} {...props}>
            {/* Default Tab */}
            <Tab directory={directory} />
            {/* Dynamic Tabs */}
            {tabs.map((tabName, index) => (
                <Tab
                    tabName={tabName}
                    directory={directory}
                    key={`${directory}-tab-${index}`}
                />
            ))}
        </ul>
    )
}
