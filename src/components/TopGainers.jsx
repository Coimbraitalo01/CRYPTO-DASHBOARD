// src/components/TopGainers.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';

const TopGainers = () => {
  const [gainers, setGainers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "percent_change_24h_desc",
              per_page: 10,
              page: 1,
              price_change_percentage: "24h",
            },
          }
        );
        // Pega os 3 com maior alta
        setGainers(res.data.slice(0, 3));
      } catch (err) {
        console.error("Erro ao buscar as maiores altas:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg text-white mt-8">
      <h2 className="text-lg font-semibold mb-4">🚀 Maiores Altas (24h)</h2>
      <ul className="space-y-3">
        {gainers.map((coin) => (
          <li key={coin.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={coin.image} alt={coin.name} className="w-6 h-6" />
              <span className="font-medium">{coin.name} ({coin.symbol.toUpperCase()})</span>
            </div>
            <span className="text-green-400 font-bold">
              +{coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopGainers;