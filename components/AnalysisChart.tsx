
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BankRate, Term, TERM_LABELS } from '../types';

interface AnalysisChartProps {
  data: BankRate[];
  term: Term;
}

const AnalysisChart: React.FC<AnalysisChartProps> = ({ data, term }) => {
  const chartData = data
    .map(b => ({
      name: b.bankName,
      rate: b.rates[term] || 0
    }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 10); // Show top 10

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800">Biểu đồ so sánh - Kỳ hạn {TERM_LABELS[term]}</h3>
        <span className="text-xs text-slate-400">Top 10 ngân hàng lãi cao nhất</span>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              interval={0} 
              height={70} 
              tick={{ fontSize: 10, fill: '#64748b' }} 
            />
            <YAxis domain={[0, 'auto']} tick={{ fontSize: 12, fill: '#64748b' }} unit="%" />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#94a3b8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalysisChart;
