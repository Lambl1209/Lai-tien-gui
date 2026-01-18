
import React, { useState } from 'react';
import { BankRate, Term, TERMS, TERM_LABELS } from '../types';

interface RateTableProps {
  data: BankRate[];
}

const RateTable: React.FC<RateTableProps> = ({ data }) => {
  const [sortTerm, setSortTerm] = useState<Term>('12M');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...data].sort((a, b) => {
    const valA = a.rates[sortTerm] || 0;
    const valB = b.rates[sortTerm] || 0;
    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  const toggleSort = (term: Term) => {
    if (sortTerm === term) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortTerm(term);
      setSortOrder('desc');
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="p-4 font-semibold text-slate-700 whitespace-nowrap">Ngân Hàng</th>
            {TERMS.map((term) => (
              <th 
                key={term} 
                onClick={() => toggleSort(term)}
                className={`p-4 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap ${sortTerm === term ? 'bg-blue-50 text-blue-700' : ''}`}
              >
                <div className="flex items-center gap-1">
                  {TERM_LABELS[term]}
                  {sortTerm === term && (
                    <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
                  )}
                </div>
              </th>
            ))}
            <th className="p-4 font-semibold text-slate-700 whitespace-nowrap">Cập Nhật</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((bank, idx) => (
            <tr key={bank.code} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
              <td className="p-4 font-medium text-slate-900 sticky left-0 bg-inherit shadow-[4px_0_4px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                {bank.bankName}
              </td>
              {TERMS.map((term) => (
                <td key={term} className={`p-4 text-slate-600 ${sortTerm === term ? 'font-bold text-blue-600 bg-blue-50/30' : ''}`}>
                  {bank.rates[term]?.toFixed(2)}%
                </td>
              ))}
              <td className="p-4 text-slate-400 text-sm">
                {bank.lastUpdated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RateTable;
