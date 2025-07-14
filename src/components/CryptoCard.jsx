import React from 'react'

const CryptoCard = ({ crypto }) => {
  const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
  
  return (
    <div className="crypto-card">
      <div className="flex items-center space-x-3 mb-4">
        <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
        <div>
          <h3 className="font-bold">{crypto.name}</h3>
          <span className="text-gray-400 text-sm">{crypto.symbol.toUpperCase()}</span>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</div>
          <div className={`text-sm ${priceChangeClass}`}>
            {crypto.price_change_percentage_24h >= 0 ? '↑' : '↓'} 
            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
          </div>
        </div>
        <div className="text-gray-400 text-sm">
          MCap: ${(crypto.market_cap / 1000000000).toFixed(2)}B
        </div>
      </div>
    </div>
  )
}

export default CryptoCard