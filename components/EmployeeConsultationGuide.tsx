
import React, { useState } from 'react';

const EmployeeConsultationGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pain' | 'desire' | 'action' | 'advantage'>('pain');

  const content = {
    pain: {
      title: "Nỗi đau của khách hàng",
      items: [
        "Lãi suất tiết kiệm thông thường đang ở mức ổn định nhưng chưa thực sự đột phá so với lạm phát.",
        "Khách hàng có số vốn nhỏ (6-10 triệu) thường cảm thấy bị lãng quên trong các chương trình ưu đãi lớn.",
        "Nỗi lo 'tiền mất giá' hoặc bỏ lỡ cơ hội đầu tư khác nếu gửi tiền kỳ hạn quá dài.",
        "Mất quá nhiều thời gian để đi khảo sát và so sánh lãi suất giữa hàng chục ngân hàng khác nhau tại Hà Tĩnh.",
        "E ngại về sự an toàn của các hình thức đầu tư rủi ro như chứng khoán hay bất động sản trong năm 2026."
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
        "Sự may mắn, 'lộc phát' để khởi đầu một năm mới Bính Ngọ suôn sẻ và hanh thông.",
        "Cơ hội sở hữu những tài sản giá trị lớn (Ô tô, Xe máy SH) để nâng tầm vị thế gia đình.",
        "Gửi tiền vào ngân hàng Nhà nước để an tâm tuyệt đối nhưng vẫn có cảm giác 'chơi mà trúng'.",
        "Thủ tục gửi tiền và nhận thưởng phải nhanh chóng, minh bạch, không rườm rà.",
        "Được tư vấn bởi những cán bộ thân thiện, hiểu tâm lý địa phương và tận tâm hướng dẫn."
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
        "Chủ động phân tích bài toán lợi ích: Gộp lãi suất thực tế + giá trị kỳ vọng của phiếu dự thưởng.",
        "Tư vấn khách hàng chia nhỏ số tiền gửi thành các mốc 6 triệu để nhận được nhiều phiếu dự thưởng nhất.",
        "Nhấn mạnh vào thời hạn quay số cuối kỳ (Tháng 6/2026) - tạo sự hào hứng tích lũy sau Tết.",
        "Tận dụng mạng xã hội (Zalo, Facebook cá nhân) để chia sẻ liên tục về các giải thưởng đã có người trúng.",
        "Tổ chức các buổi gặp gỡ, tri ân tại địa phương để trực tiếp giải đáp thắc mắc về thể lệ chương trình.",
        "Hỗ trợ tính toán lãi suất nhanh cho khách hàng bằng công cụ so sánh trực quan này."
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
        "Thương hiệu Agribank có bề dày lịch sử và mạng lưới bao phủ rộng khắp nhất tại Hà Tĩnh.",
        "Chương trình khuyến mãi lớn nhất trong năm tại tỉnh với tổng giá trị giải thưởng vượt 1.2 tỷ đồng.",
        "Giải đặc biệt Ô tô Honda HR-V là món quà thực tế, có tính thanh khoản và giá trị sử dụng cực cao.",
        "Hệ thống công nghệ hiện đại, cho phép khách hàng theo dõi số dư và phiếu dự thưởng ngay trên điện thoại.",
        "Đội ngũ cán bộ địa phương am hiểu văn hóa, luôn sẵn sàng hỗ trợ khách hàng tận nhà khi cần thiết.",
        "Lãi suất luôn nằm trong nhóm cạnh tranh nhất trong khối ngân hàng thương mại Nhà nước."
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
        <div className="flex bg-slate-100/50 p-1 rounded-2xl mb-6 overflow-x-auto scrollbar-hide">
          {(['pain', 'desire', 'action', 'advantage'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 text-[10px] font-bold rounded-xl transition-all duration-300 whitespace-nowrap ${
                activeTab === tab 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'pain' ? 'NỖI ĐAU' : tab === 'desire' ? 'MONG MUỐN' : tab === 'action' ? 'HÀNH ĐỘNG' : 'LỢI THẾ'}
            </button>
          ))}
        </div>

        <div className={`rounded-2xl p-5 border ${content[activeTab].borderColor} ${content[activeTab].bgColor} transition-all duration-500 min-h-[250px]`}>
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
