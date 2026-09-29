import * as React from "react"
import { Button } from "../../components/ui/button"
import { cn } from "../../lib/utils"

export interface PublicLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PublicLayout({ children, className, ...props }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans" {...props}>
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0E2238] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">A</span>
            </div>
            <span className="text-[#0E2238] font-bold text-xl tracking-tight">ANVITI</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#0E2238]">Challenges</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#0E2238]">For Startups</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#0E2238]">For Government</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#0E2238]">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            <Button variant="primary">Get Started</Button>
          </div>
        </div>
      </header>

      <main className={cn("flex-1 flex flex-col", className)}>
        {children}
      </main>

      <footer className="bg-[#0E2238] text-slate-300 py-12">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">A</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">ANVITI</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              GovTech innovation-procurement platform empowering Smart India Hackathon 2026.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-white/10 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 Anviti Platform. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span>Made for SIH 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
