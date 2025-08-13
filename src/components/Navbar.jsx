import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-primary-black text-primary-yellow p-4 border-b-4 border-primary-yellow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">CRYPTO DASHBOARD</h1>
        <div className="text-primary-white">Versão 1.0</div>
      </div>
    </nav>
  )
}

export default Navbar