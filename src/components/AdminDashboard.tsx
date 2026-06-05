import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  RefreshCcw, 
  Check, 
  Settings, 
  Image as ImageIcon, 
  Tag, 
  Calendar, 
  FileText, 
  Globe, 
  Search,
  Sliders,
  Sparkles,
  Phone,
  Bookmark,
  Lock,
  Unlock
} from 'lucide-react';
import { SiteData, ServiceItem, GalleryItem, BlogPost, FeatureItem } from '../types';

interface AdminDashboardProps {
  data: SiteData;
  appointments: any[];
  adminPassword?: string;
  onUpdateAdminPassword: (password: string) => void;
  onAdminLogout: () => void;
  onUpdateSiteData: (updatedData: SiteData) => void;
  onUpdateAppointmentStatus: (id: string, status: string) => void;
  onDeleteAppointment: (id: string) => void;
  onClose: () => void;
}

export default function AdminDashboard({ 
  data, 
  appointments, 
  adminPassword = 'wcat1234',
  onUpdateAdminPassword,
  onAdminLogout,
  onUpdateSiteData, 
  onUpdateAppointmentStatus, 
  onDeleteAppointment,
  onClose 
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'services' | 'gallery' | 'blog' | 'bookings' | 'seo' | 'security'>('content');
  
  // Security parameters local copy
  const [passInput, setPassInput] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);
  
  // Local editable copies of site datasets
  const [logoText, setLogoText] = useState(data.logoText);
  const [heroTitle, setHeroTitle] = useState(data.heroTitle);
  const [heroSub, setHeroSub] = useState(data.heroSub);
  const [heroBtnText, setHeroBtnText] = useState(data.heroBtnText);
  const [heroImageUrl, setHeroImageUrl] = useState(data.heroImageUrl);
  const [aboutTitle, setAboutTitle] = useState(data.aboutTitle);
  const [aboutDesc, setAboutDesc] = useState(data.aboutDesc);
  const [features, setFeatures] = useState<FeatureItem[]>(data.features);

  // Theme Local Copy
  const [pointColor, setPointColor] = useState(data.theme.pointColor);
  const [backgroundColor, setBackgroundColor] = useState(data.theme.backgroundColor);
  const [fontFamily, setFontFamily] = useState(data.theme.fontFamily);

  // Services Local Copy
  const [services, setServices] = useState<ServiceItem[]>(data.services);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [srvFormTitle, setSrvFormTitle] = useState("");
  const [srvFormPrice, setSrvFormPrice] = useState("");
  const [srvFormDuration, setSrvFormDuration] = useState("");
  const [srvFormDesc, setSrvFormDesc] = useState("");
  const [srvFormPopular, setSrvFormPopular] = useState(false);

  // Gallery Local Copy
  const [gallery, setGallery] = useState<GalleryItem[]>(data.gallery);
  const [galFormCatName, setGalFormCatName] = useState("");
  const [galFormService, setGalFormService] = useState("");
  const [galFormUrl, setGalFormUrl] = useState("");
  const [galFormBreed, setGalFormBreed] = useState("");
  const [editingGalId, setEditingGalId] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isBlogDragActive, setIsBlogDragActive] = useState(false);

  // Blog Local Copy
  const [posts, setPosts] = useState<BlogPost[]>(data.posts);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postFormTitle, setPostFormTitle] = useState("");
  const [postFormCategory, setPostFormCategory] = useState("케어 정보");
  const [postFormContent, setPostFormContent] = useState("");
  const [postFormImageUrl, setPostFormImageUrl] = useState("");
  const [postFormNotice, setPostFormNotice] = useState(false);

  // SEO Local Copy
  const [seoTitle, setSeoTitle] = useState(data.seo.metaTitle);
  const [seoDesc, setSeoDesc] = useState(data.seo.metaDescription);
  const [seoKeywords, setSeoKeywords] = useState(data.seo.metaKeywords);

  // Contact Local Copy
  const [contactAddress, setContactAddress] = useState(data.contact.address);
  const [contactPhone, setContactPhone] = useState(data.contact.phone);
  const [contactHours, setContactHours] = useState(data.contact.hours);
  const [contactInsta, setContactInsta] = useState(data.contact.instagram);
  const [contactKakao, setContactKakao] = useState(data.contact.kakao);
  const [contactBlog, setContactBlog] = useState(data.contact.blog);

  // Preset Color Palettes for Premium Themes
  const colorPresets = [
    { name: '시그니처 골드 브라운', point: '#D4A373', bg: '#FFFFFF' },
    { name: '화티 크림 선셋', point: '#E5A335', bg: '#FAFAF9' },
    { name: '차분한 포레스트 세이지', point: '#839788', bg: '#FFFFFF' },
    { name: '모던 웜 차콜 에스테틱', point: '#C49A45', bg: '#F5F5F4' },
    { name: '라벤더 코지 스파', point: '#907AD6', bg: '#FFFFFF' },
    { name: '로얄 시 그레이', point: '#2A9D8F', bg: '#F8F9FA' }
  ];

  // Global Save function to transmit the local state changes back up
  const saveAllChanges = (updatedServices = services, updatedGallery = gallery, updatedPosts = posts) => {
    const nextSiteData: SiteData = {
      logoText,
      heroTitle,
      heroSub,
      heroBtnText,
      heroImageUrl,
      aboutTitle,
      aboutDesc,
      features,
      servicesTitle: data.servicesTitle,
      servicesSubtitle: data.servicesSubtitle,
      services: updatedServices,
      galleryTitle: data.galleryTitle,
      gallerySubtitle: data.gallerySubtitle,
      gallery: updatedGallery,
      blogTitle: data.blogTitle,
      blogSubtitle: data.blogSubtitle,
      posts: updatedPosts,
      contact: {
        address: contactAddress,
        phone: contactPhone,
        hours: contactHours,
        instagram: contactInsta,
        kakao: contactKakao,
        blog: contactBlog
      },
      theme: {
        pointColor,
        backgroundColor,
        textColor: data.theme.textColor,
        fontFamily
      },
      seo: {
        metaTitle: seoTitle,
        metaDescription: seoDesc,
        metaKeywords: seoKeywords
      }
    };
    onUpdateSiteData(nextSiteData);
  };

  const handleApplyPreset = (preset: { point: string; bg: string }) => {
    setPointColor(preset.point);
    setBackgroundColor(preset.bg);
    
    // Auto sync
    const nextTheme = {
      ...data.theme,
      pointColor: preset.point,
      backgroundColor: preset.bg
    };
    onUpdateSiteData({
      ...data,
      theme: nextTheme
    });
  };

  // SERVICE MANAGEMENT
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvFormTitle || !srvFormPrice) return;

    let nextServices = [...services];
    if (editingServiceId) {
      nextServices = services.map(s => s.id === editingServiceId ? {
        ...s,
        title: srvFormTitle,
        price: srvFormPrice,
        duration: srvFormDuration || "60분",
        description: srvFormDesc,
        isPopular: srvFormPopular
      } : s);
      setEditingServiceId(null);
    } else {
      const newService: ServiceItem = {
        id: "srv-" + Date.now(),
        title: srvFormTitle,
        price: srvFormPrice,
        duration: srvFormDuration || "60분",
        description: srvFormDesc,
        isPopular: srvFormPopular
      };
      nextServices.push(newService);
    }

    setServices(nextServices);
    saveAllChanges(nextServices);

    // Reset Form
    setSrvFormTitle("");
    setSrvFormPrice("");
    setSrvFormDuration("");
    setSrvFormDesc("");
    setSrvFormPopular(false);
  };

  const handleEditService = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setSrvFormTitle(srv.title);
    setSrvFormPrice(srv.price);
    setSrvFormDuration(srv.duration);
    setSrvFormDesc(srv.description);
    setSrvFormPopular(!!srv.isPopular);
  };

  const handleDeleteService = (id: string) => {
    if (!window.confirm("정말로 이 원장의 맞춤 미용 서비스를 삭제하시겠습니까?")) return;
    const nextServices = services.filter(s => s.id !== id);
    setServices(nextServices);
    saveAllChanges(nextServices);
  };

  // GALLERY MANAGEMENT
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galFormCatName || !galFormUrl) return;

    let nextGallery = [...gallery];
    if (editingGalId) {
      nextGallery = gallery.map(g => g.id === editingGalId ? {
        ...g,
        catName: galFormCatName,
        serviceReceived: galFormService || "일반 위생 미용",
        imageUrl: galFormUrl,
        breed: galFormBreed.trim() || undefined
      } : g);
      setEditingGalId(null);
    } else {
      const newItem: GalleryItem = {
        id: "gal-" + Date.now(),
        catName: galFormCatName,
        serviceReceived: galFormService || "일반 위생 미용",
        imageUrl: galFormUrl,
        breed: galFormBreed.trim() || undefined
      };
      nextGallery.push(newItem);
    }

    setGallery(nextGallery);
    saveAllChanges(services, nextGallery);

    // Reset Form
    setGalFormCatName("");
    setGalFormService("");
    setGalFormUrl("");
    setGalFormBreed("");
  };

  const handleEditGallery = (item: GalleryItem) => {
    setEditingGalId(item.id);
    setGalFormCatName(item.catName);
    setGalFormService(item.serviceReceived);
    setGalFormUrl(item.imageUrl);
    setGalFormBreed(item.breed || "");
  };

  const handleDeleteGallery = (id: string) => {
    if (!window.confirm("갤러리에서 이 사랑스런 친구의 미용 스타일 샷을 삭제할까요?")) return;
    const nextGallery = gallery.filter(g => g.id !== id);
    setGallery(nextGallery);
    saveAllChanges(services, nextGallery);
  };

  // BLOG POST MANAGEMENT
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postFormTitle || !postFormContent) return;

    let nextPosts = [...posts];
    if (editingPostId) {
      nextPosts = posts.map(p => p.id === editingPostId ? {
        ...p,
        title: postFormTitle,
        category: postFormCategory,
        content: postFormContent,
        imageUrl: postFormImageUrl || "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600",
        isNotice: postFormNotice
      } : p);
      setEditingPostId(null);
    } else {
      const newPost: BlogPost = {
        id: "post-" + Date.now(),
        title: postFormTitle,
        category: postFormCategory,
        date: new Date().toISOString().split('T')[0],
        content: postFormContent,
        imageUrl: postFormImageUrl || "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600",
        isNotice: postFormNotice
      };
      nextPosts.push(newPost);
    }

    setPosts(nextPosts);
    saveAllChanges(services, gallery, nextPosts);

    // Reset Form
    setPostFormTitle("");
    setPostFormCategory("케어 정보");
    setPostFormContent("");
    setPostFormImageUrl("");
    setPostFormNotice(false);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setPostFormTitle(post.title);
    setPostFormCategory(post.category);
    setPostFormContent(post.content);
    setPostFormImageUrl(post.imageUrl);
    setPostFormNotice(!!post.isNotice);
  };

  const handleDeletePost = (id: string) => {
    if (!window.confirm("정말로 이 유익한 에스테틱 저널 포스팅을 완전히 지우시겠습니까?")) return;
    const nextPosts = posts.filter(p => p.id !== id);
    setPosts(nextPosts);
    saveAllChanges(services, gallery, nextPosts);
  };

  // FEATURE FEATURE-VALUE CARDS
  const handleFeatureChange = (index: number, key: 'title' | 'description', val: string) => {
    const nextFeatures = [...features];
    nextFeatures[index] = {
      ...nextFeatures[index],
      [key]: val
    };
    setFeatures(nextFeatures);
  };

  return (
    <div className="bg-stone-900 border-l border-stone-850 h-full flex flex-col text-stone-200 text-sm overflow-hidden" id="admin-panel-main">
      
      {/* DB TOP BAR CONTROL */}
      <div className="p-5 border-b border-stone-800 bg-stone-950 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 font-bold flex items-center justify-center">
            ⚙️
          </div>
          <div>
            <h2 className="font-extrabold text-white text-base">W 미용 센터 대시보드</h2>
            <p className="text-[10px] text-stone-400">100% 라이브 웹 에디터 및 고객 예약 트래커</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            type="button"
            onClick={onAdminLogout}
            className="px-3 py-2 bg-red-955/45 hover:bg-red-900/40 border border-red-900/50 text-red-400 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all duration-200"
          >
            <Unlock className="w-3.5 h-3.5" /> 안전 로그아웃
          </button>
          <button 
            onClick={() => { saveAllChanges(); onClose(); }}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-755 text-stone-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-stone-700"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" /> 반영 후 닫기
          </button>
        </div>
      </div>

      {/* HORIZONTAL CATEGORIES */}
      <div className="flex border-b border-stone-800 bg-stone-925 overflow-x-auto shrink-0 scrollbar-none" id="admin-categories-row">
        
        <button 
          onClick={() => setActiveTab('content')}
          className={`px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'content' ? 'border-amber-500 text-amber-400 bg-stone-900' : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> 1. 기초 콘텐츠
        </button>

        <button 
          onClick={() => setActiveTab('theme')}
          className={`px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'theme' ? 'border-amber-500 text-amber-400 bg-stone-900' : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" /> 2. 럭셔리 스타일링
        </button>

        <button 
          onClick={() => setActiveTab('services')}
          className={`px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'services' ? 'border-amber-500 text-amber-400 bg-stone-900' : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> 3. 미용 코스
        </button>

        <button 
          onClick={() => setActiveTab('gallery')}
          className={`px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'gallery' ? 'border-amber-500 text-amber-400 bg-stone-900' : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" /> 4. 케어 갤러리
        </button>

        <button 
          onClick={() => setActiveTab('blog')}
          className={`px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'blog' ? 'border-amber-500 text-amber-400 bg-stone-900' : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Tag className="w-3.5 h-3.5" /> 5. 에스테틱 저널
        </button>

        <button 
          onClick={() => setActiveTab('bookings')}
          className={`px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors relative cursor-pointer ${
            activeTab === 'bookings' ? 'border-amber-500 text-amber-400 bg-stone-900' : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" /> 6. 실시간 미용예약
          {appointments.length > 0 && (
            <span className="absolute top-2.5 right-1 px-1.5 py-0.5 rounded-full bg-red-500 text-[8px] font-bold text-white shrink-0">
              {appointments.filter(a => a.status === 'pending').length}
            </span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('seo')}
          className={`px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'seo' ? 'border-amber-500 text-amber-400 bg-stone-900' : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5" /> 7. 메타 / 검색 SEO
        </button>

        <button 
          onClick={() => setActiveTab('security')}
          className={`px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'security' ? 'border-amber-500 text-amber-400 bg-stone-900' : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-amber-400" /> 8. 관리자 계정 보안
        </button>

      </div>

      {/* SCROLLABLE INTERACTIVE FORM WRAPPER */}
      <div className="p-6 flex-1 overflow-y-auto space-y-6" id="dashboard-scroller-layout">
        
        {/* TAB 1: BASIC CONTENT EDITOR */}
        {activeTab === 'content' && (
          <div className="space-y-6 animate-fade-in" id="content-tab-wrap">
            <div className="flex justify-between items-center border-b border-stone-850 pb-3">
              <h3 className="font-extrabold text-white text-base">메인 브랜드 비주얼 & 카피 편집</h3>
              <button 
                onClick={() => saveAllChanges()} 
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold rounded-md flex items-center gap-1 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> 즉시 저장
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-stone-400 mb-1.5">상호명 / 마크 로고 텍스트</label>
                <input 
                  type="text"
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-stone-400 mb-1.5">히어로 섹션 메인 헤드라인 (줄바꿈 가능)</label>
                <textarea 
                  rows={2}
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-stone-400 mb-1.5">히어로 섹션 지원 카피라이팅</label>
                <textarea 
                  rows={4}
                  value={heroSub}
                  onChange={(e) => setHeroSub(e.target.value)}
                  className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-xs leading-relaxed focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 mb-1.5">액션 버튼 문구</label>
                <input 
                  type="text"
                  value={heroBtnText}
                  onChange={(e) => setHeroBtnText(e.target.value)}
                  className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 mb-1.5">히어로 대표 고양이 사진 URL</label>
                <input 
                  type="text"
                  value={heroImageUrl}
                  onChange={(e) => setHeroImageUrl(e.target.value)}
                  className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-xs font-mono focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* CARE PHILOSOPHY */}
            <div className="border-t border-stone-850 pt-6 space-y-4">
              <h4 className="font-extrabold text-amber-400 text-sm">W 미용 에스테틱 핵심 철학</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1.5">철학 타이틀 Heading</label>
                  <input 
                    type="text"
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1.5">철학 상세 설명</label>
                  <textarea 
                    rows={3}
                    value={aboutDesc}
                    onChange={(e) => setAboutDesc(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-xs leading-relaxed focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Edit 4 features dynamically */}
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold text-stone-300">4가지 안심 케어 항목 세부 편집</label>
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feat, idx) => (
                    <div key={feat.id} className="bg-stone-850 p-4 rounded-xl border border-stone-800 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">항목 {idx + 1}</span>
                        <input 
                          type="text"
                          value={feat.title}
                          onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                          placeholder="특성 제목"
                          className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                        />
                      </div>
                      <textarea 
                        rows={2}
                        value={feat.description}
                        onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                        placeholder="상세 설명구"
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-stone-300 text-[11px] leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CONTACT DETAILS EDIT */}
            <div className="border-t border-stone-850 pt-6 space-y-4">
              <h4 className="font-extrabold text-amber-400 text-sm">연락처 & 찾아오시는 길 데이터</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-stone-400 mb-1">상세 오시는 주소</label>
                  <input 
                    type="text"
                    value={contactAddress}
                    onChange={(e) => setContactAddress(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 mb-1">매장 일반 번호</label>
                  <input 
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 mb-1">영업 타임라인 표기</label>
                  <input 
                    type="text"
                    value={contactHours}
                    onChange={(e) => setContactHours(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 mb-1">인스타그램 ID (골뱅이 제외)</label>
                  <input 
                    type="text"
                    value={contactInsta}
                    onChange={(e) => setContactInsta(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 mb-1">네이버 공식 블로그 아이디</label>
                  <input 
                    type="text"
                    value={contactBlog}
                    onChange={(e) => setContactBlog(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-750 rounded-xl px-4 py-2.5 text-white text-xs"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LUXURY THEME CUSTOMIZER */}
        {activeTab === 'theme' && (
          <div className="space-y-6 animate-fade-in" id="theme-tab-wrap">
            <h3 className="font-extrabold text-white text-base border-b border-stone-850 pb-3">실시간 무코드 스타일 마스터</h3>

            {/* Suggested Luxury Presets */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-300">W 에스테틱 권장 프리미엄 컬러 팔레트</label>
              <div className="grid grid-cols-2 gap-3" id="presets-grid">
                {colorPresets.map((prst) => (
                  <button 
                    key={prst.name}
                    onClick={() => handleApplyPreset(prst)}
                    className="p-3 bg-stone-850 hover:bg-stone-800 rounded-xl border border-stone-750 text-left flex items-center justify-between group transition-all"
                  >
                    <div>
                      <h4 className="text-stone-200 text-xs font-extrabold group-hover:text-amber-400">{prst.name}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[9px] text-stone-500">포인트: {prst.point}</span>
                        <span className="text-[9px] text-stone-500">배경: {prst.bg}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <span className="w-5 h-5 rounded-full border border-stone-700" style={{ backgroundColor: prst.point }} />
                      <span className="w-5 h-5 rounded-full border border-stone-700" style={{ backgroundColor: prst.bg }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Pickers */}
            <div className="grid grid-cols-2 gap-4 border-t border-stone-850 pt-5">
              <div>
                <label className="block text-xs font-bold text-stone-400 mb-1.5">커스텀 대표 포인트 컬러</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color"
                    value={pointColor}
                    onChange={(e) => { setPointColor(e.target.value); saveAllChanges(); }}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-stone-700"
                  />
                  <input 
                    type="text"
                    value={pointColor}
                    onChange={(e) => { setPointColor(e.target.value); saveAllChanges(); }}
                    className="flex-1 bg-stone-850 border border-stone-750 rounded-xl px-3 py-2 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 mb-1.5">커스텀 메인 배경색</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => { setBackgroundColor(e.target.value); saveAllChanges(); }}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-stone-700"
                  />
                  <input 
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => { setBackgroundColor(e.target.value); saveAllChanges(); }}
                    className="flex-1 bg-stone-850 border border-stone-750 rounded-xl px-3 py-2 text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Typography Selector */}
            <div className="border-t border-stone-850 pt-5 space-y-3">
              <label className="block text-xs font-bold text-stone-300">대표 한글 서체 페어링</label>
              <div className="grid grid-cols-3 gap-3">
                
                <button 
                  onClick={() => { setFontFamily('sans'); saveAllChanges(); }}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    fontFamily === 'sans' 
                      ? 'border-amber-500 bg-amber-500/10 text-white font-extrabold' 
                      : 'border-stone-800 bg-stone-850 text-stone-400 hover:text-stone-205'
                  }`}
                >
                  <p className="text-xs">노토 산스</p>
                  <span className="text-[10px] text-stone-500 block mt-1 font-sans">깔끔하고 현대적</span>
                </button>

                <button 
                  onClick={() => { setFontFamily('serif'); saveAllChanges(); }}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    fontFamily === 'serif' 
                      ? 'border-amber-500 bg-amber-500/10 text-white font-extrabold' 
                      : 'border-stone-800 bg-stone-850 text-stone-400 hover:text-stone-205'
                  }`}
                >
                  <p className="text-xs font-serif">송명 명조</p>
                  <span className="text-[10px] text-stone-500 block mt-1 font-serif">클래식하고 고급짐</span>
                </button>

                <button 
                  onClick={() => { setFontFamily('buri'); saveAllChanges(); }}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    fontFamily === 'buri' 
                      ? 'border-amber-500 bg-amber-500/10 text-white font-extrabold' 
                      : 'border-stone-800 bg-stone-850 text-stone-400 hover:text-stone-205'
                  }`}
                >
                  <p className="text-xs font-serif">마루 부리</p>
                  <span className="text-[10px] text-stone-500 block mt-1">온화하고 감성적인 룩</span>
                </button>

              </div>
            </div>

          </div>
        )}

        {/* TAB 3: SERVICES AND PRICING */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-fade-in" id="services-tab-wrap">
            <h3 className="font-extrabold text-white text-base border-b border-stone-850 pb-3">에스테틱 관리 미용 서비스 추가 & 변경</h3>
            
            {/* Adding/Editing Form */}
            <form onSubmit={handleSaveService} className="bg-stone-850 p-5 rounded-2xl border border-stone-750 space-y-4">
              <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                {editingServiceId ? '🛠️ 선택 서비스 항목 수정하기' : '✨ 신규 프리미엄 미용 코스 등록'}
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-stone-450 mb-1">상세 서비스명 (예: 탄산 테헤란 허브스파 코스)</label>
                  <input 
                    type="text"
                    required
                    placeholder="베이직 위생 스페셜 딥케어"
                    value={srvFormTitle}
                    onChange={(e) => setSrvFormTitle(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-450 mb-1">대표 이용요금 (숫자만 입력)</label>
                  <input 
                    type="number"
                    required
                    placeholder="90000"
                    value={srvFormPrice}
                    onChange={(e) => setSrvFormPrice(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-450 mb-1">소요 타임 예시 (예: 90분)</label>
                  <input 
                    type="text"
                    placeholder="90분"
                    value={srvFormDuration}
                    onChange={(e) => setSrvFormDuration(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-stone-450 mb-1">상세 코존 서비스 성명서</label>
                  <textarea 
                    rows={3}
                    placeholder="특제 발바닥 젤리 팩과 각질 모낭 관리 전신 클리핑 보장..."
                    value={srvFormDesc}
                    onChange={(e) => setSrvFormDesc(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white text-xs leading-relaxed"
                  />
                </div>

                <div className="col-span-2 flex items-center space-x-2 pt-1">
                  <input 
                    type="checkbox"
                    id="srvFormPopular"
                    checked={srvFormPopular}
                    onChange={(e) => setSrvFormPopular(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-amber-500 bg-stone-900 border-stone-700"
                  />
                  <label htmlFor="srvFormPopular" className="text-xs text-stone-300 font-bold cursor-pointer">
                    👑 본 미용 코스를 "W 추천 최고 인기" 왕관 배지로 올립니다.
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {editingServiceId && (
                  <button 
                    type="button"
                    onClick={() => {
                      setEditingServiceId(null);
                      setSrvFormTitle("");
                      setSrvFormPrice("");
                      setSrvFormDuration("");
                      setSrvFormDesc("");
                      setSrvFormPopular(false);
                    }}
                    className="px-4 py-2 border border-stone-600 rounded-xl text-stone-300 hover:bg-stone-800 text-xs"
                  >
                    수정 취소
                  </button>
                )}
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-amber-500 text-stone-950 hover:bg-amber-600 rounded-xl font-bold text-xs flex items-center justify-center gap-1"
                >
                  {editingServiceId ? '완료 및 변경 데이터 저장' : '새로운 미용코스 살롱 등록 완료'}
                </button>
              </div>
            </form>

            {/* List of services currently */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-450">현재 활성화된 미용 서비스 목록 ({services.length}개)</label>
              
              <div className="space-y-3">
                {services.map((srv) => (
                  <div key={srv.id} className="p-4 bg-stone-850 hover:bg-stone-800 rounded-xl border border-stone-800 flex items-start justify-between gap-4 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-sm">{srv.title}</span>
                        {srv.isPopular && <span className="bg-amber-400 text-stone-950 font-black text-[8px] px-1.5 py-0.2 rounded-full">POPULAR</span>}
                      </div>
                      <p className="text-[11px] text-stone-400 font-mono">가액: {parseInt(srv.price).toLocaleString()}원 | 소요: {srv.duration}</p>
                      <p className="text-xs text-stone-500 line-clamp-1">{srv.description}</p>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <button 
                        onClick={() => handleEditService(srv)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300"
                        title="수정"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteService(srv.id)}
                        className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-200"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: CARE GRID GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fade-in" id="gallery-tab-wrap">
            <div className="flex justify-between items-center border-b border-stone-850 pb-3">
              <h3 className="font-extrabold text-white text-base">미용 대표 모델 스타일 갤러리 관리</h3>
              <p className="text-xs text-stone-400">자유로운 사진 업로드 및 필터용 희귀 묘종 분류 태그 지원</p>
            </div>

            <form onSubmit={handleSaveGallery} className="bg-stone-850 p-5 rounded-2xl border border-stone-750 space-y-4">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                📸 {editingGalId ? '🛠️ 선택 스타일 모델 데이터 수정' : '✨ 신규 고양이 미용 모델 스타일 등록'}
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-400 mb-1.5 font-bold">고양이 이름 및 한줄 설명</label>
                  <input 
                    type="text"
                    required
                    placeholder="예: 레오 (페르시안 친칠라)"
                    value={galFormCatName}
                    onChange={(e) => setGalFormCatName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1.5 font-bold">전수받은 미용 코스 코명</label>
                  <input 
                    type="text"
                    placeholder="예: 프리미엄 가위컷 & 딥 스파"
                    value={galFormService}
                    onChange={(e) => setGalFormService(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-stone-400 mb-1.5 font-bold">
                    대표 묘종 태그 분류 (사용자 페이지 필터링용)
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="예: 페르시안, 브리티시 숏헤어, 랙돌, 코리안 숏헤어..."
                    value={galFormBreed}
                    onChange={(e) => setGalFormBreed(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white text-xs font-semibold focus:ring-1 focus:ring-amber-500"
                  />
                  {/* Quick select buttons */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] text-stone-500 self-center mr-1 font-bold">추천 태그:</span>
                    {["페르시안", "브리티시 숏헤어", "랙돌", "스코티시 폴드", "코리안 숏헤어", "러시안 블루", "샴", "아비시니안"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setGalFormBreed(b)}
                        className={`px-2 py-1 rounded text-[10px] font-bold border transition ${
                          galFormBreed === b 
                            ? 'bg-amber-500 border-amber-600 text-stone-950 shadow-xs' 
                            : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Anytime Image Upload Zone */}
                <div className="col-span-2">
                  <label className="block text-xs text-stone-400 mb-1.5 font-bold flex items-center gap-1">
                    <span>🖼️ 미용 사진 등록 (파일 드래그 앤 드롭 및 클릭 선택 지원, 권장 사항)</span>
                  </label>
                  
                  <div 
                    onDragEnter={(e) => { e.preventDefault(); setIsDragActive(true); }}
                    onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragActive(false); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragActive(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        const file = e.dataTransfer.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === 'string') {
                            setGalFormUrl(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                      isDragActive 
                        ? 'border-amber-500 bg-amber-500/10 text-white' 
                        : galFormUrl.startsWith('data:') 
                          ? 'border-emerald-500/50 bg-emerald-500/5 text-stone-200' 
                          : 'border-stone-700 bg-stone-900 hover:border-stone-605 text-stone-400'
                    }`}
                  >
                    <input 
                      type="file"
                      id="gal-file-input"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              setGalFormUrl(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label htmlFor="gal-file-input" className="cursor-pointer block space-y-1">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-3xl mb-1.5">📤</span>
                        <p className="text-xs font-bold text-stone-200">여기에 이미지 파일을 드래그하여 지우거나 마우스 클릭</p>
                        <p className="text-[10px] text-stone-500">기기 내부의 어떤 이미지든 제약 없이 즉각 업로드할 수 있습니다.</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Text URL Input as fallback */}
                <div className="col-span-2">
                  <label className="block text-xs text-stone-400 mb-1 font-bold">또는 직접 이미지 주소(URL) 링크 입력</label>
                  <input 
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={galFormUrl}
                    onChange={(e) => setGalFormUrl(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white text-xs font-mono"
                  />
                </div>

                {/* Preview area */}
                {galFormUrl && (
                  <div className="col-span-2 bg-stone-900/80 p-3 rounded-xl border border-stone-800 flex items-center justify-between gap-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-950 relative border border-stone-800 shrink-0">
                        <img 
                          src={galFormUrl} 
                          alt="Grooming review preview" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            // If preview fails
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300";
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-200">선택한 미용 모델 사진</p>
                        <p className="text-[10px] text-stone-500 font-mono max-w-xs sm:max-w-md truncate">
                          {galFormUrl.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setGalFormUrl("")}
                      className="px-2.5 py-1 text-[10px] text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-600 rounded-md transition-colors"
                    >
                      초기화
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-2.5 pt-2">
                {editingGalId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingGalId(null);
                      setGalFormCatName("");
                      setGalFormService("");
                      setGalFormUrl("");
                      setGalFormBreed("");
                    }}
                    className="px-4 py-2 border border-stone-700 hover:bg-stone-805 rounded-xl text-stone-300 text-xs font-bold cursor-pointer transition"
                  >
                    수정 중단
                  </button>
                )}
                <button 
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-500 text-stone-950 hover:bg-amber-600 shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {editingGalId ? '수정된 스타일 정보 최종 저장 및 즉시 반영' : '새로운 미용 모델 업로드 & 살롱 등록'}
                </button>
              </div>
            </form>

            {/* List current models layout */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-400">현재 살롱 갤러리 컷 ({gallery.length}장)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-stone-850 p-3 rounded-2xl border border-stone-800 space-y-3 relative group flex flex-col justify-between">
                    <div>
                      <div className="aspect-video w-full rounded-xl overflow-hidden bg-stone-900 border border-stone-800 relative">
                        <img 
                          src={item.imageUrl} 
                          alt={item.catName} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        {item.breed && (
                          <span className="absolute top-2.5 right-2.5 text-[9px] bg-stone-950/85 backdrop-blur-md px-2 py-0.6 text-amber-400 rounded-sm font-bold border border-amber-500/25 tracking-wider">
                            🐾 {item.breed}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 px-1">
                        <h4 className="font-bold text-white text-xs">{item.catName}</h4>
                        <p className="text-[10px] text-stone-400 mt-1">{item.serviceReceived}</p>
                      </div>
                    </div>

                    <div className="flex gap-1.5 mt-2 pt-2 border-t border-stone-800">
                      <button 
                        onClick={() => handleEditGallery(item)}
                        className="flex-1 py-1.5 rounded bg-stone-800 hover:bg-stone-750 text-stone-300 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition border border-stone-700"
                      >
                        <Edit className="w-3" /> 항목 변경
                      </button>
                      <button 
                        onClick={() => handleDeleteGallery(item.id)}
                        className="py-1.5 px-3 rounded bg-red-950/70 hover:bg-red-900 border border-red-900/30 text-red-300 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition"
                      >
                        <Trash2 className="w-3" /> 삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: BLOG POST MANAGEMENT SYSTEM */}
        {activeTab === 'blog' && (
          <div className="space-y-6 animate-fade-in" id="blog-tab-wrap">
            <h3 className="font-extrabold text-white text-base border-b border-stone-850 pb-3">공지사항 및 교육 칼럼 저널 대장</h3>

            <form onSubmit={handleSavePost} className="bg-stone-850 p-5 rounded-2xl border border-stone-750 space-y-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                ✍️ {editingPostId ? '에스테틱 저널 칼럼 수정 모드' : '신규 에스테틱 가이드 지식 집필'}
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-stone-450 mb-1">블로그 아티클 및 공지 제목</label>
                  <input 
                    type="text"
                    required
                    placeholder="장모종 고양이 전용 탄산 아쿠아목욕의 놀라운 효과"
                    value={postFormTitle}
                    onChange={(e) => setPostFormTitle(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-450 mb-1">분류 태그 카테고리</label>
                  <select 
                    value={postFormCategory}
                    onChange={(e) => setPostFormCategory(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white text-xs bg-stone-900"
                  >
                    <option value="케어 정보">케어 정보</option>
                    <option value="그루밍 가이드">그루밍 가이드</option>
                    <option value="새소식">새소식</option>
                    <option value="이벤트">이벤트</option>
                  </select>
                </div>

                {/* Anytime Image Upload Zone (Blog) */}
                <div className="col-span-2">
                  <label className="block text-xs text-stone-450 mb-1.5 font-bold flex items-center gap-1">
                    <span>🖼️ 저널 커버 또는 가이드 사진 등록 (파일 드래그 앤 드롭 및 클릭 선택 지원, 권장 사항)</span>
                  </label>
                  
                  <div 
                    onDragEnter={(e) => { e.preventDefault(); setIsBlogDragActive(true); }}
                    onDragOver={(e) => { e.preventDefault(); setIsBlogDragActive(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setIsBlogDragActive(false); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsBlogDragActive(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        const file = e.dataTransfer.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === 'string') {
                            setPostFormImageUrl(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                      isBlogDragActive 
                        ? 'border-amber-500 bg-amber-500/10 text-white' 
                        : postFormImageUrl.startsWith('data:') 
                          ? 'border-emerald-500/50 bg-emerald-500/5 text-stone-200' 
                          : 'border-stone-700 bg-stone-900 hover:border-stone-605 text-stone-400'
                    }`}
                  >
                    <input 
                      type="file"
                      id="blog-file-input"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              setPostFormImageUrl(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label htmlFor="blog-file-input" className="cursor-pointer block space-y-1">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-3xl mb-1.5">📤</span>
                        <p className="text-xs font-bold text-stone-200">여기에 칼럼용 이미지 파일을 드래그하여 두거나 마우스 클릭</p>
                        <p className="text-[10px] text-stone-500">지식 가이드에 삽입할 어떤 이미지든 제약 없이 즉각 업로드할 수 있습니다.</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-stone-450 mb-1 font-bold">또는 직접 이미지 주소(URL) 링크 입력</label>
                  <input 
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={postFormImageUrl}
                    onChange={(e) => setPostFormImageUrl(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white text-xs font-mono font-semibold"
                  />
                </div>

                {/* Blog Image Preview card */}
                {postFormImageUrl && (
                  <div className="col-span-2 bg-stone-900/80 p-3 rounded-xl border border-stone-800 flex items-center justify-between gap-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-950 relative border border-stone-800 shrink-0">
                        <img 
                          src={postFormImageUrl} 
                          alt="Blog review preview" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=300";
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-200">선택한 가이드 칼럼 이미지</p>
                        <p className="text-[10px] text-stone-400 font-mono max-w-xs sm:max-w-md truncate">
                          {postFormImageUrl.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setPostFormImageUrl("")}
                      className="px-2.5 py-1 text-[10px] text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-600 rounded-md transition-colors font-bold"
                    >
                      초기화
                    </button>
                  </div>
                )}

                <div className="col-span-2">
                  <label className="block text-xs text-stone-450 mb-1">상세 칼럼 / 안내 소식 원고 바디 본문 (길이 자유)</label>
                  <textarea 
                    rows={6}
                    required
                    placeholder="여기에 한 행동학 지식이나 안내사항을 편하게 기술해주세요..."
                    value={postFormContent}
                    onChange={(e) => setPostFormContent(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-white text-xs leading-relaxed"
                  />
                </div>

                <div className="col-span-2 flex items-center space-x-2">
                  <input 
                    type="checkbox"
                    id="postFormNotice"
                    checked={postFormNotice}
                    onChange={(e) => setPostFormNotice(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-amber-500 bg-stone-900 border-stone-700"
                  />
                  <label htmlFor="postFormNotice" className="text-xs text-stone-300 font-bold cursor-pointer">
                    🚨 이 게시글을 '최상단 고정 긴급 공지사항 빨간 딱지' 로 발행합니다.
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                {editingPostId && (
                  <button 
                    type="button"
                    onClick={() => {
                      setEditingPostId(null);
                      setPostFormTitle("");
                      setPostFormCategory("케어 정보");
                      setPostFormContent("");
                      setPostFormImageUrl("");
                      setPostFormNotice(false);
                    }}
                    className="px-4 py-2 border border-stone-600 rounded-xl text-stone-300 hover:bg-stone-800 text-xs"
                  >
                    취소
                  </button>
                )}
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-amber-500 text-stone-950 font-bold hover:bg-amber-600 rounded-xl text-xs"
                >
                  {editingPostId ? '에스테틱 칼럼 수정 원고 등록' : '작성 완료 및 미용 센터 블로그 가이드 즉시 라이브 발행'}
                </button>
              </div>
            </form>

            {/* list articles */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-stone-400">발행 완료된 매거진 카드 세션들 ({posts.length}건)</label>
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="p-4 bg-stone-850 rounded-xl border border-stone-800 flex items-start justify-between gap-3">
                    <div className="space-y-1 max-w-[80%]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {post.isNotice && <span className="bg-red-500 text-white font-extrabold text-[8px] px-2 py-0.2 rounded">공지</span>}
                        <span className="text-[9px] font-medium px-2 py-0.2 rounded-sm bg-stone-700 text-stone-300">{post.category}</span>
                        <span className="text-[9px] text-stone-500">{post.date}</span>
                      </div>
                      <h4 className="font-bold text-white text-xs line-clamp-1">{post.title}</h4>
                      <p className="text-[11px] text-stone-550 line-clamp-1">{post.content}</p>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      <button 
                        onClick={() => handleEditPost(post)}
                        className="p-1 px-2 bg-stone-800 text-stone-300 rounded hover:bg-stone-750 text-[10px]"
                      >
                        수정
                      </button>
                      <button 
                        onClick={() => handleDeletePost(post.id)}
                        className="p-1 px-2 bg-red-950 text-red-250 rounded hover:bg-red-900 text-[10px]"
                      >
                        지우기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 6: APPOINTMENT/BOOKING TRACKER */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fade-in" id="bookings-tab-wrap">
            <div className="flex justify-between items-center border-b border-stone-850 pb-3">
              <div>
                <h3 className="font-extrabold text-white text-base">실시간 고객 미용 예약 트래커</h3>
                <p className="text-[10px] text-stone-400 mt-0.5">고객이 홈페이지를 통해 접수 신청한 목록이 가시화됩니다.</p>
              </div>
              <span className="text-xs bg-stone-800 px-3 py-1 rounded-full font-bold text-stone-200">
                총 {appointments.length}건
              </span>
            </div>

            {appointments.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-stone-850 border border-stone-800 space-y-2">
                <p className="text-stone-450 text-xs">현재 접수되거나 예정된 고양이 미용 미팅 예약건이 비어 있습니다.</p>
                <p className="text-[10px] text-stone-550">고객이 홈페이지에서 가입 또는 신청 버튼을 누르면 이 화면에 즉시 로드됩니다!</p>
              </div>
            ) : (
              <div className="space-y-4" id="appointments-list-container">
                {appointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className="p-5 rounded-2xl bg-stone-850 border border-stone-800 space-y-3.5 transition-all hover:border-stone-700"
                    id={`appt-tracker-box-${apt.id}`}
                  >
                    
                    {/* Header */}
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-stone-100 font-extrabold text-sm">{apt.clientName} 보호자</span>
                          <span className="text-[10px] font-mono text-stone-400 font-bold">{apt.clientPhone}</span>
                        </div>
                        <p className="text-[10px] text-stone-500 mt-0.5">신청 접수일: {new Date(apt.createdAt).toLocaleString('ko-KR')}</p>
                      </div>

                      {/* Status select badge */}
                      <div className="flex items-center gap-1.5">
                        <select 
                          value={apt.status}
                          onChange={(e) => onUpdateAppointmentStatus(apt.id, e.target.value)}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg focus:outline-hidden ${
                            apt.status === 'confirmed' 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : apt.status === 'completed'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          <option value="pending">⏳ 승인 대기중</option>
                          <option value="confirmed">✅ 예약 확정</option>
                          <option value="completed">🐾 미용 완료</option>
                        </select>
                        
                        <button 
                          onClick={() => onDeleteAppointment(apt.id)}
                          className="p-1 rounded bg-stone-800 hover:bg-red-950 hover:text-red-300 text-stone-410"
                          title="예약 제거"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Cat and details box */}
                    <div className="grid grid-cols-3 gap-2 bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                      <div>
                        <span className="text-[9px] text-stone-500 block">반려묘 이름</span>
                        <span className="text-white text-xs font-bold font-serif">{apt.catName} ({apt.catBreed || '모름'})</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-500 block">원하는 예약 시간</span>
                        <span className="text-amber-400 text-xs font-bold font-mono">{apt.date} | {apt.time}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-500 block">선택 코스 정보</span>
                        <span className="text-stone-300 text-xs font-bold block truncate">{apt.serviceId || '미기재 (상담)'}</span>
                      </div>
                      {apt.notes && (
                        <div className="col-span-3 pt-2 mt-2 border-t border-stone-800/60 flex gap-1.5 items-start">
                          <span className="text-[9px] text-stone-500 block whitespace-nowrap shrink-0 mt-0.5">상담 전 특이사항:</span>
                          <span className="text-[11px] text-stone-400 leading-relaxed font-sans block">{apt.notes}</span>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 7: METADATA & SEO TOOL */}
        {activeTab === 'seo' && (
          <div className="space-y-6 animate-fade-in" id="seo-tab-wrap">
            <h3 className="font-extrabold text-white text-base border-b border-stone-850 pb-3">인터넷 포털 검색 최적화 (SEO) 세팅</h3>

            <div className="bg-stone-850 p-5 rounded-2xl border border-stone-750 space-y-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                🌐 메타 정보 메이커
              </h4>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs text-stone-400 mb-1">메타 타이틀 (Meta Title)</label>
                  <input 
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2 text-white text-xs font-serif"
                  />
                  <span className="text-[9px] text-stone-500 mt-1 block">구글 검색 탭 상단에 노출되는 대표 브랜드 브라우저 탭 키워드명입니다.</span>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">메타 상세설명 (Meta Description)</label>
                  <textarea 
                    rows={3}
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2 text-white text-xs leading-relaxed"
                  />
                  <span className="text-[9px] text-stone-500 mt-1 block">검색 결과 결과 영역에 표시되는 최대 150자의 주요 핵심 요약문입니다.</span>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">검색 타겟팅 키워드들 (meta keywords, 반점으로 구분)</label>
                  <input 
                    type="text"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2 text-white text-xs"
                  />
                </div>
              </div>

              <button 
                type="button"
                onClick={() => { saveAllChanges(); alert("🔄 메타 최적화 값이 저장 및 반영되었습니다."); }}
                className="w-full py-2.5 bg-amber-500 text-stone-950 font-bold hover:bg-amber-600 rounded-xl text-xs flex justify-center items-center gap-1 cursor-pointer"
              >
                메타 SEO 설정 즉시 저장 및 인덱싱 적용
              </button>
            </div>

            {/* REALISTIC GOOGLE SEARCH ENGINE PREVIEW */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-450">미리보기 (구글 및 포털 검색 시 시뮬레이션)</label>
              
              <div className="bg-white p-6 rounded-2xl border border-stone-200 text-left space-y-1.5 font-sans">
                <div className="flex items-center space-x-1">
                  <span className="text-stone-800 text-xs font-bold">W 고양이 미용 센터</span>
                  <span className="text-stone-400 text-[10px]">https://wcatcenter.com</span>
                </div>
                
                <h4 className="text-blue-800 hover:underline cursor-pointer text-lg font-medium leading-tightline tracking-tight leading-snug">
                  {seoTitle || "W 고양이 미용 센터 | 프리미엄 무마취 고양이 미용실"}
                </h4>
                
                <p className="text-stone-600 text-xs leading-relaxed max-w-xl">
                  {seoDesc || "스트레스 없고 안락한 고양이 전용 전문 목욕 에스테틱 스파 살롱..."}
                </p>
                
                <div className="text-[10px] text-stone-400 pt-1 flex gap-2">
                  <span>추천 태그: {seoKeywords ? seoKeywords.split(',')[0] : "고양이미용"}</span>
                  <span>•</span>
                  <span>매월 할인 행사 진행중</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 8: ADMIN SECURITY PANEL */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fade-in" id="security-tab-wrap">
            <h3 className="font-extrabold text-white text-base border-b border-stone-850 pb-3">관리자(미용디자이너) 계정 보안 관리</h3>

            <div className="bg-stone-850 p-5 rounded-2xl border border-stone-750 space-y-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                🔑 관리자 보안 인증 비밀번호 변경
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                현재 보호 세션 진입 시 사용하는 비밀번호를 변경합니다. 유플렉스 또는 외부 기기 접속 시 고객들에게 비밀번호가 노출되지 않도록 주기적인 보안 관리를 권장합니다.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-stone-400 mb-1">인증 비밀번호 정보 (현재 비밀번호: <strong className="text-stone-200">{adminPassword}</strong>)</label>
                  <input 
                    type="password"
                    placeholder="새로운 비밀번호 입력"
                    value={passInput}
                    onChange={(e) => {
                      setPassInput(e.target.value);
                      if (passError) setPassError(null);
                      if (passSuccess) setPassSuccess(null);
                    }}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2 text-white text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">비밀번호 확인</label>
                  <input 
                    type="password"
                    placeholder="새로운 비밀번호 재입력"
                    value={passConfirm}
                    onChange={(e) => {
                      setPassConfirm(e.target.value);
                      if (passError) setPassError(null);
                      if (passSuccess) setPassSuccess(null);
                    }}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2 text-white text-xs font-semibold"
                  />
                </div>

                {passError && (
                  <p className="text-red-400 text-xs font-bold bg-red-950/20 p-2.5 rounded-xl border border-red-900/40">
                    ⚠️ {passError}
                  </p>
                )}

                {passSuccess && (
                  <p className="text-emerald-400 text-xs font-bold bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-900/40">
                    ✨ {passSuccess}
                  </p>
                )}

                <button 
                  type="button"
                  onClick={() => {
                    if (!passInput) {
                      setPassError("비밀번호를 입력해주세요.");
                      return;
                    }
                    if (passInput !== passConfirm) {
                      setPassError("비밀번호가 일치하지 않습니다. 다시 올바르게 확인해 주세요.");
                      return;
                    }
                    if (passInput.length < 4) {
                      setPassError("비밀번호는 최소 4글자 이상이어야 합니다.");
                      return;
                    }
                    onUpdateAdminPassword(passInput);
                    setPassSuccess("비밀번호가 성공적으로 업데이트 되었습니다!");
                    setPassInput("");
                    setPassConfirm("");
                  }}
                  className="w-full py-2.5 bg-amber-500 text-stone-950 font-bold hover:bg-amber-600 rounded-xl text-xs flex justify-center items-center gap-1 cursor-pointer transition-colors"
                >
                  비밀번호 즉시 변경 및 승인
                </button>
              </div>
            </div>

            {/* Admin logout block inside active security view */}
            <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-3">
              <h4 className="text-xs font-bold text-stone-300">🔓 현재 세션 수동 해제</h4>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                공용 타블릿이나 유플렉스 또는 외부의 디바이스에서 작업을 완료한 후에는 세션을 안전하게 로그아웃하십시오. 로그아웃 즉시 일반 고객 모드로 완벽하게 잠금 처리됩니다.
              </p>
              <button
                type="button"
                onClick={onAdminLogout}
                className="px-4 py-2 bg-red-900/20 hover:bg-red-900/45 border border-red-900/40 hover:border-red-900/60 rounded-xl text-red-400 text-xs font-bold cursor-pointer transition-colors"
              >
                관리자 안전 로그아웃
              </button>
            </div>
          </div>
        )}

      </div>

      {/* QUICK FLOATING SAVE AT BOTTOM OF DRAWER PANEL */}
      <div className="p-4 bg-stone-950 border-t border-stone-850 shrink-0 flex items-center justify-between text-xs text-stone-400">
        <span>스택 세션: Local Storage 캐싱 활성</span>
        <button 
          onClick={() => {
            if (window.confirm("공장 출하 기정 사실 상태로 사이트의 모든 명문 설정을 리셋하시겠습니까?")) {
              localStorage.removeItem('wcat_site_data');
              localStorage.removeItem('wcat_appointments');
              window.location.reload();
            }
          }}
          className="text-stone-500 hover:text-red-400 text-[10px] flex items-center gap-1"
        >
          <RefreshCcw className="w-2.5 h-2.5" /> 모든 설정 기본화
        </button>
      </div>

    </div>
  );
}
