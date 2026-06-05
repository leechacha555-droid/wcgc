import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Sparkles, 
  Heart, 
  Award, 
  Clock, 
  Phone, 
  MapPin, 
  Instagram, 
  ExternalLink, 
  Menu, 
  X, 
  Calendar, 
  Check,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  Scissors
} from 'lucide-react';
import { SiteData, ServiceItem, BlogPost } from '../types';

interface GroomingWebsiteProps {
  data: SiteData;
  onAddAppointment: (appointment: any) => void;
  onRequestOpenAdmin: () => void;
}

export default function GroomingWebsite({ data, onAddAppointment, onRequestOpenAdmin }: GroomingWebsiteProps) {
  const { theme } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>("");
  const [selectedBreed, setSelectedBreed] = useState<string>("전체");

  // Dynamically extract unique breed tags from currently registered gallery items
  const availableBreeds = useMemo(() => {
    const list = new Set<string>();
    data.gallery.forEach(item => {
      if (item.breed && item.breed.trim()) {
        list.add(item.breed.trim());
      }
    });
    return ["전체", ...Array.from(list)];
  }, [data.gallery]);

  const filteredGallery = useMemo(() => {
    if (selectedBreed === "전체") {
      return data.gallery;
    }
    return data.gallery.filter(item => item.breed?.trim() === selectedBreed);
  }, [data.gallery, selectedBreed]);

  // Booking Form State
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [catName, setCatName] = useState("");
  const [catBreed, setCatBreed] = useState("");
  const [catAge, setCatAge] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Map icon strings to Lucide components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6" style={{ color: theme.pointColor }} id="icon-shield" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" style={{ color: theme.pointColor }} id="icon-sparkles" />;
      case 'Heart':
        return <Heart className="w-6 h-6" style={{ color: theme.pointColor }} id="icon-heart" />;
      case 'Award':
        return <Award className="w-6 h-6" style={{ color: theme.pointColor }} id="icon-award" />;
      default:
        return <Scissors className="w-6 h-6" style={{ color: theme.pointColor }} id="icon-scissors" />;
    }
  };

  // Font class mapping
  const getFontClass = () => {
    switch (theme.fontFamily) {
      case 'serif':
        return 'font-serif';
      case 'buri':
        return 'font-buri';
      default:
        return 'font-sans';
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !catName || !bookingDate || !bookingTime) {
      alert("⚠️ 필수 입력 항목을 모두 채워주세요.");
      return;
    }

    const newAppointment = {
      id: "apt-" + Date.now(),
      clientName: bookingName,
      clientPhone: bookingPhone,
      catName,
      catBreed,
      catAge,
      serviceId: selectedServiceForBooking,
      date: bookingDate,
      time: bookingTime,
      notes: bookingNotes,
      status: "pending", // pending, confirmed, completed
      createdAt: new Date().toISOString()
    };

    onAddAppointment(newAppointment);
    setBookingSubmitted(true);

    // Reset Form
    setTimeout(() => {
      setBookingName("");
      setBookingPhone("");
      setCatName("");
      setCatBreed("");
      setCatAge("");
      setBookingDate("");
      setBookingTime("");
      setBookingNotes("");
      setBookingSubmitted(false);
      setBookingModalOpen(false);
    }, 2000);
  };

  const openBookingWithService = (serviceTitle: string) => {
    setSelectedServiceForBooking(serviceTitle);
    setBookingModalOpen(true);
  };

  const formatPrice = (priceStr: string) => {
    const num = parseInt(priceStr, 10);
    if (isNaN(num)) return priceStr;
    return num.toLocaleString() + "원";
  };

  return (
    <div 
      className={`min-h-screen text-stone-900 transition-colors duration-300 ${getFontClass()}`}
      style={{ backgroundColor: theme.backgroundColor }}
      id="website-root-container"
    >
      {/* Dynamic Style injection for custom variables */}
      <style>{`
        .text-point { color: ${theme.pointColor}; }
        .bg-point { background-color: ${theme.pointColor}; }
        .border-point { border-color: ${theme.pointColor}; }
        .focus-ring-point:focus { --tw-ring-color: ${theme.pointColor}; }
        .hover-bg-point-light:hover { background-color: ${theme.pointColor}10; }
        .bg-point-light { background-color: ${theme.pointColor}15; }
      `}</style>

      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100/80" id="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-3 group" id="logo-link">
            <div 
              className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center bg-[#f9f5f0] shadow-xs transition-transform duration-300 group-hover:scale-105 border border-stone-200"
              id="logo-image-container"
            >
              <img 
                src="/src/assets/images/logo_illustration_1780649494750.png" 
                alt="W Cat Grooming Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tighter text-stone-900 transition-colors group-hover:text-point" style={{ color: theme.pointColor }} id="logo-text">
              {data.logoText}
            </span>
          </a>

          {/* Nav Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-widest text-[#555] select-none" id="desktop-nav">
            <a href="#about" className="text-stone-500 hover:text-stone-900 transition-colors">HOME</a>
            <a href="#about" className="text-stone-500 hover:text-stone-900 transition-colors">케어 철학</a>
            <a href="#services" className="text-stone-500 hover:text-stone-900 transition-colors">미용 코스</a>
            <a href="#gallery" className="text-stone-500 hover:text-stone-900 transition-colors">에스테틱 갤러리</a>
            <a href="#blog" className="text-stone-500 hover:text-stone-900 transition-colors">스토리 저널</a>
            <a href="#contact" className="text-stone-500 hover:text-stone-900 transition-colors">예약 & 안내</a>
          </nav>

          {/* Right Header Buttons */}
          <div className="hidden lg:flex items-center space-x-4" id="header-cta-desktop">
            <button 
              onClick={() => { setSelectedServiceForBooking(""); setBookingModalOpen(true); }}
              className="px-6 py-2 bg-point text-white text-[11px] font-bold tracking-widest rounded-full uppercase shadow-xs transition-all duration-300 hover:scale-103 cursor-pointer"
              style={{ backgroundColor: theme.pointColor }}
              id="quick-book-btn-desktop"
            >
              Quick Booking
            </button>
            <button
              onClick={onRequestOpenAdmin}
              className="px-4 py-2 border border-stone-200 text-stone-600 text-[10px] font-bold tracking-widest uppercase rounded-full hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              id="admin-trigger-header"
            >
              ⚙️ ADMIN
            </button>
          </div>

          {/* Hamburger Menu Toggler */}
          <div className="flex items-center space-x-2 md:hidden" id="mobile-nav-toggler-wrap">
            <button
              onClick={onRequestOpenAdmin}
              className="p-2 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200"
              title="관리자 대시보드 열기"
              id="admin-trigger-mobile-header"
            >
              ⚙️
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-50"
              aria-label="Toggle Menu"
              id="mobile-menu-burger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Area */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-100 animate-fade-in absolute w-full left-0 px-4 pt-2 pb-6 space-y-3 z-50 shadow-lg" id="mobile-nav-panel">
            <nav className="flex flex-col space-y-3 px-2">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-stone-700 font-medium border-b border-stone-50"
              >
                케어 철학
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-stone-700 font-medium border-b border-stone-50"
              >
                미용 코스
              </a>
              <a 
                href="#gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-stone-700 font-medium border-b border-stone-50"
              >
                에스테틱 갤러리
              </a>
              <a 
                href="#blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-stone-700 font-medium border-b border-stone-50"
              >
                스토리 저널
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-stone-700 font-medium border-b border-stone-50"
              >
                예약 & 안내
              </a>
            </nav>
            <div className="pt-2 px-2 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); setSelectedServiceForBooking(""); setBookingModalOpen(true); }}
                className="w-full py-3 rounded-xl text-white font-semibold text-center shadow-md text-sm cursor-pointer"
                style={{ backgroundColor: theme.pointColor }}
                id="quick-book-btn-mobile"
              >
                빠른 실시간 예약하기
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onRequestOpenAdmin(); }}
                className="w-full py-2.5 rounded-xl bg-stone-150 text-stone-700 font-semibold text-xs text-center border border-stone-200 cursor-pointer"
                id="admin-btn-mobile-nav"
              >
                💻 실시간 웹빌더 대시보드 열기
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-white" id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col space-y-6 text-left" id="hero-content-left">
              <div className="flex flex-col space-y-2">
                <p className="text-point text-[11px] sm:text-xs font-bold uppercase tracking-widest" style={{ color: theme.pointColor }} id="hero-editorial-brand-label">
                  Premium Feline Grooming Salon
                </p>
                <div className="h-[2px] w-12" style={{ backgroundColor: theme.pointColor }} />
              </div>
              
              <h1 
                className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-light leading-[1.15] tracking-tight text-zinc-800 whitespace-pre-line"
                id="hero-main-title"
              >
                {data.heroTitle}
              </h1>
              
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed max-w-xl" id="hero-subtext">
                {data.heroSub}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4" id="hero-ctas">
                <button 
                  onClick={() => { setSelectedServiceForBooking(""); setBookingModalOpen(true); }}
                  className="px-8 py-3.5 rounded-full text-white text-[11px] font-bold tracking-widest uppercase shadow-xs transition-transform hover:-translate-y-0.5 duration-300 text-center cursor-pointer"
                  style={{ backgroundColor: theme.pointColor }}
                  id="hero-primary-cta"
                >
                  {data.heroBtnText}
                </button>
                <a 
                  href="#services" 
                  className="px-8 py-3.5 rounded-full border border-zinc-200 bg-white/50 text-[#555] text-[11px] font-bold tracking-widest uppercase hover:bg-stone-50 hover:text-zinc-800 transition-colors text-center"
                  id="hero-secondary-cta"
                >
                  에스테틱 코스 보기
                </a>
              </div>
            </div>

            {/* Right Graphic/Image */}
            <div className="lg:col-span-5 relative" id="hero-graphic-right">
              <div 
                className="absolute inset-0 bg-[#f9f5f0] rounded-tl-[120px] rounded-br-[120px] border border-stone-200/50 transform rotate-2"
              />
              <div className="relative z-10 p-2">
                <img 
                  src={data.heroImageUrl} 
                  alt="Beautiful relaxed cat being groomed" 
                  className="w-full h-[350px] sm:h-[450px] object-cover rounded-tl-[100px] rounded-br-[100px] border border-stone-100 bg-[#f9f5f0]"
                  referrerPolicy="no-referrer"
                  id="hero-cat-image"
                />
              </div>
              {/* Overlay Stat Card */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xs border border-stone-100 z-20 flex items-center space-x-3 max-w-xs" id="hero-floating-stat-card">
                <div 
                  className="w-8 h-8 rounded-full bg-point-light flex items-center justify-center text-point"
                  style={{ color: theme.pointColor }}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold">스트레스 최소화 저자극 미용</p>
                  <p className="text-zinc-800 text-xs font-semibold mt-0.5">10,000마리 시술 신뢰</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="py-20 bg-white border-t border-b border-stone-100" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Section title & main desc */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20" id="about-header">
            <h2 className="text-[11px] font-bold tracking-widest text-[#D4A373] uppercase" style={{ color: theme.pointColor }}>
              OUR PHILOSOPHY
            </h2>
            <h3 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-zinc-800 leading-snug">
              {data.aboutTitle}
            </h3>
            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed whitespace-pre-line max-w-2xl mx-auto">
              {data.aboutDesc}
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4" id="about-feature-grid">
            {data.features.map((feat, index) => (
              <div 
                key={feat.id}
                className="border-l border-zinc-200 pl-6 flex flex-col justify-between py-2 hover:border-point transition-all duration-300 group"
                id={`feature-card-${feat.id}`}
              >
                <div>
                  <h3 
                    className="text-[10px] font-bold uppercase tracking-widest mb-3 underline underline-offset-8 transition-colors group-hover:text-point select-none"
                    style={{ color: theme.pointColor, decorationColor: `${theme.pointColor}60` }}
                  >
                    0{index + 1}. {feat.title.split(' ')[0]}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-800 font-bold mb-2 font-serif mt-5 tracking-tight group-hover:text-point transition-colors leading-snug">
                    {feat.title}
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                    {feat.description}
                  </p>
                </div>
                {/* Accent icon matching the premium look but drawn cleanly */}
                <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {getIconComponent(feat.icon)}
                  </div>
                  <span>W Care Standard</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SERVICES & PRICING */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Title Area */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-20" id="services-header">
            <span 
              className="text-[11px] font-bold tracking-widest text-[#D4A373] uppercase block"
              style={{ color: theme.pointColor }}
            >
              PREMIUM PROGRAMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-zinc-800" id="services-main-title">
              {data.servicesTitle}
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed" id="services-subtext">
              {data.servicesSubtitle}
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-5xl mx-auto" id="services-grid">
            {data.services.map((srv) => (
              <div 
                key={srv.id}
                className={`bg-white rounded-xl p-8 border relative flex flex-col justify-between transition-all duration-300 hover:border-point/40 hover:shadow-2xs ${
                  srv.isPopular 
                    ? 'border-t-4 border-l border-r border-b' 
                    : 'border-stone-200/60'
                }`}
                style={{ 
                  borderTopColor: srv.isPopular ? theme.pointColor : undefined,
                }}
                id={`service-card-${srv.id}`}
              >
                {srv.isPopular && (
                  <span 
                    className="absolute -top-3 left-8 px-4 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase bg-point"
                    style={{ backgroundColor: theme.pointColor }}
                  >
                    W 최고 인기 추천
                  </span>
                )}

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-serif font-bold text-zinc-800 pr-4 leading-snug">{srv.title}</h3>
                    <div className="flex items-center text-zinc-400 text-[11px] font-medium tracking-wide gap-1 shrink-0 bg-stone-50 px-2.5 py-1 rounded">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{srv.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed min-h-[3.5rem] whitespace-pre-line">{srv.description}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-400 text-[10px] font-bold tracking-widest uppercase block mb-1">코스 이용 비용</span>
                    <span className="text-2xl font-serif text-zinc-800 font-bold" style={{ color: theme.pointColor }}>
                      {formatPrice(srv.price)}
                    </span>
                  </div>
                  <button 
                    onClick={() => openBookingWithService(srv.title)}
                    className="px-6 py-2.5 rounded-full text-white text-[11px] font-bold tracking-widest uppercase shadow-xs transition-all duration-300 hover:scale-103 cursor-pointer"
                    style={{ backgroundColor: theme.pointColor }}
                    id={`book-btn-${srv.id}`}
                  >
                    Quick Booking
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-[#fdfbf8] rounded-xl p-6 max-w-2xl mx-auto border border-stone-150" id="services-general-warning">
            <p className="text-zinc-500 text-xs leading-relaxed font-sans">
              💡 <strong>안내사항:</strong> 반려묘의 털 엉킴 정도, 공격성, 몸무게 및 묘종에 따른 세부 품목 변동액이 발생할 수 있습니다.<br />
              W 센터는 미용 전 꼼꼼한 사전 체크리스트 컨설팅을 제공하여 보호자 동의 후 미용을 개시합니다.
            </p>
          </div>

        </div>
      </section>

      {/* GALLERY/PORTFOLIO */}
      <section className="py-20 bg-[#faf8f5]/55 border-t border-b border-stone-100 animate-fade-in" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Gallery Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10" id="gallery-header">
            <span className="text-[11px] font-bold tracking-widest text-[#D4A373] uppercase block" style={{ color: theme.pointColor }}>STYLE BOOK</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-zinc-800" id="gallery-title">
              {data.galleryTitle}
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed" id="gallery-subtitle">
              {data.gallerySubtitle}
            </p>
          </div>

          {/* Breed Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12" id="gallery-breed-filter">
            {availableBreeds.map((breed) => {
              const isActive = selectedBreed === breed;
              const breedCount = breed === "전체" 
                ? data.gallery.length 
                : data.gallery.filter(item => item.breed?.trim() === breed).length;
              return (
                <button
                  key={breed}
                  onClick={() => setSelectedBreed(breed)}
                  className={`px-4.5 py-2.2 rounded-full text-xs font-bold tracking-tight transition-all duration-300 cursor-pointer border ${
                    isActive 
                      ? 'shadow-sm border-transparent text-white' 
                      : 'bg-white border-stone-200/80 text-zinc-550 hover:text-zinc-800 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                  style={isActive ? { backgroundColor: theme.pointColor } : {}}
                >
                  {breed} 
                  <span className={`ml-1 text-[10px] ${isActive ? 'text-white/80' : 'text-zinc-400'}`}>
                    ({breedCount})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animating Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" 
            id="gallery-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  key={item.id}
                  className="group relative overflow-hidden bg-white border border-stone-100 transition-all duration-300 hover:scale-[1.01]"
                  id={`gallery-item-${item.id}`}
                >
                  <div className="aspect-square w-full overflow-hidden bg-[#f9f5f0] relative">
                    <div className="absolute inset-0 bg-zinc-950/5 group-hover:opacity-0 transition-opacity z-10" />
                    <img 
                      src={item.imageUrl} 
                      alt={item.catName} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {item.breed && (
                      <span 
                        className="absolute top-3 right-3 text-[9px] bg-white/90 backdrop-blur-xs px-2 py-0.5 text-zinc-700 font-bold border border-stone-100 rounded-sm tracking-wider uppercase shadow-xs z-20"
                      >
                        🐾 {item.breed}
                      </span>
                    )}
                  </div>
                  {/* Overlay details */}
                  <div className="p-5 flex flex-col justify-end bg-white border-t border-stone-100">
                    <h4 className="font-serif text-base text-zinc-800 font-bold group-hover:text-point transition-colors" style={{ color: theme.pointColor }}>
                      {item.catName}
                    </h4>
                    <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest font-bold font-sans">{item.serviceReceived}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State Fallback */}
          {filteredGallery.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-6 bg-white border border-stone-100 rounded-2xl max-w-md mx-auto space-y-4 shadow-xs"
              id="gallery-empty-state"
            >
              <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl">🐾</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-zinc-805">디자인 모델 갤러리 준비 중</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  현재 등록된 '{selectedBreed}' 묘종의 전후 스타일 비교가 없습니다.<br />
                  실시간 대시보드 또는 원격 그루밍 게시판에 미용 컷을 추가해 보세요!
                </p>
              </div>
              <button 
                onClick={() => setSelectedBreed("전체")}
                className="text-xs font-bold px-4 py-2 border rounded-full transition-colors cursor-pointer hover:bg-stone-50"
                style={{ borderColor: theme.pointColor, color: theme.pointColor }}
              >
                전체 스타일 북 보기
              </button>
            </motion.div>
          )}

        </div>
      </section>

      {/* BLOG / NEWS SECTION */}
      <section className="py-20 bg-white" id="blog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-20" id="blog-header">
            <span className="text-[11px] font-bold tracking-widest text-[#D4A373] uppercase block" style={{ color: theme.pointColor }}>AESTHETIC JOURNAL</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-zinc-800" id="blog-title">
              {data.blogTitle}
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto" id="blog-subtitle">
              {data.blogSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="blog-grid">
            {data.posts.map((post) => (
              <article 
                key={post.id}
                className="bg-white border border-stone-200/60 hover:border-point/40 transition-all duration-300 flex flex-col h-full group"
                id={`blog-card-${post.id}`}
              >
                <div className="h-48 overflow-hidden bg-stone-100 relative">
                  <img 
                    src={post.imageUrl || "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600"} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  {post.isNotice && (
                    <span 
                      className="absolute top-4 left-4 text-[9px] font-bold text-white tracking-wider uppercase px-2.5 py-1 bg-red-500 rounded-sm"
                    >
                      공지사항
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-stone-500 rounded-sm border border-stone-100">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div className="space-y-3">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">{post.date}</span>
                    <h3 className="text-base font-serif font-bold text-zinc-800 line-clamp-2 group-hover:text-point transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed font-sans">
                      {post.content}
                    </p>
                  </div>

                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#D4A373] flex items-center gap-1.5 hover:underline text-left cursor-pointer transition-colors"
                    style={{ color: theme.pointColor }}
                  >
                    READ ARTICLE <ChevronRight className="w-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT/LOCATION SECTION */}
      <section className="py-24 bg-[#141414] text-white border-t border-zinc-800" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Col - Address */}
            <div className="lg:col-span-5 space-y-6" id="contact-left">
              <span className="text-[#D4A373] text-[11px] font-bold tracking-widest uppercase block" style={{ color: theme.pointColor }}>RESERVATION & ROUTE</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-white" id="contact-shop-name">
                {data.logoText}
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                반려묘와 동행 시 안정성을 극대화하기 위해 미리 전화 또는 빠른 인터넷 예약을 활용해주시기 바랍니다. 보호자가 편안하게 쉴 수 있는 웰컴 로비 카페가 마련되어 있습니다.
              </p>

              <div className="space-y-6 pt-6 border-t border-zinc-800" id="contact-details-list">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-zinc-700/60 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A373]" style={{ color: theme.pointColor }} />
                  </div>
                  <div>
                    <h4 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">LOCATION</h4>
                    <p className="text-zinc-200 text-xs sm:text-sm mt-1 leading-relaxed font-sans">{data.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-zinc-700/60 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-[#D4A373]" style={{ color: theme.pointColor }} />
                  </div>
                  <div>
                    <h4 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">TELEPHONE</h4>
                    <p className="text-[#D4A373] text-base sm:text-lg mt-1 font-serif tracking-tight font-bold" style={{ color: theme.pointColor }}>{data.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-zinc-700/60 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4A373]" style={{ color: theme.pointColor }} />
                  </div>
                  <div>
                    <h4 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">OPENING HOURS</h4>
                    <p className="text-zinc-200 text-xs sm:text-sm mt-1 leading-relaxed font-sans">{data.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col - Maps Graphic & Social links container */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8" id="contact-right">
              {/* Simulated Map Visual Card */}
              <div className="w-full bg-[#1c1c1c] rounded-xl p-6 flex flex-col justify-between h-[250px] relative overflow-hidden border border-zinc-800" id="mock-map-card">
                {/* stylized map background details */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-zinc-600 rotate-12" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-zinc-600 -rotate-45" />
                  <div className="absolute top-1/3 left-0 right-0 h-2 bg-zinc-600" />
                  <div className="absolute top-2/3 left-0 right-0 h-4 bg-zinc-600 -rotate-6" />
                  <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full border-4 border-zinc-400 -translate-x-1/2 -translate-y-1/2" />
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full border border-zinc-700 select-none">
                    실시간 안전 귀가 차량 연계 가능
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="relative z-10 flex items-center gap-3 bg-zinc-950/90 backdrop-blur-md p-4 rounded-xl border border-zinc-800 self-center w-full max-w-sm">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-[#f9f5f0] border border-zinc-700 shrink-0">
                    <img 
                      src="/src/assets/images/logo_illustration_1780649494750.png" 
                      alt="W Cat Grooming Logo" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-stone-100">W고양이미용센터 인천 부평</h4>
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-center text-[10px] text-zinc-500 font-bold tracking-wider">
                  <span>주차 안내: 자체 주차장 보유, 만차 시 하이파킹 삼산주차타워 주차 가능</span>
                  <a 
                    href="https://naver.me/xcnBE0Ep" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#D4A373] hover:underline flex items-center gap-1 uppercase tracking-widest font-bold"
                    style={{ color: theme.pointColor }}
                  >
                    NAVER MAP <ExternalLink className="w-3" />
                  </a>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="grid grid-cols-3 gap-4" id="social-channels-grid">
                
                <a 
                  href={`https://instagram.com/${data.contact.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1c1c1c] hover:bg-zinc-800 p-4 border border-zinc-800/80 rounded-xl flex flex-col items-center justify-center text-center space-y-2 group transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#D4A373] group-hover:scale-110 duration-200" style={{ color: theme.pointColor }} />
                  <span className="text-zinc-200 text-[10px] tracking-widest uppercase block font-bold">INSTAGRAM</span>
                  <span className="text-[10px] text-zinc-500 font-medium">@{data.contact.instagram}</span>
                </a>

                 <a 
                  href="https://open.kakao.com/o/saGfzpeg"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1c1c1c] hover:bg-zinc-800 p-4 border border-zinc-800/80 rounded-xl flex flex-col items-center justify-center text-center space-y-2 group transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4A373] group-hover:scale-110 duration-200" style={{ color: theme.pointColor }} />
                  <span className="text-zinc-200 text-[10px] tracking-widest uppercase block font-bold">KAKAOTALK</span>
                  <span className="text-[10px] text-zinc-500 font-medium">@W고양이 미용상담</span>
                </a>

                <a 
                  href={`https://blog.naver.com/${data.contact.blog}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1c1c1c] hover:bg-zinc-800 p-4 border border-zinc-800/80 rounded-xl flex flex-col items-center justify-center text-center space-y-2 group transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#D4A373] group-hover:scale-110 duration-200" style={{ color: theme.pointColor }} />
                  <span className="text-zinc-200 text-[10px] tracking-widest uppercase block font-bold">NAVER BLOG</span>
                  <span className="text-[10px] text-zinc-500 font-medium">지식 가이드</span>
                </a>

              </div>
            </div>

          </div>

          <div className="mt-20 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-[10px] tracking-widest font-bold uppercase gap-4" id="footer-co">
            <p>© 2026 W CAT CENTER. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#about" className="hover:underline hover:text-white transition-colors">이용약관</a>
              <a href="#about" className="hover:underline hover:text-white transition-colors">개인정보처리방침</a>
              <button onClick={onRequestOpenAdmin} className="hover:underline text-[9px] text-[#D4A373] bg-zinc-800/80 border border-zinc-700/60 px-2 py-0.5 rounded-sm" style={{ color: theme.pointColor }}>
                Manager Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK BOOKING MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="booking-modal-backdrop">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-stone-100 flex flex-col" id="booking-modal-card">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <div>
                <h3 className="text-lg font-serif font-bold text-zinc-800">W 에스테틱 1:1 맞춤 예약 및 상담</h3>
                <p className="text-xs text-stone-500 mt-1">
                  {selectedServiceForBooking 
                    ? `선택하신 코스: ${selectedServiceForBooking}` 
                    : "W 고양이 미용 센터 1:1 디자이너 전담제 상담 프로그램"}
                </p>
              </div>
              <button 
                onClick={() => setBookingModalOpen(false)}
                className="p-1 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6 text-center">
              <div className="w-14 h-14 bg-[#D4A373]/10 rounded-full flex items-center justify-center mx-auto text-amber-600" style={{ backgroundColor: `${theme.pointColor}15`, color: theme.pointColor }}>
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              
              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="text-base font-bold text-zinc-805">안전제일 1:1 사전 교감 상담제 운영 안내</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  W Cat Grooming Center는 기계적 미용 접수 시 발생할 수 있는 반려묘의 스트레스 우려 및 털 뭉침 점검 오류를 예방하기 위해, 실시간 <strong className="text-zinc-800 font-bold">1:1 온라인 및 수동 전화 컨설팅</strong>으로 일정을 매칭하고 있습니다.
                </p>
                <p className="text-[11px] text-[#D4A373] font-bold font-sans animate-bounce" style={{ color: theme.pointColor }}>
                  상담사 및 예약 담당 스태프와 1초 만에 바로 연결됩니다.
                </p>
              </div>

              {/* Direct Call / Chat Triggers in Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* KakaoTalk Direct Link (New Tab) */}
                <a 
                  href="https://open.kakao.com/o/saGfzpeg"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-5 bg-[#FEE500]/12 hover:bg-[#FEE500]/25 rounded-2xl border border-[#FEE500]/25 hover:scale-[1.01] transition-all cursor-pointer group shadow-xs"
                >
                  <MessageSquare className="w-7 h-7 text-yellow-600 group-hover:scale-108 duration-200" />
                  <span className="text-xs font-bold text-amber-950 mt-2.5">카카오톡 1:1 예약 상담</span>
                  <span className="text-[10px] text-amber-850/70 mt-0.5">실시간 무료 오픈채팅 연결</span>
                </a>

                {/* Direct Dial Tel Link */}
                <a 
                  href={`tel:${data.contact.phone}`}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl border hover:scale-[1.01] transition-all cursor-pointer group shadow-xs"
                  style={{ backgroundColor: `${theme.pointColor}10`, borderColor: `${theme.pointColor}20` }}
                >
                  <Phone className="w-7 h-7 group-hover:scale-108 duration-200" style={{ color: theme.pointColor }} />
                  <span className="text-xs font-bold mt-2.5" style={{ color: theme.pointColor }}>전화 예약 및 문의</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">모바일 터치 시 즉시 다이얼 연결</span>
                </a>

              </div>

              {/* Guide Warning Banner */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-150 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-500 font-bold text-[10px] tracking-wider uppercase">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>실시간 데스크 상담 시간</span>
                </div>
                <p className="text-[11px] text-zinc-600 leading-relaxed font-sans pl-5">
                  오전 10:00 ~ 오후 08:30 (매주 월요일 정기 유무 정기 살롱 휴업)<br />
                  시간 외 접수는 다음 영업일 오전 중 순차적으로 문자 및 대기 연락을 전달 드리고 있습니다.
                </p>
              </div>

            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end">
              <button 
                onClick={() => setBookingModalOpen(false)}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      )}

      {/* VIEW BLOG DETAILS MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="blog-modal-backdrop">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative border border-stone-100 flex flex-col" id="blog-modal-card">
            
            <div className="relative h-64 bg-stone-100">
              <img 
                src={selectedPost.imageUrl || "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600"} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-stone-900/40 hover:bg-stone-900/60 transition-colors p-2 text-white rounded-full"
                title="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto" id="blog-modal-content">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-sm bg-stone-100 text-stone-600">
                  {selectedPost.category}
                </span>
                <span className="text-stone-400 text-xs">{selectedPost.date}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-stone-850 leading-snug">
                {selectedPost.title}
              </h3>

              <div className="text-sm text-stone-650 leading-relaxed whitespace-pre" style={{ wordBreak: 'break-all' }}>
                {selectedPost.content}
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end">
              <button 
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 bg-stone-850 text-white hover:bg-stone-900 rounded-xl text-xs font-bold cursor-pointer"
              >
                독서 완료 (닫기)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
