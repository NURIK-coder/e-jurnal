import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CircleGauge, Check, X } from "lucide-react";

const salesData = [
  { day: "Mon", sales: 0 },
  { day: "Tue", sales: 400 },
  { day: "Wed", sales: 100 },
  { day: "Thu", sales: 500 },
  { day: "Fri", sales: 300 },
  { day: "Sat", sales: 420 },
  { day: "Sun", sales: 350 },
];

const topSales = [
  { item: "Mugs", units: "2k" },
  { item: "Teacup", units: "14k" },
  { item: "Glasses", units: "4k" },
  { item: "Bowls", units: "15k" },
  { item: "Bottles", units: "60k" },
];

export default function Dashboard() {
  const cardClass =
    "bg-white dark:bg-slate-800 text-slate-800 dark:text-white p-6 rounded-xl shadow-md";
  const inputClass =
    "bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 px-2 py-1 rounded text-sm text-black dark:text-white";
  const containerClass =
    "bg-gray-100 dark:bg-slate-900 text-black dark:text-white min-h-screen p-6 space-y-6 transition-all";

  return (
    <div className={containerClass}>
      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.03 }} className={cardClass}>
          <p className="text-sm">No. of Sales</p>
          <h2 className="text-3xl font-bold mt-2">2,225</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className={cardClass}>
          <p className="text-sm">Last Month Profit</p>
          <h2 className="text-3xl font-bold text-green-500 mt-2">57.43%</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className={cardClass}>
          <p className="text-sm">Net Profit</p>
          <h2 className="text-3xl font-bold text-green-500 mt-2">61.37%</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className={cardClass}>
          <p className="text-sm">Avg. Orders per month</p>
          <h2 className="text-3xl font-bold mt-2">43</h2>
        </motion.div>
      </div>

      {/* График и топ продаж */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className={cardClass}>
          <p className="text-sm mb-4">Avg. Sales</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#22c55e"
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className={cardClass}>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm">Top 5 Sales</p>
            <a className="text-xs text-blue-500 hover:underline cursor-pointer">
              See All
            </a>
          </div>
          <ul className="space-y-2">
            {topSales.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.item}</span>
                <span className="text-green-500 font-medium">
                  {item.units}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Инвойсы и продукты */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className={cardClass}>
          <p className="text-sm mb-4">Invoices</p>
          <p className="text-xs">Invoice Overall</p>
          <h3 className="text-xl font-bold">000231</h3>
          <p className="mt-2 text-sm">Amount Due</p>
          <h2 className="text-2xl font-bold">$800,000</h2>
          <div className="relative w-28 h-28 mt-6">
            <CircleGauge
              size={112}
              strokeWidth={12}
              className="text-green-500 rotate-[145deg]"
            />
            <p className="absolute inset-0 flex items-center justify-center text-xl font-bold">
              43%
            </p>
          </div>
          <p className="mt-2 text-sm">Due Date: Mar 24, 2020</p>
        </motion.div>

        <motion.div className={cardClass}>
          <p className="text-sm mb-4">Products</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-4xl">🍾</div>
              <p className="mt-2">Bottles</p>
            </div>
            <div className="text-center">
              <div className="text-4xl">🍷</div>
              <p className="mt-2">Glasses</p>
            </div>
            <div className="text-center">
              <div className="text-4xl">🥣</div>
              <p className="mt-2">Bowls</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Список закупок */}
      <motion.div className={`${cardClass} mt-6`}>
        <p className="text-sm mb-4">Requisition List</p>
        <div className="space-y-4">
          {[
            { name: "🍽 Dinner Set", count: 10 },
            { name: "🏀 Sports Bottles", count: 15 },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span>{item.name}</span>
              <input
                type="number"
                value={item.count}
                readOnly
                className={`${inputClass} w-16`}
              />
              <input
                type="text"
                placeholder="Add description..."
                className={`${inputClass} flex-1`}
              />
              <button className="bg-green-600 p-2 rounded">
                <Check className="text-white w-4 h-4" />
              </button>
              <button className="bg-red-600 p-2 rounded">
                <X className="text-white w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
 