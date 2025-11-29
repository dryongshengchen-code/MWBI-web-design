
export enum Section {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  ACADEMY = 'ACADEMY',
  EVENTS = 'EVENTS',
  SHARING = 'SHARING',
  DONATE = 'DONATE',
  CONTACT = 'CONTACT',
  USER_DASHBOARD = 'USER_DASHBOARD'
}

export type DonationCategoryType = 'construction' | 'dharma' | 'charity' | 'academy';

export interface DonationItem {
  id: string;
  title: string;
  description: string;
  minAmount: number;
  image: string;
  category: DonationCategoryType;
  allowInstallment?: boolean;
}

export interface CartItem extends DonationItem {
  uniqueId: string; // To allow multiple entries of same item if needed (though usually we aggregate)
  selectedAmount: number;
  quantity: number;
  isInstallment?: boolean;
}

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  description: string;
  category: 'ceremony' | 'meditation' | 'class' | 'festival';
}

export interface SharingItem {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string; // Supports paragraphs
  tag: string;
  image?: string;
  reactions?: {
    sadhu: number;   // 🙏
    rejoice: number; // ❤️
    zen: number;     // 🌸
  };
}
