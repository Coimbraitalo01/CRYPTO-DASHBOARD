import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-secondary py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-xl font-bold">Crypto Dashboard</h1>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/80 transition-colors">
            Atualizar
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar