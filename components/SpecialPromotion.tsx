
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
            <div className="bg-yellow-400 p-1 rounded-lg">
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
          {/* Main Prize */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4 relative overflow-hidden group/item hover:bg-white/20 transition-all">
            <div className="absolute top-0 right-0 p-2 bg-yellow-400 text-red-700 text-[9px] font-black rounded-bl-xl shadow-sm">
              ĐẶC BIỆT
            </div>
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-red-700 shadow-inner">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-3v7h5.05a2.5 2.5 0 014.9 0H22a1 1 0 001-1V9.5a4.5 4.5 0 00-4.5-4.5H14.5A.5.5 0 0014 5.5V7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-black text-base text-white">Ô tô Honda HR-V</h4>
              <p className="text-[11px] text-yellow-100 font-medium italic opacity-80">Trị giá 707.000.000 đ</p>
            </div>
          </div>

          {/* Secondary Prizes Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
              <p className="text-[9px] font-black text-yellow-300 uppercase mb-1">Giải Nhất (02 giải)</p>
              <p className="font-bold text-xs">Xe Honda SH 125i</p>
              <p className="text-[9px] opacity-70">69tr đ/giải</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
              <p className="text-[9px] font-black text-yellow-300 uppercase mb-1">Giải Nhì (05 giải)</p>
              <p className="font-bold text-xs">Sổ TK Tiết Kiệm</p>
              <p className="text-[9px] opacity-70">20tr đ/giải</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
              <p className="text-[9px] font-black text-yellow-300 uppercase mb-1">Giải Ba (10 giải)</p>
              <p className="font-bold text-xs">Tủ lạnh Samsung</p>
              <p className="text-[9px] opacity-70">10tr đ/giải</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
              <p className="text-[9px] font-black text-yellow-300 uppercase mb-1">Giải KK (100 giải)</p>
              <p className="font-bold text-xs">Tiền mặt may mắn</p>
              <p className="text-[9px] opacity-70">500k đ/giải</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex justify-between items-end border-t border-white/20 pt-4">
            <div>
              <p className="text-[10px] text-yellow-200 font-bold uppercase tracking-tighter">Tổng giá trị thưởng</p>
              <p className="text-2xl font-black text-white leading-none">1,2 TỶ ĐỒNG</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold text-white/70 italic leading-tight">Chỉ từ 6tr đ/phiếu</p>
              <p className="text-[9px] font-bold text-white/70 italic leading-tight">Đến hết 31/05/2026</p>
            </div>
          </div>

          <a 
            href="tel:0966400364"
            className="w-full bg-yellow-400 text-red-700 py-3 rounded-2xl font-black text-xs hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 active:scale-95"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.587 4.587l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            TƯ VẤN THAM GIA NGAY
          </a>
        </div>
      </div>
    </div>
  );
};

export default SpecialPromotion;
