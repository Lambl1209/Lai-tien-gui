
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BankRate, Term } from '../types';

interface AnalysisChartProps {
  data: BankRate[];
  term: Term;
}

const AnalysisChart: React.FC<AnalysisChartProps> = ({ data, term }) => {
  const REFERENCE_BANK = "Agribank Hà Tĩnh II";

  const refBankData = data.find(b => b.bankName.includes(REFERENCE_BANK));
  const otherBanks = data
    .filter(b => !b.bankName.includes(REFERENCE_BANK))
    .map(b => ({
      name: b.bankName,
      rate: b.rates[term] || 0,
      isRef: false
    }))
    .sort((a, b) => b.rate - a.rate);

  const topOthers = otherBanks.slice(0, 8);
  const chartData = refBankData 
    ? [...topOthers, { name: refBankData.bankName, rate: refBankData.rates[term] || 0, isRef: true }].sort((a, b) => b.rate - a.rate)
    : topOthers;

  const rates = chartData.map(d => d.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const yDomain = [Math.max(0, Math.floor(minRate * 10) / 10 - 0.5), Math.ceil(maxRate * 10) / 10 + 0.3];

  return (
    <div className="w-full">
      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: -35, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              interval={0}
              height={1}
              tick={({ x, y, payload }) => {
                const isRef = payload.value.includes(REFERENCE_BANK);
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="end"
                      fill={isRef ? "#d97706" : "#64748b"}
                      transform="rotate(-45)"
                      style={{ 
                        fontSize: '9px', 
                        fontWeight: isRef ? '800' : '600',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {payload.value}
                    </text>
                  </g>
                );
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis domain={yDomain} tick={{ fontSize: 10, fill: '#64748b' }} unit="%" axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', 
                fontSize: '11px',
                fontWeight: 'bold',
                padding: '8px 12px'
              }} 
            />
            <Bar dataKey="rate" radius={[6, 6, 0, 0]} barSize={22}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name.includes(REFERENCE_BANK) ? '#f59e0b' : '#3b82f6'} 
                  fillOpacity={entry.name.includes(REFERENCE_BANK) ? 1 : 0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-amber-500 rounded-sm shadow-sm"></span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">AGRIBANK HÀ TĨNH II (MỐC)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-blue-500 rounded-sm shadow-sm"></span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">NGÂN HÀNG KHÁC</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisChart;
