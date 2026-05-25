'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing') // typing, routing, solved
  
  const fullText = "#financial I need help with my Pell Grant..."
  
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
        <div className="space-x-8 hidden md:block">
          <a href="#features" className="text-sm font-medium hover:text-indigo-400 transition-colors">Features</a>
          <a href="#routing" className="text-sm font-medium hover:text-indigo-400 transition-colors">Routing</a>
          <a href="#pulse" className="text-sm font-medium hover:text-indigo-400 transition-colors">Pulse</a>
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
            <a href="#features" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold text-lg backdrop-blur-sm text-center">
              See how it works
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

              {/* Step 2: Processing */}
              <div className={`transition-all duration-500 ${phase === 'routing' || phase === 'solved' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className="flex gap-3 items-center my-4">
                  <div className="h-px bg-gray-700 flex-1"></div>
                  <div className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">AI PROCESSING</div>
                  <div className="h-px bg-gray-700 flex-1"></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-900/50 p-2 rounded border border-gray-700 text-xs">
                    <span className="text-gray-500">Sentiment:</span> <span className="text-yellow-400">Neutral</span>
                  </div>
                  <div className="bg-gray-900/50 p-2 rounded border border-gray-700 text-xs">
                    <span className="text-gray-500">Topic:</span> <span className="text-purple-400">#financial</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Result */}
              <div className={`transition-all duration-500 delay-100 ${phase === 'solved' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className="mt-4 bg-green-500/10 border border-green-500/20 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-black text-xs font-bold">✓</div>
                  <div>
                    <div className="text-green-400 font-semibold">Routed to Specialist</div>
                    <div className="text-gray-400 text-xs">Match: Ms. Johnson (Financial Aid)</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Feature Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-gray-800">
        <div className="max-w-2xl mb-16">
          <div className="text-sm font-medium text-indigo-400 mb-3 uppercase tracking-widest">What&rsquo;s inside</div>
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
            Built for the people who actually run mentorship programs.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div id="pulse" className="p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Network Pulse</h3>
            <p className="text-gray-400 leading-relaxed">
              Spot fading relationships before they disengage. Health scores update automatically from every text exchange, and stale matches surface to the top.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:bg-indigo-500/30 transition-colors">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Routing</h3>
            <p className="text-gray-400 leading-relaxed">
              Students reach the right adult in seconds. A simple <span className="font-mono text-indigo-300">#financial</span>, <span className="font-mono text-indigo-300">#academic</span>, or <span className="font-mono text-indigo-300">#career</span> tag routes their text to the matching specialist mentor.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Built for program staff</h3>
            <p className="text-gray-400 leading-relaxed">
              Add new matches, resend opt-in invites, edit phone numbers, and read every conversation thread in one place. Designed around the daily work of Mentor Directors.
            </p>
          </div>

        </div>
      </section>

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





