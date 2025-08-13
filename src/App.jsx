import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CryptoList from './components/CryptoList'
import TopPerformers from './components/TopPerformers'
import CurrencyConverter from './components/CurrencyConverter'

const App = () => {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [exchangeRates, setExchangeRates] = useState({
    brl: 5.5,
    eur: 0.9
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca criptomoedas
        const { data } = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10'
        )
        setCryptos(data)
        
        // Busca taxas de câmbio
        const ratesResponse = await axios.get('https://api.exchangerate-api.com/v4/latest/USD')
        setExchangeRates({
          brl: ratesResponse.data.rates.BRL,
          eur: ratesResponse.data.rates.EUR
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
    const interval = setInterval(fetchData, 60000) // Atualiza a cada 1 minuto

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-accent">Crypto Dashboard</h1>
        
        <div className="text-sm mb-4 text-gray-400">
          Taxas de câmbio: 1 USD = {exchangeRates.brl.toFixed(2)} BRL | {exchangeRates.eur.toFixed(2)} EUR
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-2 space-y-4">
            <CryptoList cryptos={cryptos} loading={loading} />
          </div>
          
          <div className="space-y-4">
            <TopPerformers cryptos={cryptos} loading={loading} />
            <CurrencyConverter cryptos={cryptos} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App