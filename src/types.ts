export interface FeatureItem {
  id: string;
  icon: string; // lucide icon identifier
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  isPopular?: boolean;
}

export interface GalleryItem {
  id: string;
  catName: string;
  serviceReceived: string;
  imageUrl: string;
  beforeImageUrl?: string;
  breed?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
  imageUrl: string;
  isNotice?: boolean;
}

export interface ContactInfo {
  address: string;
  phone: string;
  hours: string;
  instagram: string;
  kakao: string;
  blog: string;
}

export interface ThemeConfig {
  pointColor: string; // hex
  backgroundColor: string; // hex
  textColor: string; // dark color
  fontFamily: 'sans' | 'serif' | 'buri';
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface SiteData {
  logoText: string;
  heroTitle: string;
  heroSub: string;
  heroBtnText: string;
  heroImageUrl: string;
  aboutTitle: string;
  aboutDesc: string;
  features: FeatureItem[];
  servicesTitle: string;
  servicesSubtitle: string;
  services: ServiceItem[];
  galleryTitle: string;
  gallerySubtitle: string;
  gallery: GalleryItem[];
  blogTitle: string;
  blogSubtitle: string;
  posts: BlogPost[];
  contact: ContactInfo;
  theme: ThemeConfig;
  seo: SeoConfig;
}
