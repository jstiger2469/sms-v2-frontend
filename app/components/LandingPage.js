'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing') // typing, routing, solved
  
  const fullText = "Hey, I have a question about my financial aid form..."
  
  useEffect(() => {
    if (phase === 'typing') {
      if (text.length < fullText.length) {
        const timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1))
        }, 50 + Math.random() * 50)
        return () => clearTimeout(timeout)
      } else {
        setTimeout(() => setPhase('routing'), 500)
      }
    } else if (phase === 'routing') {
      setTimeout(() => setPhase('solved'), 2000)
    } else {
      setTimeout(() => {
        setPhase('typing')
        setText('')
      }, 4000)
    }
  }, [text, phase])

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative selection:bg-indigo-500 selection:text-white">
      
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-blue-500 rounded-full blur-[100px] animate-pulse-slow delay-2000"></div>
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex justify-between items-center max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Seedling SMS
          </div>
          <div className="hidden sm:block text-xs uppercase tracking-widest text-gray-500">Mentor Admin Console</div>
        </div>
        <a href="/auth/login" className="px-5 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-sm font-medium backdrop-blur-sm">
          Sign In
        </a>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            For Seedling Mentor Directors &amp; program staff
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            The command center for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Seedling mentorship</span>.
          </h1>
          <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
            Every match, every message, every milestone &mdash; in one place. Coordinate your mentor network and spot relationships that need attention before they fade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/auth/login" className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all font-semibold text-lg shadow-lg shadow-indigo-500/25">
              Sign In
            </a>
          </div>
        </div>

        {/* Right: Interactive Simulator */}
        <div id="routing" className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
          <div className="relative bg-gray-800/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl">

            {/* Simulation Header */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs font-mono text-gray-500">MENTOR ROUTING</div>
            </div>

            {/* Simulation Body */}
            <div className="space-y-4 font-mono text-sm">
              
              {/* Step 1: Input */}
              <div className="flex gap-3 items-start opacity-100">
                <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-xs">IN</div>
                <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 w-full relative">
                  <span className="text-gray-300">{text}</span>
                  <span className={`w-2 h-4 bg-indigo-500 inline-block align-middle ml-1 ${phase === 'typing' ? 'animate-blink' : 'hidden'}`}></span>
                </div>
              </div>

              {/* Step 2: Match Lookup */}
              <div className={`transition-all duration-500 ${phase === 'routing' || phase === 'solved' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className="flex gap-3 items-center my-4">
                  <div className="h-px bg-gray-700 flex-1"></div>
                  <div className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">MATCH LOOKUP</div>
                  <div className="h-px bg-gray-700 flex-1"></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-900/50 p-2 rounded border border-gray-700 text-xs">
                    <span className="text-gray-500">From:</span> <span className="text-indigo-300">Student &middot; opted-in</span>
                  </div>
                  <div className="bg-gray-900/50 p-2 rounded border border-gray-700 text-xs">
                    <span className="text-gray-500">Match:</span> <span className="text-purple-400">Ms. Johnson</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Result */}
              <div className={`transition-all duration-500 delay-100 ${phase === 'solved' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className="mt-4 bg-green-500/10 border border-green-500/20 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-black text-xs font-bold">&#10003;</div>
                  <div>
                    <div className="text-green-400 font-semibold">Delivered to mentor</div>
                    <div className="text-gray-400 text-xs">Ms. Johnson &middot; logged to thread</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Seedling Mentors &middot; Internal Mentor Admin Console</p>
      </footer>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  )
}





