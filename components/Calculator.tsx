
import React, { useState, useEffect, useMemo } from 'react';
import { BankRate, Term, TERMS, TERM_LABELS } from '../types';

interface CalculatorProps {
  data: BankRate[];
}

const Calculator: React.FC<CalculatorProps> = ({ data }) => {
  const [amount, setAmount] = useState<number>(100000000); // Mặc định 100 triệu
  const [selectedTerm, setSelectedTerm] = useState<Term>('12M');
  const [selectedBankCode, setSelectedBankCode] = useState<string>('');

  // Tự động chọn ngân hàng có lãi suất cao nhất cho kỳ hạn đã chọn nếu chưa chọn ngân hàng
  useEffect(() => {
    if (data.length > 0 && !selectedBankCode) {
      const sorted = [...data].sort((a, b) => (b.rates[selectedTerm] || 0) - (a.rates[selectedTerm] || 0));
      setSelectedBankCode(sorted[0].code);
    }
  }, [data, selectedTerm, selectedBankCode]);

  const currentBank = useMemo(() => 
    data.find(b => b.code === selectedBankCode) || data[0]
  , [data, selectedBankCode]);

  const calculateInterest = (rate: number, termStr: string) => {
    const months = parseInt(termStr);
    return (amount * rate * months) / (100 * 12);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const formatAmountToWords = (num: number) => {
    if (!num || num <= 0) return '0 đ';
    if (num >= 1000000000) {
      const billions = Math.floor(num / 1000000000);
      const millions = Math.floor((num % 1000000000) / 1000000);
      return `${billions} tỷ ${millions > 0 ? millions + ' triệu' : ''}`;
    }
    if (num >= 1000000) {
      return `${Math.floor(num / 1000000)} triệu`;
    }
    return `${num.toLocaleString('vi-VN')} đ`;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setAmount(0);
    } else {
      const parsed = parseInt(val, 10);
      setAmount(isNaN(parsed) ? 0 : parsed);
    }
  };

  const interest = currentBank ? calculateInterest(currentBank.rates[selectedTerm] || 0, selectedTerm) : 0;

  // Kiểm tra điều kiện khuyến mãi Agribank II
  const isAgriII = currentBank?.bankName.includes("Agribank Hà Tĩnh II");
  const isEligibleForPromo = isAgriII && amount >= 6000000;

  return (
    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-2xl p-6 text-white shadow-xl border border-white/10">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Tính lãi tiết kiệm
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">Số tiền gửi (VND)</label>
          <div className="relative">
            <input 
              type="number" 
              value={amount === 0 ? '' : amount}
              onChange={handleAmountChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pt-4 text-xl font-bold text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Nhập số tiền..."
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 font-bold pointer-events-none text-sm">
              {formatAmountToWords(amount)}
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            {[50000000, 100000000, 500000000].map(val => (
              <button 
                key={val}
                onClick={() => setAmount(val)}
                className="text-[10px] px-2 py-1 bg-white/5 hover:bg-white/20 rounded border border-white/10 transition-colors"
              >
                {val >= 1000000000 ? val/1000000000 + ' Tỷ' : val/1000000 + ' Tr'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">Ngân hàng</label>
          <div className="relative">
            <select 
              value={selectedBankCode}
              onChange={(e) => setSelectedBankCode(e.target.value)}
              className="w-full bg-slate-800 border border-white/20 rounded-xl p-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              {data.map(bank => (
                <option key={bank.code} value={bank.code} className="bg-slate-800 text-white">
                  {bank.bankName} (Lãi: {bank.rates[selectedTerm]?.toFixed(1)}%)
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">Kỳ hạn gửi</label>
          <div className="grid grid-cols-3 gap-2">
            {TERMS.map((term) => (
              <button
                key={term}
                onClick={() => setSelectedTerm(term)}
                className={`py-2 rounded-lg text-sm font-bold transition-all border ${
                  selectedTerm === term 
                  ? 'bg-white text-blue-900 border-white shadow-lg scale-[1.02]' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                {TERM_LABELS[term]}
              </button>
            ))}
          </div>
        </div>

        {/* Kết quả chi tiết Gốc và Lãi */}
        {currentBank && (
          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="bg-blue-50 px-5 py-3 flex justify-between items-center border-b border-blue-100">
              <span className="text-blue-900 font-bold text-sm">{currentBank.bankName}</span>
              <span className="text-blue-600 font-black text-sm">{currentBank.rates[selectedTerm]?.toFixed(1)}%/năm</span>
            </div>
            
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-medium uppercase">Tiền gốc</span>
                <span className="text-slate-900 font-bold">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-medium uppercase">Tiền lãi dự kiến</span>
                <span className="text-green-600 font-black text-lg">+{formatCurrency(interest)}</span>
              </div>

              {/* Tư vấn khuyến mãi thông minh */}
              {isEligibleForPromo && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 animate-pulse">
                  <span className="text-lg">🎁</span>
                  <div>
                    <p className="text-[10px] font-black text-red-600 uppercase">Bạn đủ điều kiện dự thưởng!</p>
                    <p className="text-[10px] text-red-700 leading-tight">Bạn sẽ nhận được mã số dự thưởng tham gia quay số trúng Ô tô Honda HR-V và nhiều giải thưởng khác.</p>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-between items-end">
                <span className="text-slate-900 font-bold text-xs uppercase">Tổng cộng</span>
                <div className="text-right">
                   <div className="text-2xl font-black text-blue-700 leading-none">
                     {formatCurrency(amount + interest)}
                   </div>
                   <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
                     ~ {formatAmountToWords(amount + interest)}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
