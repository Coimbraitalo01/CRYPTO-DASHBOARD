import React from 'react'

const CryptoList = ({ cryptos, loading }) => {
  if (loading) return <div className="bg-dark-800 p-4 rounded">Loading...</div>

  return (
    <div className="bg-dark-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-accent">Top 10 Cryptocurrencies</h2>
      
      <div className="space-y-3">
        {cryptos.map((crypto) => (
          <div key={crypto.id} className="flex justify-between items-center p-3 bg-dark-700 rounded">
            <div className="flex items-center space-x-3">
              <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
              <div>
                <h3 className="font-medium">{crypto.name}</h3>
                <span className="text-gray-400 text-sm">{crypto.symbol.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-mono">${crypto.current_price.toLocaleString()}</div>
              <div className={`text-sm ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {crypto.price_change_percentage_24h?.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CryptoList