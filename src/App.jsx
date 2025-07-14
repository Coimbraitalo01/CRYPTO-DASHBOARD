import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import CryptoCard from './components/CryptoCard'
import CryptoChart from './components/CryptoChart'
import CurrencyConverter from './components/CurrencyConverter'
import axios from 'axios'
import React from 'react'
import TopGainers from "./components/TopGainers";

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        )
        setCryptoData(response.data)
      } catch (error) {
        console.error('Error fetching crypto data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cryptoData.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>

        {/* Maiores Altas do Dia */}
        <div className="bg-secondary rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Maiores Altas do Dia</h2>
          <TopGainers cryptos={cryptoData} />
        </div>

        {/* Gráfico de Preços */}
        <div className="bg-secondary rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Gráfico de Preços</h2>
          <CryptoChart data={cryptoData} />
        </div>

        {/* Conversor de Moedas */}
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Conversor de Moedas</h2>
          <CurrencyConverter cryptos={cryptoData} />
        </div>
      </main>
    </div>
  )
}

export default App