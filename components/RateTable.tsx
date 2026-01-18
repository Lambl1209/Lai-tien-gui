
import React, { useState, useMemo } from 'react';
import { BankRate, Term, TERMS, TERM_LABELS } from '../types';

interface RateTableProps {
  data: BankRate[];
}

const RateTable: React.FC<RateTableProps> = ({ data }) => {
  const [sortTerm, setSortTerm] = useState<Term>('12M');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const uniqueData = useMemo(() => {
    const seen = new Set();
    return data.filter(bank => {
      const name = bank.bankName.trim().toLowerCase();
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    });
  }, [data]);

  const maxRates = useMemo(() => {
    const maxs: Record<string, number> = {};
    TERMS.forEach(term => {
      const validRates = uniqueData.map(b => b.rates[term] || 0).filter(r => r > 0);
      maxs[term] = validRates.length > 0 ? Math.max(...validRates) : 0;
    });
    return maxs;
  }, [uniqueData]);

  const sortedData = useMemo(() => {
    return [...uniqueData].sort((a, b) => {
      const valA = a.rates[sortTerm] || 0;
      const valB = b.rates[sortTerm] || 0;
      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });
  }, [uniqueData, sortTerm, sortOrder]);

  const toggleSort = (term: Term) => {
    if (sortTerm === term) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortTerm(term);
      setSortOrder('desc');
    }
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
      <div className="bg-white px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-50 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-7 bg-indigo-600 rounded-full"></div>
          <div>
            <h3 className="text-slate-900 font-extrabold text-lg tracking-tight">So sánh lãi suất chi tiết</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-0.5">Dữ liệu ngân hàng tại Hà Tĩnh</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-2 rounded-xl border border-indigo-100">
          <span className="text-[10px] text-indigo-400 font-bold uppercase">Xếp theo:</span>
          <span className="text-xs text-indigo-700 font-black">{TERM_LABELS[sortTerm]}</span>
          <span className="text-indigo-400 text-[10px]">
            {sortOrder === 'desc' ? '▼' : '▲'}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/30">
              <th className="pl-8 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest w-16 text-center">
                #
              </th>
              <th className="px-6 py-5 font-bold text-slate-900 text-[11px] uppercase tracking-widest sticky left-0 bg-white/95 backdrop-blur-sm z-30 border-r border-slate-100">
                Ngân Hàng
              </th>
              {TERMS.map((term) => (
                <th 
                  key={term} 
                  onClick={() => toggleSort(term)}
                  className={`px-4 py-5 font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:bg-white transition-all text-center group min-w-[105px] ${
                    sortTerm === term ? 'text-indigo-600 bg-indigo-50/30' : 'text-slate-400'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="opacity-50 text-[8px]">Kỳ hạn</span>
                    <div className="flex items-center gap-1">
                      {TERM_LABELS[term]}
                      <span className={`text-[8px] transition-all ${sortTerm === term ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover:opacity-30'}`}>
                        {sortOrder === 'desc' ? '▼' : '▲'}
                      </span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sortedData.map((bank, idx) => {
              const nameLower = bank.bankName.toLowerCase();
              const isAgriII = nameLower.includes("hà tĩnh ii");
              const rank = idx + 1;
              
              return (
                <tr 
                  key={bank.code} 
                  className={`group transition-all duration-300 hover:bg-indigo-50/30 ${
                    idx % 2 === 1 ? 'bg-slate-50/20' : 'bg-white'
                  }`}
                >
                  <td className="pl-8 py-5 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-[12px] font-black transition-all ${
                      rank === 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 
                      rank === 2 ? 'bg-slate-200 text-slate-600' :
                      rank === 3 ? 'bg-slate-100 text-slate-500' :
                      'text-slate-300'
                    }`}>
                      {rank}
                    </span>
                  </td>

                  <td className={`px-6 py-5 sticky left-0 z-20 transition-colors border-r border-slate-100 ${
                    idx % 2 === 1 ? 'bg-slate-50/95' : 'bg-white/95'
                  } backdrop-blur-sm group-hover:bg-indigo-50/50`}>
                    <div className="flex items-center gap-4">
                      {isAgriII && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 shadow-[2px_0_10px_rgba(244,63,94,0.3)]"></div>
                      )}
                      <div className="flex flex-col min-w-[170px]">
                        <div className={`text-[14px] font-bold tracking-tight ${isAgriII ? 'text-slate-900' : 'text-slate-800'}`}>
                          {bank.bankName}
                        </div>
                        
                        {isAgriII ? (
                          <div className="mt-1 flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter">Cơ hội trúng Ôtô HRV</span>
                              <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                            </div>
                            <div className="text-[9px] text-slate-400 font-medium">Ưu đãi độc quyền Xuân 2026</div>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mt-1">
                            {bank.code}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {TERMS.map((term) => {
                    const rate = bank.rates[term] || 0;
                    const isMax = rate === maxRates[term] && rate > 0;
                    const isSelectedSort = sortTerm === term;
                    
                    return (
                      <td key={term} className={`px-4 py-5 text-center transition-all ${isSelectedSort ? 'bg-indigo-50/10' : ''}`}>
                        <div className="flex flex-col items-center">
                          <span className={`text-[14px] font-bold tracking-tight px-3 py-1.5 rounded-xl transition-all ${
                            isMax 
                            ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' 
                            : isSelectedSort ? 'text-indigo-600 font-black' : 'text-slate-600 font-medium'
                          }`}>
                            {rate > 0 ? `${rate.toFixed(2)}%` : '--'}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-50 ring-1 ring-emerald-200 rounded-md"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lãi suất cao nhất</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-rose-500 rounded-full shadow-sm shadow-rose-200"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agribank HT II</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
             <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
             <span className="text-[10px] font-bold italic">Cập nhật theo biểu phí niêm yết chính thức</span>
          </div>
        </div>
        
        {/* Ghi chú nhỏ theo yêu cầu người dùng */}
        <div className="mt-2 pt-4 border-t border-slate-100">
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
            <span className="font-black text-indigo-600 uppercase mr-2 tracking-tighter">Ghi chú:</span>
            Lãi suất có thể thay đổi tùy theo khu vực và quy mô chi nhánh tại TP Hà Tĩnh. Một số ngân hàng có thể áp dụng lãi suất ưu đãi cao hơn cho các khoản gửi lớn (trên 1 tỷ VND).
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateTable;
