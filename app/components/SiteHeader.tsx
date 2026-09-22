"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/blog" className="group flex min-w-0 items-center gap-3" aria-label="Blog CMS blog">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-xs font-bold tracking-tight text-white shadow-lg shadow-slate-900/15 transition-transform group-hover:-rotate-3">
            <span className="border-b-2 border-blue-400 pb-0.5">BC</span>
          </span>
          <span className="truncate text-sm font-bold tracking-tight text-slate-950 sm:text-base">
            Editorial Desk
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium" aria-label="Primary navigation">
          <Link
            href="/blog"
            aria-current={pathname === "/blog" ? "page" : undefined}
            className={`rounded-lg px-3 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${pathname === "/blog" ? "bg-slate-100 text-slate-950" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}
          >
            Blog
          </Link>
          <Link
            href="/blog/create"
            aria-current={pathname === "/blog/create" ? "page" : undefined}
            className={`rounded-lg px-3 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${pathname === "/blog/create" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}
          >
            <span className="sm:hidden">New</span>
            <span className="hidden sm:inline">New post</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
