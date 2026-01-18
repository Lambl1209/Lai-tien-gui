
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { BankRate, Term, TERM_LABELS } from '../types';

interface AnalysisChartProps {
  data: BankRate[];
  term: Term;
}

const AnalysisChart: React.FC<AnalysisChartProps> = ({ data, term }) => {
  // Tên ngân hàng mốc
  const REFERENCE_BANK = "Agribank Hà Tĩnh II";

  // 1. Lọc lấy ngân hàng mốc
  const refBankData = data.find(b => b.bankName.includes(REFERENCE_BANK));
  
  // 2. Lấy các ngân hàng còn lại, sắp xếp theo lãi suất giảm dần
  const otherBanks = data
    .filter(b => !b.bankName.includes(REFERENCE_BANK))
    .map(b => ({
      name: b.bankName,
      rate: b.rates[term] || 0,
      isRef: false
    }))
    .sort((a, b) => b.rate - a.rate);

  // 3. Kết hợp: Ngân hàng mốc + Top 8 ngân hàng cao nhất khác (tổng 9 cột cho thoáng)
  const topOthers = otherBanks.slice(0, 8);
  const chartData = refBankData 
    ? [...topOthers, { name: refBankData.bankName, rate: refBankData.rates[term] || 0, isRef: true }].sort((a, b) => b.rate - a.rate)
    : topOthers;

  // Tìm min/max để tối ưu trục Y, giúp thấy rõ sự chênh lệch
  const rates = chartData.map(d => d.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  
  // Thiết lập domain cho trục Y: lùi xuống một chút để "phóng đại" sự khác biệt
  // Nếu minRate là 4.5, trục Y bắt đầu từ 3.5 hoặc 4.0 để thấy cột chênh nhau rõ rệt
  const yDomain = [Math.max(0, Math.floor(minRate * 10) / 10 - 0.5), Math.ceil(maxRate * 10) / 10 + 0.3];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col mb-6">
        <h3 className="text-lg font-bold text-slate-800">So sánh với Agribank II - {TERM_LABELS[term]}</h3>
        <p className="text-[10px] text-slate-400 mt-1 italic leading-relaxed">
          * Cột <span className="text-amber-500 font-bold underline">Màu Vàng Cam</span> là Agribank Hà Tĩnh II để bạn đối chiếu nhanh.
        </p>
      </div>
      
      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            margin={{ top: 30, right: 10, left: -20, bottom: 80 }}
            barSize={32}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              interval={0} 
              height={100} 
              tick={({ x, y, payload }) => {
                const isRef = payload.value.includes(REFERENCE_BANK);
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="end"
                      fill={isRef ? "#d97706" : "#475569"}
                      transform="rotate(-45)"
                      style={{ fontSize: '10px', fontWeight: isRef ? '800' : '500' }}
                    >
                      {payload.value}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis 
              domain={yDomain} 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              unit="%" 
              axisLine={false}
              tickLine={false}
              tickCount={6}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Lãi suất']}
            />
            <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name.includes(REFERENCE_BANK) ? '#f59e0b' : '#3b82f6'} 
                  fillOpacity={entry.name.includes(REFERENCE_BANK) ? 1 : 0.8}
                />
              ))}
              <LabelList 
                dataKey="rate" 
                position="top" 
                formatter={(val: number) => `${val.toFixed(1)}%`}
                style={{ fontSize: '11px', fontWeight: 'bold', fill: '#1e293b' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 pt-4 border-t border-slate-50 flex justify-center items-center gap-6">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-amber-500 rounded-sm"></span>
          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tight">Agribank Hà Tĩnh II (Mốc)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-blue-500 rounded-sm opacity-80"></span>
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">Ngân hàng khác</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisChart;
