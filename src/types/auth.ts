import { SupportedLanguage } from './agrishield';

export interface FarmerUser {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  state: string;
  district: string;
  village: string;
  preferredLanguage: SupportedLanguage;
  mainCrop: string;
  farmSize: number; // in Acres
  primaryCrops?: string[];
  avatarUrl?: string;
  joinedAt: number;
}

export interface AuthState {
  user: FarmerUser | null;
  isAuthenticated: boolean;
  token?: string;
}

export const INDIAN_AGRI_STATES = [
  'Andhra Pradesh',
  'Telangana',
  'Tamil Nadu',
  'Karnataka',
  'Maharashtra',
  'Gujarat',
  'Madhya Pradesh',
  'Uttar Pradesh',
  'Punjab',
  'Haryana',
  'Rajasthan',
  'West Bengal',
  'Odisha',
  'Bihar',
  'Kerala',
];

export const POPULAR_CROPS = [
  'Tomato (టమోటా / தக்காளி / टमाटर)',
  'Cotton (పత్తి / பருத்தி / कपास)',
  'Paddy / Rice (వరి / நெல் / धान)',
  'Chilli (మిరప / மிளகாய் / मिर्च)',
  'Maize / Corn (మొక్కజొన్న / மக்காச்சோளம் / मक्का)',
  'Potato (బంగాళాదుంప / உருளைக்கிழங்கு / आलू)',
  'Soybean (సోయాబీన్ / சோயாபீன் / सोयाबीन)',
  'Sugarcane (చెరకు / கரும்பு / गन्ना)',
  'Groundnut (వేరుశనగ / நிலக்கடலை / मूंगफली)',
  'Wheat (గోధుమ / கோதுமை / गेहूं)',
];
