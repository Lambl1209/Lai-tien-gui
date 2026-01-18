
import React, { useState, useEffect } from 'react';
import { BankRate, Term, TERMS, TERM_LABELS } from '../types';

interface CalculatorProps {
  data: BankRate[];
}

const Calculator: React.FC<CalculatorProps> = ({ data }) => {
  const [amount, setAmount] = useState<number>(100000000); // Default 100M
  const [selectedTerm, setSelectedTerm] = useState<Term>('12M');
  const [bestBank, setBestBank] = useState<BankRate | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      const sorted = [...data].sort((a, b) => (b.rates[selectedTerm] || 0) - (a.rates[selectedTerm] || 0));
      setBestBank(sorted[0]);
    }
  }, [selectedTerm, data]);

  const calculateInterest = (rate: number, termStr: string) => {
    const months = parseInt(termStr);
    return (amount * rate * months) / (100 * 12);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Công cụ tính lãi suất
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 opacity-90">Số tiền gửi (VND)</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="Nhập số tiền..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 opacity-90">Kỳ hạn gửi</label>
          <div className="grid grid-cols-3 gap-2">
            {TERMS.map((term) => (
              <button
                key={term}
                onClick={() => setSelectedTerm(term)}
                className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${
                  selectedTerm === term 
                  ? 'bg-white text-blue-700 shadow-lg' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {TERM_LABELS[term]}
              </button>
            ))}
          </div>
        </div>

        {bestBank && (
          <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm opacity-80 uppercase tracking-wider font-semibold">Tốt nhất hiện tại</span>
              <span className="bg-green-400 text-green-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Recommend</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-lg font-bold">{bestBank.bankName}</span>
              <span className="text-xl font-bold">{bestBank.rates[selectedTerm]}%</span>
            </div>
            <hr className="border-white/10 my-3" />
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-80">Tiền lãi ước tính:</span>
              <span className="text-lg font-bold text-yellow-300">
                {formatCurrency(calculateInterest(bestBank.rates[selectedTerm], selectedTerm))}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm opacity-80">Tổng nhận (Gốc + Lãi):</span>
              <span className="font-semibold">
                {formatCurrency(amount + calculateInterest(bestBank.rates[selectedTerm], selectedTerm))}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
