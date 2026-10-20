import { SupportedLanguage, AgriShieldReport } from './agrishield';

export interface ChatMessage {
  id: string;
  sender: 'farmer' | 'assistant';
  text: string;
  timestamp: number;
  language: SupportedLanguage;
  attachedScan?: {
    crop: string;
    disease: string;
    severityPercentage: number;
    stage: string;
  };
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  cropTag?: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}
