import { useState, useEffect } from 'react';
import { 
  Monitor, 
  Columns, 
  Sliders, 
  HelpCircle, 
  Sparkles, 
  Check,
  Globe,
  Share2
} from 'lucide-react';
import { defaultSiteData } from './defaultData';
import { SiteData } from './types';
import GroomingWebsite from './components/GroomingWebsite';
import AdminDashboard from './components/AdminDashboard';

// Sample prefilled appointments
const initialAppointments = [
  {
    id: "apt-sample-1",
    clientName: "이지영",
    clientPhone: "010-8899-2233",
    catName: "모카",
    catBreed: "스코티시 폴드",
    catAge: "2세",
    serviceId: "베이직 위생 미용 & 목욕 (Basic Care)",
    date: "2026-06-12",
    time: "14:00",
    notes: "처음 가보는 샵이라 소리에 많이 예민하게 반응할 수 있습니다. 부드럽게 부탁드려요.",
    status: "confirmed",
    createdAt: "2026-06-04T10:15:30.000Z"
  },
  {
    id: "apt-sample-2",
    clientName: "박민우",
    clientPhone: "010-4455-7711",
    catName: "쿠키",
    catBreed: "페르시안 친칠라",
    catAge: "10개월",
    serviceId: "프리미엄 가위컷 & 마이크로 버블 스파 (Special Scissors Cut)",
    date: "2026-06-18",
    time: "11:30",
    notes: "엉덩이랑 뒷다리 안쪽에 가벼운 엉킴 모발이 보입니다. 가위컷 예쁘게 부탁드립니다.",
    status: "pending",
    createdAt: "2026-06-05T02:20:00.000Z"
  }
];

export default function App() {
  const [viewMode, setViewMode] = useState<'client' | 'split' | 'admin'>('split');
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize and Sync with Local Storage
  useEffect(() => {
    const cachedData = localStorage.getItem('wcat_site_data');
    if (cachedData) {
      try {
        setSiteData(JSON.parse(cachedData));
      } catch (e) {
        console.error("Failed to parse cached site data:", e);
      }
    }

    const cachedAppts = localStorage.getItem('wcat_appointments');
    if (cachedAppts) {
      try {
        setAppointments(JSON.parse(cachedAppts));
      } catch (e) {
        console.error("Failed to parse cached appointments:", e);
        setAppointments(initialAppointments);
      }
    } else {
      setAppointments(initialAppointments);
      localStorage.setItem('wcat_appointments', JSON.stringify(initialAppointments));
    }
  }, []);

  // Update SEO Page Title
  useEffect(() => {
    if (siteData.seo?.metaTitle) {
      document.title = siteData.seo.metaTitle;
    }
  }, [siteData]);

  const handleUpdateSiteData = (newData: SiteData) => {
    setSiteData(newData);
    localStorage.setItem('wcat_site_data', JSON.stringify(newData));
    showToast("⚙️ 변경하신 사이트 레이아웃 및 폰트가 실시간 반영되었습니다!");
  };

  const handleAddAppointment = (newAppt: any) => {
    const updated = [newAppt, ...appointments];
    setAppointments(updated);
    localStorage.setItem('wcat_appointments', JSON.stringify(updated));
    showToast(`🐾 ${newAppt.catName} 친구의 미용 예약이 접수완료 되었습니다!`);
  };

  const handleUpdateAppointmentStatus = (id: string, nextStatus: string) => {
    const updated = appointments.map(apt => {
      if (apt.id === id) {
        return { ...apt, status: nextStatus };
      }
      return apt;
    });
    setAppointments(updated);
    localStorage.setItem('wcat_appointments', JSON.stringify(updated));
    
    let statusKorean = "접수대기";
    if (nextStatus === "confirmed") statusKorean = "스케줄 확정";
    if (nextStatus === "completed") statusKorean = "미용 케어 완료";
    showToast(`✅ 예약 상태가 [${statusKorean}]으로 업데이트 되었습니다.`);
  };

  const handleDeleteAppointment = (id: string) => {
    const updated = appointments.filter(apt => apt.id !== id);
    setAppointments(updated);
    localStorage.setItem('wcat_appointments', JSON.stringify(updated));
    showToast("🗑️ 고객 미용 예약 정보가 삭제되었습니다.");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-stone-950 text-stone-100 font-sans" id="studio-app-root">
      
      {/* TOP WORKSPACE CONTROLLER */}
      <div className="bg-stone-900 border-b border-stone-800 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between z-50 shrink-0 gap-3" id="top-designer-bar">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center font-black text-xs text-stone-950">W</div>
          <div>
            <h1 className="text-xs font-black tracking-tight text-white uppercase flex items-center gap-1.5">
              W STUDIO BUILDER <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.2 rounded font-mono">LIVE CMS</span>
            </h1>
          </div>
        </div>

        {/* Dynamic Mode Switcher Button Group */}
        <div className="flex items-center space-x-1.5 bg-stone-950/80 p-1 rounded-xl border border-stone-800" id="sandbox-view-mode-selector">
          
          <button 
            onClick={() => setViewMode('client')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'client' 
                ? 'bg-amber-500 text-stone-950 font-black shadow-md' 
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
            id="view-client-full"
          >
            <Monitor className="w-3.5 h-3.5" /> 
            <span>고객 뷰어 (전체 화면)</span>
          </button>

          <button 
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'split' 
                ? 'bg-amber-500 text-stone-950 font-black shadow-md' 
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
            id="view-split-screen"
          >
            <Columns className="w-3.5 h-3.5" /> 
            <span>실시간 반반 디자이너 Screen</span>
          </button>

          <button 
            onClick={() => setViewMode('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'admin' 
                ? 'bg-amber-500 text-stone-950 font-black shadow-md' 
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
            id="view-admin-full"
          >
            <Sliders className="w-3.5 h-3.5" /> 
            <span>대시보드 전용 (전체 화면)</span>
          </button>

        </div>

        {/* Guide / Status info */}
        <div className="hidden lg:flex items-center space-x-3 text-stone-400 text-[11px]" id="sandbox-tips-wrap">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Vite 호스트 로컬 캐싱 활성됨
          </span>
        </div>
      </div>

      {/* CORE SCREEN LAYOUT PORT AREA */}
      <div className="flex-1 flex overflow-hidden relative" id="layout-display-portal">
        
        {/* VIEW 1: SPLIT DESGNER MODE (50% Admin Drawer on Left | 50% Live Client page on Right) */}
        {viewMode === 'split' && (
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden" id="split-layout-root">
            {/* Admin Side */}
            <div className="lg:col-span-5 h-full overflow-hidden border-r border-stone-800 bg-stone-900" id="split-admin-panel">
              <AdminDashboard 
                data={siteData}
                appointments={appointments}
                onUpdateSiteData={handleUpdateSiteData}
                onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                onDeleteAppointment={handleDeleteAppointment}
                onClose={() => setViewMode('client')}
              />
            </div>

            {/* Client Preview Side */}
            <div className="lg:col-span-7 h-full overflow-y-auto bg-stone-100 flex flex-col relative" id="split-client-panel">
              <div className="sticky top-0 z-40 bg-amber-500/10 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-amber-400 border-b border-amber-500/15 flex items-center justify-between" id="preview-tab-helper">
                <span className="flex items-center gap-1">💻 실시간 렌더링 뷰포트 (대시보드 값 수정 시 즉각 인스턴트 업데이트)</span>
                <span className="text-stone-500 bg-stone-900 px-1.5 py-0.2 rounded font-mono">SANDBOX DEV ONLY</span>
              </div>
              <div className="flex-1" id="split-preview-client-wrapper">
                <GroomingWebsite 
                  data={siteData}
                  onAddAppointment={handleAddAppointment}
                  onRequestOpenAdmin={() => setViewMode('admin')}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CLIENT ONLY VIEW */}
        {viewMode === 'client' && (
          <div className="w-full h-full overflow-y-auto bg-white relative animate-fade-in" id="client-layout-root">
            <GroomingWebsite 
              data={siteData}
              onAddAppointment={handleAddAppointment}
              onRequestOpenAdmin={() => setViewMode('split')}
            />
            {/* Quick floating helper to jump back into Admin Panel in 1 click! */}
            <div className="fixed bottom-6 right-6 z-50 group" id="client-db-floater">
              <button 
                onClick={() => setViewMode('split')}
                className="w-14 h-14 rounded-full bg-stone-900 hover:bg-stone-850 text-white flex items-center justify-center shadow-2xl border-2 border-stone-700 transition-transform duration-300 hover:scale-108 cursor-pointer relative"
                title="웹 에디터 및 관리자 대시보드 열기"
              >
                <Sliders className="w-6 h-6 text-amber-400" />
                {/* Pending dot badge */}
                {appointments.filter(a => a.status === 'pending').length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                    {appointments.filter(a => a.status === 'pending').length}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: FULL ADMIN ONLY VIEW */}
        {viewMode === 'admin' && (
          <div className="w-full h-full overflow-hidden animate-fade-in" id="admin-layout-root">
            <AdminDashboard 
              data={siteData}
              appointments={appointments}
              onUpdateSiteData={handleUpdateSiteData}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
              onDeleteAppointment={handleDeleteAppointment}
              onClose={() => setViewMode('client')}
            />
          </div>
        )}

      </div>

      {/* GLOBAL NOTIFICATION SYSTEM */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-stone-950/95 backdrop-blur-md border border-amber-500/30 text-white rounded-2xl px-6 py-4 shadow-2xl z-55 flex items-center space-x-3 text-sm animate-fade-in animate-bounce max-w-md w-full" id="global-action-toast">
          <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <p className="font-semibold text-stone-100 flex-1 leading-relaxed text-xs">{toastMessage}</p>
        </div>
      )}

    </div>
  );
}
