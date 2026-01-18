
import React, { useState, useEffect, useMemo } from 'react';
import { BankRate, Term, TERMS, TERM_LABELS, SavedCalculation } from '../types';

interface CalculatorProps {
  data: BankRate[];
}

const STORAGE_HISTORY_KEY = 'hatinh_bank_calc_history';

const Calculator: React.FC<CalculatorProps> = ({ data }) => {
  const [amount, setAmount] = useState<number>(100000000);
  const [selectedTerm, setSelectedTerm] = useState<Term>('12M');
  const [selectedBankCode, setSelectedBankCode] = useState<string>('');
  const [history, setHistory] = useState<SavedCalculation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Lỗi khi đọc lịch sử tính toán", e);
      }
    }
  }, []);

  // Sync history to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

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

  const handleSave = () => {
    if (!currentBank) return;
    const interest = calculateInterest(currentBank.rates[selectedTerm] || 0, selectedTerm);
    const newEntry: SavedCalculation = {
      id: Date.now().toString(),
      bankName: currentBank.bankName,
      amount: amount,
      rate: currentBank.rates[selectedTerm] || 0,
      term: TERM_LABELS[selectedTerm],
      interest: interest,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
    setHistory([newEntry, ...history].slice(0, 10));
    setShowHistory(true);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const removeHistoryItem = (id: string) => {
    setHistory(history.filter(item => item.id !== id));
  };

  const interest = currentBank ? calculateInterest(currentBank.rates[selectedTerm] || 0, selectedTerm) : 0;
  const isAgriII = currentBank?.bankName.includes("Agribank Hà Tĩnh II");
  const isEligibleForPromo = isAgriII && amount >= 6000000;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-700 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <h3 className="text-xl font-black mb-8 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
               </svg>
            </div>
            Tính lãi tiết kiệm
          </div>
          {history.length > 0 && (
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="text-[9px] bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-black uppercase tracking-widest backdrop-blur-sm"
            >
              {showHistory ? 'Ẩn lịch sử' : `Lịch sử (${history.length})`}
            </button>
          )}
        </h3>

        <div className="space-y-6 relative z-10">
          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-indigo-300 opacity-80">Số tiền gửi (VNĐ)</label>
            <div className="relative">
              <input 
                type="number" 
                value={amount === 0 ? '' : amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-white/10 border border-white/20 rounded-[1.25rem] p-5 text-2xl font-black text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/15 transition-all shadow-inner"
                placeholder="0"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-indigo-300 font-black pointer-events-none text-xs bg-indigo-950/50 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/5">
                {formatAmountToWords(amount)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 opacity-80">Ngân hàng</label>
              <select 
                value={selectedBankCode}
                onChange={(e) => setSelectedBankCode(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer shadow-lg"
              >
                {data.map(bank => (
                  <option key={bank.code} value={bank.code}>{bank.bankName}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 opacity-80">Kỳ hạn gửi</label>
              <select 
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value as Term)}
                className="w-full bg-slate-800 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer shadow-lg"
              >
                {TERMS.map(term => (
                  <option key={term} value={term}>{TERM_LABELS[term]}</option>
                ))}
              </select>
            </div>
          </div>

          {currentBank && (
            <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-slate-50 px-8 py-5 flex justify-between items-center border-b border-slate-100">
                <div className="flex flex-col">
                  <span className="text-slate-900 font-black text-xs uppercase tracking-tight">{currentBank.bankName}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-indigo-600 text-[10px] font-black">Lãi suất: {currentBank.rates[selectedTerm]?.toFixed(2)}%/năm</span>
                  </div>
                </div>
                <button 
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-indigo-100 ${
                    isSaved ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      Đã lưu
                    </>
                  ) : (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                      Lưu kết quả
                    </>
                  )}
                </button>
              </div>
              
              <div className="p-8 space-y-5">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-widest">Tiền gốc gửi vào</span>
                  <span className="text-slate-900 font-bold text-sm">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Lãi nhận được</span>
                  <span className="text-emerald-600 font-black text-2xl">+{formatCurrency(interest)}</span>
                </div>

                {isEligibleForPromo && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4">
                    <div className="text-2xl animate-bounce">🚗</div>
                    <div>
                      <p className="text-[10px] font-black text-rose-600 uppercase">Ưu đãi Agribank Hà Tĩnh II</p>
                      <p className="text-[11px] text-rose-700 font-bold">Bạn nhận được phiếu dự thưởng Ô tô Honda HR-V!</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
                  <span className="text-slate-900 font-black text-[10px] uppercase tracking-widest mb-1.5">Tổng số tiền nhận</span>
                  <div className="text-right">
                     <div className="text-3xl font-black text-indigo-700 leading-none tracking-tighter">
                       {formatCurrency(amount + interest)}
                     </div>
                     <div className="text-[10px] text-slate-400 font-bold mt-2 uppercase italic opacity-60">
                       ~ {formatAmountToWords(amount + interest)}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showHistory && history.length > 0 && (
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-3">
              <div className="w-2 h-5 bg-indigo-500 rounded-full"></div>
              Lịch sử tính toán đã lưu
            </h4>
            <button 
              onClick={() => { if(window.confirm('Xóa tất cả lịch sử đã lưu?')) setHistory([]); }}
              className="text-[9px] font-black text-slate-300 hover:text-rose-500 uppercase tracking-widest transition-colors"
            >
              Dọn dẹp tất cả
            </button>
          </div>
          
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="group flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-800">{item.bankName}</span>
                    <span className="text-[9px] font-black text-indigo-500 px-2 py-0.5 bg-indigo-50 rounded-lg uppercase">{item.term}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-slate-400 font-medium">Gốc: {formatCurrency(item.amount)}</span>
                    <span className="text-[10px] text-emerald-600 font-black">Lãi: +{formatCurrency(item.interest)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <span className="text-[9px] font-black text-slate-300 group-hover:text-indigo-400 transition-colors uppercase tracking-widest">{item.timestamp}</span>
                  <button 
                    onClick={() => removeHistoryItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all bg-white rounded-xl shadow-sm border border-slate-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] italic">
            Lịch sử lưu trữ cục bộ trên trình duyệt
          </p>
        </div>
      )}
    </div>
  );
};

export default Calculator;
