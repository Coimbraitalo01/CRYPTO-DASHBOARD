import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CryptoChart = ({ data }) => {
  // Prepara os dados para o gráfico
  const chartData = data.map(crypto => ({
    name: crypto.symbol.toUpperCase(),
    price: crypto.current_price,
    change: crypto.price_change_percentage_24h
  }))

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d2d3a" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#2d2d3a', borderColor: '#6e44ff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#6e44ff" 
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CryptoChart