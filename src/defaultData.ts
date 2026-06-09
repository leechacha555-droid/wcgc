import { SiteData } from './types';

export const defaultSiteData: SiteData = {
  logoText: "W 고양이 미용 센터",
  heroTitle: "스트레스 없는 교감,\n오직 고양이만을 위한 고품격 미용 공간",
  heroSub: "W 고양이 미용 센터는 고양이의 신체적 특성과 정서적 안정을 최우선으로 생각합니다. 영역 동물인 반려묘가 낯선 환경에서도 안정을 유지할 수 있도록 설계된 아늑한 공간에서 프리미엄 1:1 케어를 선사합니다.",
  heroBtnText: "실시간 미용 예약하기",
  heroImageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop",
  aboutTitle: "W의 특별한 케어 철학",
  aboutDesc: "우리는 단순히 털을 깎는 행위를 넘어, 반려묘가 온전한 휴식과 케어를 경험할 수 있도록 모든 디테일을 정교하게 설계했습니다. 고양이 전문 스타일러가 시간에 쫓기지 않는 완전한 1:1 예약제 시스템 하에 편안하고 아름다운 미용을 실현합니다.",
  features: [
    {
      id: "feat-1",
      icon: "ShieldAlert",
      title: "저스트레스 무마취 미용",
      description: "고양이의 인지 행동을 이해하는 전문 미용사가 강제적인 통제 없이, 고양이의 페이스에 맞추어 부드러운 교감 미용을 보장합니다."
    },
    {
      id: "feat-2",
      icon: "Sparkles",
      title: "프리미엄 친환경 케어",
      description: "피부가 예민한 고양이들을 위해 화학 성분을 완전히 배제하고 유기농 천연 원료로 조제된 고가 샴푸와 맞춤형 진정 오일을 사용합니다."
    },
    {
      id: "feat-3",
      icon: "Heart",
      title: "스트레스 제로 통창 오픈룸",
      description: "모든 미용실은 안전한 대기 공간과 공기 청정 살균 시스템을 완비하였으며 보호자님이 원하실 경우 프라이빗하게 참관할 수 있습니다."
    },
    {
      id: "feat-4",
      icon: "Award",
      title: "고양이 전문 미용 마스터",
      description: "수년간 고양이의 신체 패턴과 행동 심리를 연구한 메인 헤드 스타일러가 모든 아이들의 정밀 상태진단 후 모질별 스타일 제안을 해 드립니다."
    }
  ],
  servicesTitle: "미용 및 피모 테라피",
  servicesSubtitle: "W 에스테틱만의 디테일하고 부드러운 단계별 케어 프로그램을 만나보세요.",
  services: [
    {
      id: "srv-1",
      title: "베이직 위생 미용 & 목욕 (Basic Care)",
      price: "70000",
      duration: "60분",
      description: "발톱 정리, 발바닥 미용, 귀 케어, 눈가 정리, 항문낭 관리 후 묘체 맞춤형 유기농 샴푸 목욕과 저소음 시스템 드라이룸 케어가 포함된 기본 코스입니다. 목욕 스트레스가 높은 아이들에게 안성맞춤입니다.",
      isPopular: false
    },
    {
      id: "srv-2",
      title: "프리미엄 가위컷 & 마이크로 버블 스파 (Special Scissors Cut)",
      price: "180000",
      duration: "120분",
      description: "헤드 스타일러의 1:1 밀착 전신 가위컷 스타일링(오동통 볼터치, 부츠형 레그 컷 등)과 모낭까지 노폐물을 씻어내고 각질을 완화시켜주는 탄산 마이크로버블 딥 클렌징 스파가 함께 제공되는 W 센터 최고급 시그니처 코스입니다.",
      isPopular: true
    },
    {
      id: "srv-3",
      title: "올인원 풀 클리핑 미용 (Full Grooming)",
      price: "120000",
      duration: "90분",
      description: "가위 미용이 부담스러운 모량이나 모질 상태, 혹은 심한 엉킴 모발을 부드럽게 해결해주는 저자극 클리핑 코스입니다. 피부 자극을 최소화하는 고난이도 세라믹 날을 사용하며, 베이직 위생 케어와 스킨 수분 미스트 가습이 함께 동반됩니다.",
      isPopular: false
    },
    {
      id: "srv-4",
      title: "딥 실크 사계절 모질 영양 스파 (Deep Silk Spa Add-on)",
      price: "50000",
      duration: "40분",
      description: "건조하고 윤기가 없는 모발을 회복하고 정전기를 심하게 유도하는 죽은 털을 말끔하게 정돈해주는 영양팩 테라피입니다. 실크 단백질 마스크 성분을 수증기로 흡수시켜 반려묘의 기분 전환 및 피부 가려움 해소에 최적입니다 (미용 코스 시 연계 선택 전용).",
      isPopular: false
    }
  ],
  galleryTitle: "에스테틱 비포 & 애프터 갤러리",
  gallerySubtitle: "W 고양이 미용 센터의 전문적인 에스테틱 터치로 다시 태어난 아이들의 미용 전후(Before & After) 상세 비교 포트폴리오입니다.",
  gallery: [
    {
      id: "gal-1",
      catName: "레오 (페르시안 친칠라)",
      serviceReceived: "프리미엄 가위컷 & 딥 스파",
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600",
      beforeImageUrl: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=80&w=600",
      breed: "페르시안"
    },
    {
      id: "gal-2",
      catName: "미미 (브리티시 숏헤어)",
      serviceReceived: "베이직 위생 케어 & 아로마 입욕",
      imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600",
      beforeImageUrl: "https://images.unsplash.com/photo-1574158622643-69d34d72650a?q=80&w=600",
      breed: "브리티시 숏헤어"
    },
    {
      id: "gal-3",
      catName: "쿠키 (랙돌)",
      serviceReceived: "시그니처 하이바 가위컷 케어",
      imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600",
      beforeImageUrl: "https://images.unsplash.com/photo-1513360309081-36f5e878fc11?q=80&w=600",
      breed: "랙돌"
    },
    {
      id: "gal-4",
      catName: "루나 (스코티시 폴드)",
      serviceReceived: "올인원 풀 미용 & 실크 코팅",
      imageUrl: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=600",
      beforeImageUrl: "https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=600",
      breed: "스코티시 폴드"
    }
  ],
  blogTitle: "W 에스테틱 저널 & 정보 센터",
  blogSubtitle: "고양이의 건강한 삶과 스트레스 완화 관리에 도움을 주는 미용 라이프 가이드를 확인해보세요.",
  posts: [
    {
      id: "post-1",
      title: "고양이 첫 미용 시 극도의 스트레스를 줄이기 위해 알아두어야 할 필수 팁",
      category: "케어 정보",
      date: "2026-06-01",
      content: "낯선 사람이 자신의 몸 구석구석을 만들고 빗질하고 목욕까지 시킬 때, 고양이는 극대화된 경계심을 느끼게 됩니다. W 고양이 미용 센터에서는 '교감 퍼스트' 라는 지침 하에, 미용을 시작하기 전 최소 15분 이상의 냄새 교감 과정을 거칩니다. 보호자님들도 이동 전에 고양이가 사랑해 마지않는 애착 담요나 펠리웨이 스프레이를 이동장에 살짝 묻혀오시면 심리적 충격을 현저히 완화시키는데 아주 큰 도움을 줍니다.",
      imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=600"
    },
    {
      id: "post-2",
      title: "이중모 반려묘의 극심한 털 엉킴을 3분 홈 케어로 예방하는 올바른 브러싱 루틴",
      category: "그루밍 가이드",
      date: "2026-05-24",
      content: "페르시안이나 노르웨이 숲 같은 연약하고 우아한 장모종 친구들은 속털(언더코트)이 쉽게 뭉칩니다. 손으로 미련 없이 뜯어내거나 가위로 잘못 잘라내다가는 연약한 살점 피부 사고를 야기하기 쉽습니다. 홈케어의 정석은 슬리커 브러시와 일자 빗(콤)의 유기적 분배입니다. 슬리커를 45도 각도로 부드럽게 세워 가로 방향으로 엉킨 면적을 조밀하게 긁어낸 후, 반드시 일자 빗으로 뿌리부터 걸림이 없는지를 한 차례 최종 검사해주어야 사전에 극심한 털 엉킴 매트 발생을 깔끔히 차단할 수 있습니다.",
      imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=600"
    },
    {
      id: "post-3",
      title: "[안내] 고양이 전문 미용 최고 마스터 클래스 수료 및 세미나 참석 소식",
      category: "새소식",
      date: "2026-05-18",
      content: "W 고양이 미용 센터의 전 스태프는 더 정교하고 진통 없는 최신 고양이 심리 그루밍 학과와 스파 테라피 기술 수료를 완료했습니다. 이번 한국 펠리코스메틱 아카데미가 주최한 고양이 무마취 핸들링 마스터 클래스 수료를 계기로, 앞으로도 안전성과 더불어 피모 본연의 미학적 광택을 최상의 수준으로 살려낼 수 있는 국내 0.1% 명문 살롱의 가치를 확고히 지켜 나갈 것을 약속 드립니다.",
      imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600",
      isNotice: true
    }
  ],
  contact: {
    address: "인천광역시 부평구 부평대로 인근 W고양이미용센터 인천 부평",
    phone: "032-543-8899",
    hours: "화요일 - 일요일 | 오전 10:00 ~ 오후 08:30 (매주 월요일 정기 휴무, 전면 100% 예약 밀착제)",
    instagram: "wcat_grooming_official",
    kakao: "W고양이미용센터_채널",
    blog: "naver_blog_wcatcenter"
  },
  theme: {
    pointColor: "#D4A373",
    backgroundColor: "#FFFFFF",
    textColor: "#1C1917", // warm stone-900 list
    fontFamily: "serif"
  },
  seo: {
    metaTitle: "W 고양이 미용 센터 | 스트레스 없는 프리미엄 고양이 미용 전문실",
    metaDescription: "고양이 전문 1:1 무마취 저스트레스 친환경 교감 목욕 에스테틱, 가위컷, 스파 스페셜 살롱.",
    metaKeywords: "고양이 미용, 고양이 무마취 미용, 인천 고양이 미용, 부평 고양이 미용, 고양이 은퇴 미용, 고양이 스파, 고양이 가위컷, 프리미엄 고양이 목욕"
  }
};
