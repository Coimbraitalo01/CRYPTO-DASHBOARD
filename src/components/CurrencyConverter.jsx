import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CurrencyConverter = ({ cryptos }) => {
  const [fromCurrency, setFromCurrency] = useState('bitcoin')
  const [toCurrency, setToCurrency] = useState('usd')
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState(0)
  const [exchangeRates, setExchangeRates] = useState({
    usd: 1,
    brl: 5.5, // Valor inicial, será atualizado
    eur: 0.9  // Valor inicial, será atualizado
  })

  // Atualiza taxas de câmbio em tempo real
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD')
        setExchangeRates({
          usd: 1,
          brl: response.data.rates.BRL,
          eur: response.data.rates.EUR
        })
      } catch (error) {
        console.error("Erro ao buscar taxas de câmbio:", error)
      }
    }

    fetchExchangeRates()
    const interval = setInterval(fetchExchangeRates, 60000) // Atualiza a cada 1 minuto

    return () => clearInterval(interval)
  }, [])

  // Calcula conversão
  useEffect(() => {
    if (cryptos.length > 0) {
      const crypto = cryptos.find(c => c.id === fromCurrency)
      if (crypto) {
        const rate = crypto.current_price * exchangeRates[toCurrency]
        setResult(amount * rate)
      }
    }
  }, [fromCurrency, toCurrency, amount, cryptos, exchangeRates])

  const handleInvert = () => {
    if (!cryptos.some(c => c.id === toCurrency)) {
      setFromCurrency(toCurrency)
      setToCurrency(fromCurrency)
    }
  }

  return (
    <div className="bg-dark-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-accent">Conversor de Moedas</h2>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="bg-dark-700 border border-dark-600 rounded px-3 py-2 w-24 text-right"
          />
          
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="bg-dark-700 border border-dark-600 rounded px-3 py-2 flex-1"
          >
            {cryptos.map(crypto => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.symbol.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleInvert}
            className="p-2 bg-accent text-dark-800 rounded-full hover:bg-amber-300 transition"
            title="Inverter moedas"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-dark-700 px-3 py-2 rounded min-w-[120px] text-right font-mono">
            {result.toLocaleString('pt-BR', {
              style: 'currency',
              currency: toCurrency.toUpperCase(),
              minimumFractionDigits: 2,
              maximumFractionDigits: 6
            })}
          </div>
          
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="bg-dark-700 border border-dark-600 rounded px-3 py-2 flex-1"
          >
            <option value="usd">USD</option>
            <option value="brl">BRL</option>
            <option value="eur">EUR</option>
          </select>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-400">
        Taxas atualizadas em tempo real
      </div>
    </div>
  )
}

export default CurrencyConverter