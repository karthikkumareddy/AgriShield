import React, { useState } from 'react';
import { Eye, Layers, Flame, Leaf, ZoomIn } from 'lucide-react';
import { InfectionStage, SupportedLanguage } from '../types/agrishield';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';

interface InfectionHeatmapVisualizerProps {
  imageSrc?: string | null;
  severityPercentage: number;
  infectionStage: InfectionStage;
  cropName: string;
  currentLanguage?: SupportedLanguage;
}

export const InfectionHeatmapVisualizer: React.FC<InfectionHeatmapVisualizerProps> = ({
  imageSrc,
  severityPercentage,
  infectionStage,
  cropName,
  currentLanguage = 'en',
}) => {
  const [filterMode, setFilterMode] = useState<'standard' | 'heatmap' | 'isolated'>('standard');
  const lang: LanguageCode = normalizeLanguageCode(currentLanguage);

  const localizedText = {
    en: {
      title: 'Foliage Lesion Segmentation Visualizer',
      subtitle: `Multi-spectral simulation of calculated ${severityPercentage.toFixed(1)}% surface area infection`,
      normal: 'Natural View',
      heatmap: 'Heatmap',
      isolated: 'Lesion Focus',
      activeLabel: 'Active Specimen Analysis',
    },
    te: {
      title: 'ఆకు మచ్చల విశ్లేషణ మరియు హీట్‌మ్యాప్',
      subtitle: `గణించిన ${severityPercentage.toFixed(1)}% తెగులు వ్యాపించిన విస్తీర్ణ నమూనా`,
      normal: 'సాధారణ ఆకు',
      heatmap: 'హీట్‌మ్యాప్',
      isolated: 'మచ్చల గుర్తింపు',
      activeLabel: 'విశ్లేషిస్తున్న ఆకు నమూనా',
    },
    hi: {
      title: 'पत्ती धब्बा विश्लेषण एवं हीटमैप',
      subtitle: `आकलित ${severityPercentage.toFixed(1)}% पत्ती संक्रमण क्षेत्रफल का विश्लेषण`,
      normal: 'सामान्य दृश्य',
      heatmap: 'हीटमैप',
      isolated: 'धब्बा पहचान',
      activeLabel: 'परीक्षण हेतु पत्ती नमूना',
    },
    ta: {
      title: 'இலைப்புள்ளி ஆய்வு மற்றும் வெப்ப வரைபடம்',
      subtitle: `கணக்கிடப்பட்ட ${severityPercentage.toFixed(1)}% இலைப்பரப்பு நோய் பாதிப்பு விவரம்`,
      normal: 'இயற்கை தோற்றம்',
      heatmap: 'வெப்ப வரைபடம்',
      isolated: 'புள்ளி பகுப்பாய்வு',
      activeLabel: 'ஆய்வு செய்யப்படும் இலை மாதிரி',
    },
  }[lang];

  const getOverlayStyle = () => {
    switch (filterMode) {
      case 'heatmap':
        return 'contrast-150 saturate-200 hue-rotate-90';
      case 'isolated':
        return 'brightness-125 contrast-200 grayscale';
      default:
        return '';
    }
  };

  return (
    <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>{localizedText.title}</span>
          </span>
          <p className="text-xs text-stone-400 mt-0.5">
            {localizedText.subtitle}
          </p>
        </div>

        {/* View Mode Filters */}
        <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 gap-1 text-xs">
          <button
            onClick={() => setFilterMode('standard')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              filterMode === 'standard'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            {localizedText.normal}
          </button>
          <button
            onClick={() => setFilterMode('heatmap')}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition ${
              filterMode === 'heatmap'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-300" />
            <span>{localizedText.heatmap}</span>
          </button>
          <button
            onClick={() => setFilterMode('isolated')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              filterMode === 'isolated'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            {localizedText.isolated}
          </button>
        </div>
      </div>

      {/* Canvas / Image Display Frame */}
      <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={cropName}
            className={`w-full h-full object-contain transition-all duration-300 ${getOverlayStyle()}`}
          />
        ) : (
          <div className="text-center text-stone-500 text-xs p-4">
            <Leaf className="w-10 h-10 mx-auto mb-2 opacity-30 text-emerald-400" />
            <span>No leaf image loaded for lesion segmentation</span>
          </div>
        )}

        {/* Diagnostic Overlay Badge */}
        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-stone-800 text-[11px] font-semibold text-stone-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{cropName}</span>
          <span className="text-stone-500">•</span>
          <span className="text-amber-400 font-mono font-bold">
            {severityPercentage.toFixed(1)}% Area
          </span>
        </div>
      </div>
    </div>
  );
};
