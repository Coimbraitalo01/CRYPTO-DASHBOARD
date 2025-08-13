import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CryptoChart = ({ cryptos }) => {
  const chartData = cryptos.slice(0, 5).map(crypto => ({
    name: crypto.symbol.toUpperCase(),
    price: crypto.current_price,
    change: crypto.price_change_percentage_24h
  }))

  return (
    <div className="bg-primary-white rounded-lg shadow-lg border-2 border-primary-yellow p-6">
      <h2 className="text-xl font-bold mb-4 text-primary-black">Market Trends</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#000000" />
            <YAxis stroke="#000000" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF',
                borderColor: '#FFD700',
                color: '#000000'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#FFD700" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#000000' }}
              activeDot={{ r: 6, fill: '#FFD700' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CryptoChart