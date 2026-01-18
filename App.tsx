
import React, { useState, useEffect, useCallback } from 'react';
import RateTable from './components/RateTable';
import Calculator from './components/Calculator';
import AnalysisChart from './components/AnalysisChart';
import SpecialPromotion from './components/SpecialPromotion';
import EmployeeConsultationGuide from './components/EmployeeConsultationGuide';
import { INITIAL_DATA } from './constants';
import { BankRate, Term, GroundingSource, TERMS, RateHistoryEntry } from './types';
import { fetchLatestRates } from './services/geminiService';

const STORAGE_KEY = 'hatinh_bank_rates_data';
const HISTORY_KEY = 'hatinh_bank_rates_history';

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

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex flex-col gap-2 p-4 rounded-2xl shadow-2xl border bg-white animate-bounce-in max-w-sm w-full sm:w-80 ${type === 'loading' ? 'border-blue-100' : type === 'success' ? 'border-green-100' : 'border-red-100'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icons[type]}
          <span className="text-sm font-bold text-slate-700">{message}</span>
        </div>
        {type !== 'loading' && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
      {type === 'success' && sources && sources.length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">Nguồn tham khảo:</p>
          <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto pr-1 text-blue-600">
            {sources.slice(0, 4).map((source, idx) => (
              <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-[11px] hover:text-blue-800 underline line-clamp-1 flex items-center gap-1">
                <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                {source.title}
              </a>
            ))}
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
  const [rateHistory, setRateHistory] = useState<RateHistoryEntry[]>([]);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.rates) setData(parsed.rates);
        if (parsed.sources) setSources(parsed.sources);
        if (parsed.lastUpdate) setLastUpdate(parsed.lastUpdate);
      } catch (e) { console.error(e); }
    }
    
    if (savedHistory) {
      try {
        setRateHistory(JSON.parse(savedHistory));
      } catch (e) { console.error(e); }
    }
  }, []);

  const saveToHistory = (rates: BankRate[], sources: GroundingSource[], timestamp: string) => {
    const newEntry: RateHistoryEntry = {
      id: Date.now().toString(),
      timestamp,
      data: rates,
      sources: sources
    };
    const updatedHistory = [newEntry, ...rateHistory].slice(0, 15);
    setRateHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setToast({ message: "Đang cập nhật...", type: 'loading' });
    
    try {
      const result = await fetchLatestRates();
      if (result.rates && result.rates.length > 0) {
        const timestamp = new Date().toLocaleString('vi-VN');
        setData(result.rates);
        setSources(result.sources);
        setLastUpdate(timestamp);
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          rates: result.rates,
          sources: result.sources,
          lastUpdate: timestamp
        }));

        saveToHistory(result.rates, result.sources, timestamp);
        setToast({ message: "Cập nhật thành công!", type: 'success', sources: result.sources });
      }
    } catch (err) {
      setError("Cập nhật thất bại. Đang dùng dữ liệu cũ.");
      setToast({ message: "Lỗi khi cập nhật!", type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [rateHistory]);

  const restoreHistory = (entry: RateHistoryEntry) => {
    if (window.confirm(`Khôi phục dữ liệu từ ${entry.timestamp}?`)) {
      setData(entry.data);
      setSources(entry.sources);
      setLastUpdate(entry.timestamp);
      setShowHistoryPanel(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 relative bg-slate-50">
      {toast && (
        <Toast message={toast.message} type={toast.type} sources={toast.sources} onClose={() => setToast(null)} />
      )}

      {showHistoryPanel && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowHistoryPanel(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900 uppercase">Lịch sử lưu</h3>
              <button onClick={() => setShowHistoryPanel(false)} className="p-2 hover:bg-slate-100 rounded-xl">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-6">
              {rateHistory.length === 0 ? (
                <p className="text-center text-slate-400 py-10">Chưa có dữ liệu lịch sử</p>
              ) : rateHistory.map((entry) => (
                <div key={entry.id} className="group relative pl-6 border-l-2 border-slate-100 pb-2">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-200"></div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-indigo-500 uppercase">{entry.timestamp}</span>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-800 mb-3">Bản lưu {entry.data.length} ngân hàng</p>
                      <button onClick={() => restoreHistory(entry)} className="w-full py-2 bg-white text-indigo-600 border border-indigo-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                        Khôi phục
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg">HT</div>
            <div>
              <h1 className="font-bold text-[16px] text-slate-900 leading-tight">Lãi Suất Ngân Hàng</h1>
              <p className="text-[10px] text-slate-400 font-medium">TP Hà Tĩnh - Vietnam</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowHistoryPanel(true)}
              className="px-4 py-2 rounded-full font-bold text-[13px] text-slate-500 border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
            >
              Lịch sử lưu
            </button>
            <button 
              onClick={handleUpdate}
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-[13px] transition-all shadow-md ${
                loading ? 'bg-blue-100 text-blue-400' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <svg className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Đang cập nhật...' : 'Cập nhật'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RateTable data={data} />
            
            <div className="space-y-8 lg:hidden">
              <SpecialPromotion />
              <Calculator data={data} />
            </div>
          </div>
          <div className="space-y-8">
            <div className="hidden lg:block space-y-8">
              <SpecialPromotion />
              <EmployeeConsultationGuide />
              <Calculator data={data} />
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <AnalysisChart data={data} term={activeChartTerm} />
              <div className="flex flex-wrap gap-1.5 justify-center mt-6">
                {TERMS.map(t => (
                  <button 
                    key={t} 
                    onClick={() => setActiveChartTerm(t)} 
                    className={`px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${activeChartTerm === t ? 'bg-[#1E293B] text-white' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:hidden">
              <EmployeeConsultationGuide />
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 mt-16 pb-12 text-center">
        <p className="text-slate-400 text-[12px] font-medium leading-relaxed">
          © 2026 Ha Tinh Banking Dashboard. Thiết kế bởi Bùi Hoàng Lam.
        </p>
        <p className="mt-2 text-slate-400 text-[12px] font-medium leading-relaxed max-w-2xl mx-auto">
          Lưu ý: Công cụ chỉ mang tính chất tham khảo so sánh, không chịu trách nhiệm cho các quyết định tài chính cá nhân.
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-in { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.3s ease-out; }
      `}} />
    </div>
  );
};

export default App;
