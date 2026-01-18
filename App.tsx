
import React, { useState, useEffect, useCallback } from 'react';
import RateTable from './components/RateTable';
import Calculator from './components/Calculator';
import AnalysisChart from './components/AnalysisChart';
import { INITIAL_DATA } from './constants';
import { BankRate, Term, GroundingSource } from './types';
import { fetchLatestRates } from './services/geminiService';

const App: React.FC = () => {
  const [data, setData] = useState<BankRate[]>(INITIAL_DATA);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleString('vi-VN'));
  const [error, setError] = useState<string | null>(null);
  const [activeChartTerm, setActiveChartTerm] = useState<Term>('12M');

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchLatestRates();
      if (result.rates && result.rates.length > 0) {
        setData(result.rates);
        setSources(result.sources);
        setLastUpdate(new Date().toLocaleString('vi-VN'));
      }
    } catch (err) {
      setError("Không thể cập nhật dữ liệu mới nhất. Vui lòng thử lại sau.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
              HT
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900 leading-tight">Lãi Suất Ngân Hàng</h1>
              <p className="text-xs text-slate-500 font-medium">TP Hà Tĩnh - Vietnam</p>
            </div>
          </div>
          <button 
            onClick={handleUpdate}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              loading 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            {loading ? 'Đang cập nhật...' : 'Cập nhật AI'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        {/* Status bar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Bảng so sánh lãi suất</h2>
            <p className="text-slate-500 mt-1">Theo dõi biến động lãi suất của 20 ngân hàng tại khu vực Hà Tĩnh.</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               Cập nhật lần cuối: <span className="font-semibold text-slate-700">{lastUpdate}</span>
             </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table Area */}
          <div className="lg:col-span-2 space-y-8">
            <RateTable data={data} />
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800">Nguồn dữ liệu tham khảo</h3>
                  <span className="text-xs text-slate-400">Được trích xuất bởi Gemini Search</span>
               </div>
               <div className="flex flex-wrap gap-2">
                 {sources.length > 0 ? sources.map((s, idx) => (
                   <a 
                    key={idx} 
                    href={s.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-slate-50 text-blue-600 hover:underline px-3 py-1 rounded-full border border-slate-100 truncate max-w-[200px]"
                   >
                     {s.title}
                   </a>
                 )) : (
                   <p className="text-sm text-slate-400 italic">Dữ liệu được tổng hợp từ các biểu phí niêm yết công khai tại Hà Tĩnh.</p>
                 )}
               </div>
            </div>
          </div>

          {/* Sidebar / Tools */}
          <div className="space-y-8">
            <Calculator data={data} />
            
            <AnalysisChart data={data} term={activeChartTerm} />
            
            <div className="flex flex-wrap gap-2 justify-center">
              {(['6M', '12M', '13M'] as Term[]).map(t => (
                <button
                  key={t}
                  onClick={() => setActiveChartTerm(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeChartTerm === t 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  Xem {t}
                </button>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2 text-sm uppercase tracking-wide">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Lưu ý quan trọng
              </h4>
              <p className="text-amber-800 text-xs leading-relaxed opacity-90">
                Lãi suất có thể thay đổi tùy theo khu vực và quy mô chi nhánh tại TP Hà Tĩnh. Một số ngân hàng có thể áp dụng lãi suất ưu đãi cao hơn cho các khoản gửi lớn (trên 1 tỷ VND). 
                <br /><br />
                Vui lòng liên hệ trực tiếp chi nhánh ngân hàng gần nhất để có thông tin chính xác nhất trước khi giao dịch.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 mt-16 text-center text-slate-400 text-xs">
        <p>© 2024 Ha Tinh Banking Dashboard. Dữ liệu được hỗ trợ bởi Gemini AI Flash Pro.</p>
        <p className="mt-2">Lưu ý: Công cụ chỉ mang tính chất tham khảo so sánh, không chịu trách nhiệm cho các quyết định tài chính cá nhân.</p>
      </footer>
    </div>
  );
};

export default App;
