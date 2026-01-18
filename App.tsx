
import React, { useState, useEffect, useCallback } from 'react';
import RateTable from './components/RateTable';
import Calculator from './components/Calculator';
import AnalysisChart from './components/AnalysisChart';
import SpecialPromotion from './components/SpecialPromotion';
import EmployeeConsultationGuide from './components/EmployeeConsultationGuide';
import { INITIAL_DATA } from './constants';
import { BankRate, Term, GroundingSource, TERMS } from './types';
import { fetchLatestRates } from './services/geminiService';

// Toast Component
const Toast = ({ 
  message, 
  type, 
  onClose, 
  sources 
}: { 
  message: string, 
  type: 'success' | 'error' | 'loading', 
  onClose: () => void,
  sources?: GroundingSource[]
}) => {
  useEffect(() => {
    if (type !== 'loading') {
      const timer = setTimeout(onClose, 6000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  const icons = {
    loading: (
      <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
    success: (
      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  };

  const bgColors = {
    loading: 'bg-white border-blue-100',
    success: 'bg-white border-green-100',
    error: 'bg-white border-red-100'
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex flex-col gap-2 p-4 rounded-2xl shadow-2xl border ${bgColors[type]} animate-bounce-in max-w-sm w-full sm:w-80`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icons[type]}
          <span className="text-sm font-bold text-slate-700">{message}</span>
        </div>
        {type !== 'loading' && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {type === 'success' && sources && sources.length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nguồn tham khảo:</p>
          <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto pr-1">
            {sources.slice(0, 4).map((source, idx) => (
              <a 
                key={idx} 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] text-blue-600 hover:text-blue-800 underline line-clamp-1 flex items-center gap-1"
              >
                <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {source.title}
              </a>
            ))}
            {sources.length > 4 && <p className="text-[10px] text-slate-400 italic">Và {sources.length - 4} nguồn khác...</p>}
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<BankRate[]>(INITIAL_DATA);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleString('vi-VN'));
  const [error, setError] = useState<string | null>(null);
  const [activeChartTerm, setActiveChartTerm] = useState<Term>('12M');
  
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'loading', sources?: GroundingSource[] } | null>(null);

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setToast({ message: "Đang cập nhật dữ liệu lãi suất mới nhất...", type: 'loading' });
    
    try {
      const result = await fetchLatestRates();
      if (result.rates && result.rates.length > 0) {
        setData(result.rates);
        setSources(result.sources);
        setLastUpdate(new Date().toLocaleString('vi-VN'));
        setToast({ 
          message: "Cập nhật dữ liệu thành công!", 
          type: 'success', 
          sources: result.sources 
        });
      } else {
        throw new Error("Empty data");
      }
    } catch (err) {
      const msg = "Không thể cập nhật dữ liệu. Vui lòng thử lại.";
      setError(msg);
      setToast({ message: "Cập nhật thất bại!", type: 'error' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen pb-12 relative">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          sources={toast.sources}
          onClose={() => setToast(null)} 
        />
      )}

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
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
              loading 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-100'
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            )}
            {loading ? 'Đang cập nhật...' : 'Cập nhật'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Bảng so sánh lãi suất</h2>
            <p className="text-slate-500 mt-1">Theo dõi biến động lãi suất của 20 ngân hàng tại khu vực Hà Tĩnh.</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RateTable data={data} />
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800">Nguồn dữ liệu tham khảo</h3>
                  <span className="text-xs text-slate-400">Được trích xuất bởi Gemini 3 Pro Search</span>
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

          <div className="space-y-8">
            {/* 1. Khuyến mãi đặc biệt (Lên đầu tiên) */}
            <SpecialPromotion />

            {/* 2. Hướng dẫn cho cán bộ (Bỏ xuống dưới khuyến mãi) */}
            <EmployeeConsultationGuide />
            
            <Calculator data={data} />
            
            <AnalysisChart data={data} term={activeChartTerm} />
            
            <div className="flex flex-wrap gap-2 justify-center">
              {TERMS.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveChartTerm(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeChartTerm === t 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {t}
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

      <footer className="max-w-7xl mx-auto px-4 mt-16 text-center text-slate-400 text-xs">
        <p>© 2026 Ha Tinh Banking Dashboard. Dữ liệu được cập nhật tự động bởi hệ thống Gemini 3 Pro.</p>
        <p className="mt-2">Lưu ý: Công cụ chỉ mang tính chất tham khảo so sánh, không chịu trách nhiệm cho các quyết định tài chính cá nhân.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-in {
          0% { transform: translateY(100px) scale(0.9); opacity: 0; }
          60% { transform: translateY(-10px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}} />
    </div>
  );
};

export default App;
