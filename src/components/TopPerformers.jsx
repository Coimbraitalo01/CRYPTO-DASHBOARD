import React from 'react'

const TopPerformers = ({ cryptos, loading }) => {
  if (loading) return <div className="bg-dark-800 p-4 rounded">Loading...</div>

  const topPerformers = [...cryptos]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 4)

  return (
    <div className="bg-dark-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-accent">Top Performers (24h)</h2>
      
      <div className="space-y-3">
        <div className="font-medium text-gray-300">Maiores Altas (24h)</div>
        {topPerformers.map((crypto) => (
          <div key={crypto.id} className="flex justify-between items-center p-2">
            <span>{crypto.symbol.toUpperCase()}</span>
            <span className={`font-mono ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {crypto.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopPerformers