
import React, { useState, useMemo } from 'react';
import { BankRate, Term, TERMS, TERM_LABELS } from '../types';

interface RateTableProps {
  data: BankRate[];
}

const RateTable: React.FC<RateTableProps> = ({ data }) => {
  const [sortTerm, setSortTerm] = useState<Term>('12M');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Tìm lãi suất cao nhất cho mỗi kỳ hạn để highlight
  const maxRates = useMemo(() => {
    const maxs: Record<string, number> = {};
    TERMS.forEach(term => {
      maxs[term] = Math.max(...data.map(b => b.rates[term] || 0));
    });
    return maxs;
  }, [data]);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const valA = a.rates[sortTerm] || 0;
      const valB = b.rates[sortTerm] || 0;
      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });
  }, [data, sortTerm, sortOrder]);

  const toggleSort = (term: Term) => {
    if (sortTerm === term) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortTerm(term);
      setSortOrder('desc');
    }
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-[2rem] shadow-sm border border-slate-100">
      {/* Top Header Section */}
      <div className="bg-slate-50/80 px-6 py-5 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 bg-indigo-400 rounded-full"></div>
          <h3 className="text-slate-700 font-bold text-sm uppercase tracking-wider">Xếp hạng lãi suất</h3>
        </div>
        <div className="text-[11px] text-slate-400 font-medium bg-white px-3 py-1 rounded-full border border-slate-200">
          Ưu tiên: <span className="text-indigo-500 font-bold">{TERM_LABELS[sortTerm]}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-50">
              <th className="pl-6 py-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest w-12 text-center">
                STT
              </th>
              <th className="px-6 py-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest sticky left-0 bg-white z-20">
                Ngân Hàng
              </th>
              {TERMS.map((term) => (
                <th 
                  key={term} 
                  onClick={() => toggleSort(term)}
                  className={`px-4 py-4 font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-all text-center group ${
                    sortTerm === term ? 'text-indigo-600' : 'text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {TERM_LABELS[term]}
                    <span className={`transition-opacity duration-300 ${sortTerm === term ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sortedData.map((bank, idx) => {
              const isAgriII = bank.bankName.includes("Agribank Hà Tĩnh II");
              const rank = idx + 1;
              
              return (
                <tr 
                  key={bank.code} 
                  className={`group transition-all duration-200 hover:bg-slate-50/50 ${
                    isAgriII ? 'bg-amber-50/20' : ''
                  }`}
                >
                  {/* Cột Thứ tự (STT) */}
                  <td className="pl-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${
                      rank === 1 ? 'bg-indigo-100 text-indigo-600' : 
                      rank === 2 ? 'bg-slate-100 text-slate-500' :
                      rank === 3 ? 'bg-slate-100 text-slate-400' :
                      'text-slate-300'
                    }`}>
                      {rank}
                    </span>
                  </td>

                  <td className={`px-6 py-4 sticky left-0 z-10 transition-colors ${
                    isAgriII ? 'bg-amber-50/5' : 'bg-white'
                  } group-hover:bg-slate-50/10`}>
                    <div>
                      <div className={`text-sm font-semibold tracking-tight ${isAgriII ? 'text-red-700' : 'text-slate-700'}`}>
                        {bank.bankName}
                      </div>
                      {isAgriII && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="w-1 h-1 bg-red-400 rounded-full animate-pulse"></span>
                          <span className="text-[8px] text-red-400 font-bold uppercase tracking-tighter">Ưu đãi xuân</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {TERMS.map((term) => {
                    const isMax = bank.rates[term] === maxRates[term];
                    const isSelectedSort = sortTerm === term;
                    
                    return (
                      <td key={term} className={`px-4 py-4 text-center transition-all ${isSelectedSort ? 'bg-indigo-50/10' : ''}`}>
                        <div className="flex flex-col items-center">
                          <span className={`text-sm font-bold tracking-tight transition-all ${
                            isMax 
                            ? 'text-emerald-500' 
                            : isSelectedSort ? 'text-indigo-600' : 'text-slate-500'
                          }`}>
                            {bank.rates[term]?.toFixed(2)}%
                          </span>
                          {isMax && (
                            <div className="w-4 h-0.5 bg-emerald-200 mt-1 rounded-full"></div>
                          )}
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
      
      {/* Footer Info Section */}
      <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Cao nhất kỳ hạn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Cơ sở Hà Tĩnh II</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 italic font-medium">
          Dữ liệu niêm yết công khai
        </div>
      </div>
    </div>
  );
};

export default RateTable;
