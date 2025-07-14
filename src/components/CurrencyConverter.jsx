import React, { useState, useEffect } from 'react'

const CurrencyConverter = ({ cryptos }) => {
  const [fromCurrency, setFromCurrency] = useState('bitcoin')
  const [toCurrency, setToCurrency] = useState('usd')
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(1)

  useEffect(() => {
    if (cryptos.length > 0) {
      const selectedCrypto = cryptos.find(c => c.id === fromCurrency)
      if (selectedCrypto) {
        let rate = selectedCrypto.current_price
        
        // Se a moeda de destino não for USD, precisaríamos de uma API de conversão
        // Esta é uma simplificação (assumindo 1 USD = 5 BRL, 1 USD = 0.9 EUR)
        if (toCurrency === 'brl') rate *= 5
        if (toCurrency === 'eur') rate *= 0.9
        
        setExchangeRate(rate)
        setResult(amount * rate)
      }
    }
  }, [fromCurrency, toCurrency, amount, cryptos])

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0
    setAmount(value)
    setResult(value * exchangeRate)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="bg-dark border border-secondary rounded-lg px-4 py-2 w-full md:w-auto"
        />
        
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="bg-dark border border-secondary rounded-lg px-4 py-2 w-full md:w-auto"
        >
          {cryptos.map(crypto => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </option>
          ))}
        </select>
        
        <span className="text-gray-400">para</span>
        
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="bg-dark border border-secondary rounded-lg px-4 py-2 w-full md:w-auto"
        >
          <option value="usd">USD (Dólar Americano)</option>
          <option value="brl">BRL (Real Brasileiro)</option>
          <option value="eur">EUR (Euro)</option>
        </select>
      </div>
      
      <div className="bg-dark border border-primary rounded-lg p-4 text-center">
        <div className="text-sm text-gray-400">Valor Convertido</div>
        <div className="text-2xl font-bold text-primary">
          {result.toLocaleString(undefined, {
            style: 'currency',
            currency: toCurrency.toUpperCase(),
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
          })}
        </div>
        <div className="text-sm text-gray-400 mt-1">
          1 {cryptos.find(c => c.id === fromCurrency)?.symbol.toUpperCase() || 'CRYPTO'} = {' '}
          {exchangeRate.toLocaleString(undefined, {
            style: 'currency',
            currency: toCurrency.toUpperCase(),
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
          })}
        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter