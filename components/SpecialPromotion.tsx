
import React from 'react';

const SpecialPromotion: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-rose-600 via-red-600 to-orange-500 rounded-[2rem] p-6 text-white shadow-xl border border-white/10 overflow-hidden relative group">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl group-hover:bg-yellow-400/30 transition-all duration-700"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      
      {/* Sparkle effects */}
      <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-1 rounded-lg shadow-sm">
              <svg className="w-4 h-4 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-yellow-100">Agribank Hà Tĩnh II</h3>
          </div>
          <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 uppercase">
            Xuân Bính Ngọ 2026
          </span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black leading-tight text-white drop-shadow-md mb-1">
            GỬI TIỀN TRÚNG LỚN
          </h2>
          <p className="text-yellow-200 text-xs font-bold italic opacity-90">"Chào Xuân Bính Ngọ – Gửi lộc phát tài"</p>
        </div>

        {/* Prize Grid */}
        <div className="space-y-3">
          {/* Main Prize: Honda HR-V */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4 relative overflow-hidden group/item hover:bg-white/25 transition-all shadow-lg ring-1 ring-white/30">
            <div className="absolute top-0 right-0 p-2 bg-yellow-400 text-red-700 text-[9px] font-black rounded-bl-xl shadow-md z-20">
              GIẢI ĐẶC BIỆT
            </div>
            <div className="w-14 h-14 bg-gradient-to-tr from-yellow-500 to-yellow-300 rounded-2xl flex items-center justify-center text-red-800 shadow-xl border border-yellow-200 shrink-0 transform group-hover/item:scale-110 transition-transform">
              {/* Improved Car Icon representing modern SUV (HRV) */}
              <svg className="w-11 h-11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Car body base */}
                <path d="M2.5 13C2.5 13 3 12 5 12C7 12 17 12 19 12C21 12 21.5 13 21.5 13V16.5C21.5 17.8807 20.3807 19 19 19H5C3.61929 19 2.5 17.8807 2.5 16.5V13Z" fill="currentColor"/>
                {/* Roof and pillars */}
                <path d="M5 12L8 6.5C8.3 5.8 9 5.3 9.8 5.3H14.2C15 5.3 15.7 5.8 16 6.5L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Wheels */}
                <circle cx="6.5" cy="19" r="2.2" fill="#FBBF24" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="17.5" cy="19" r="2.2" fill="#FBBF24" stroke="currentColor" strokeWidth="1.5"/>
                {/* Window line */}
                <path d="M10.5 12V8.5C10.5 7.94772 10.9477 7.5 11.5 7.5H12.5C13.0523 7.5 13.5 7.94772 13.5 8.5V12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
                {/* Headlights detail */}
                <path d="M18.5 14H19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8"/>
                <path d="M4.5 14H5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8"/>
              </svg>
            </div>
            <div className="z-10">
              <h4 className="font-black text-lg text-white drop-shadow">Ô tô Honda HR-V</h4>
              <p className="text-[11px] text-yellow-100 font-black italic">Giá trị: 707.000.000 đ</p>
            </div>
            {/* Light reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Secondary Prizes Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-red-300">❤️</span>
                <p className="text-[9px] font-black text-yellow-300 uppercase">Giải Nhất (02 giải)</p>
              </div>
              <p className="font-bold text-xs">Xe Honda SH</p>
              <p className="text-[9px] opacity-80 font-bold">69.000.000 đ/xe</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-red-300">❤️</span>
                <p className="text-[9px] font-black text-yellow-300 uppercase">Giải Nhì (03 giải)</p>
              </div>
              <p className="font-bold text-xs">Sổ tiết kiệm</p>
              <p className="text-[9px] opacity-80 font-bold">10.000.000 đ/sổ</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-red-300">❤️</span>
                <p className="text-[9px] font-black text-yellow-300 uppercase">Giải Ba (27 giải)</p>
              </div>
              <p className="font-bold text-xs">Sổ tiết kiệm</p>
              <p className="text-[9px] opacity-80 font-bold">5.000.000 đ/sổ</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-red-300">❤️</span>
                <p className="text-[9px] font-black text-yellow-300 uppercase">Giải May Mắn (270 giải)</p>
              </div>
              <p className="font-bold text-xs">Tiền mặt</p>
              <p className="text-[9px] opacity-80 font-bold">500.000 đ/giải</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex justify-between items-end border-t border-white/20 pt-4">
            <div>
              <p className="text-[10px] text-yellow-200 font-bold uppercase tracking-tighter">Tổng giá trị giải thưởng</p>
              <p className="text-2xl font-black text-white leading-none">TRÊN 1,2 TỶ ĐỒNG</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold text-white/80 italic leading-tight">Mỗi 6tr đ nhận 01 phiếu</p>
              <p className="text-[9px] font-bold text-white/80 italic leading-tight">Áp dụng đến 31/05/2026</p>
            </div>
          </div>

          <a 
            href="tel:0966400364"
            className="w-full bg-yellow-400 text-red-700 py-3.5 rounded-2xl font-black text-xs hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 active:scale-95"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.587 4.587l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            TƯ VẤN GỬI TIỀN NGAY
          </a>
        </div>
      </div>
    </div>
  );
};

export default SpecialPromotion;
