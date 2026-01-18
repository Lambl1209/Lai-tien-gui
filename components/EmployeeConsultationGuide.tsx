
import React, { useState } from 'react';

const EmployeeConsultationGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pain' | 'desire' | 'action' | 'advantage'>('pain');

  const content = {
    pain: {
      title: "Nỗi đau của khách hàng",
      items: [
        "Lãi suất tiết kiệm thông thường đang ở mức ổn định nhưng chưa thực sự đột phá.",
        "Khách hàng có số vốn nhỏ (6-10 triệu) thường cảm thấy khó tiếp cận các ưu đãi lớn.",
        "Nỗi lo 'tiền mất giá' đầu năm nếu chỉ gửi tiết kiệm truyền thống."
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: "text-rose-600",
      bgColor: "bg-rose-50/50",
      borderColor: "border-rose-100",
      bulletColor: "bg-rose-400"
    },
    desire: {
      title: "Mong muốn thầm kín",
      items: [
        "Sự may mắn, 'lộc phát' để khởi đầu một năm mới Bính Ngọ suôn sẻ.",
        "Cơ hội trúng giải thưởng lớn (Ô tô, Xe máy) để nâng tầm chất lượng cuộc sống.",
        "Gửi tiền vào nơi an tâm nhất (Ngân hàng Nhà nước) nhưng vẫn phải có tính dự thưởng."
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "text-sky-600",
      bgColor: "bg-sky-50/50",
      borderColor: "border-sky-100",
      bulletColor: "bg-sky-400"
    },
    action: {
      title: "Cán bộ cần làm gì?",
      items: [
        "Tư vấn khách hàng chia nhỏ sổ tiết kiệm thành các mức 6 triệu để tối ưu phiếu dự thưởng.",
        "Nhấn mạnh vào thời hạn quay số (Tháng 6/2026) - nhân đôi niềm vui sau Tết.",
        "Chủ động gọi điện cho nhóm khách hàng nhận lương qua thẻ/hưu trí tại địa phương."
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-100",
      bulletColor: "bg-emerald-400"
    },
    advantage: {
      title: "Lợi thế Agribank HT II",
      items: [
        "Thương hiệu Agribank có độ tin cậy cao nhất tại khu vực nông thôn Hà Tĩnh.",
        "Tổng giá trị giải thưởng 1.2 tỷ đồng - lớn nhất trong các kỳ khuyến mãi tại tỉnh.",
        "Giải đặc biệt Ô tô Honda HR-V là món quà cực kỳ thiết thực và đẳng cấp."
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: "text-amber-600",
      bgColor: "bg-amber-50/50",
      borderColor: "border-amber-100",
      bulletColor: "bg-amber-400"
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
      <div className="bg-slate-50/80 px-5 py-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-5.636l-.707-.707m1.414 1.414L5.172 5.172M17.657 17.657l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-slate-800 font-bold text-sm">Cẩm Nang Tư Vấn</h3>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">Chiến lược Agribank HT II</p>
          </div>
        </div>
        <div className="px-2 py-1 bg-white rounded-lg border border-slate-200">
          <span className="text-[9px] font-black text-indigo-500 uppercase">AI Staff Guide</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex bg-slate-100/50 p-1 rounded-2xl mb-6">
          {(['pain', 'desire', 'action', 'advantage'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all duration-300 ${
                activeTab === tab 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'pain' ? 'NỖI ĐAU' : tab === 'desire' ? 'MONG MUỐN' : tab === 'action' ? 'HÀNH ĐỘNG' : 'LỢI THẾ'}
            </button>
          ))}
        </div>

        <div className={`rounded-2xl p-5 border ${content[activeTab].borderColor} ${content[activeTab].bgColor} transition-all duration-500`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl bg-white shadow-sm ${content[activeTab].color}`}>
              {content[activeTab].icon}
            </div>
            <h4 className={`font-bold text-sm ${content[activeTab].color}`}>
              {content[activeTab].title}
            </h4>
          </div>
          <ul className="space-y-4">
            {content[activeTab].items.map((item, idx) => (
              <li key={idx} className="flex gap-4 text-[12px] text-slate-600 leading-relaxed group">
                <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 transition-transform group-hover:scale-125 ${content[activeTab].bulletColor}`}></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeConsultationGuide;
