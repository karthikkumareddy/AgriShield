import React, { useState } from 'react';
import { X, Calculator, Droplets, CheckCircle, HelpCircle } from 'lucide-react';
import { SupportedLanguage } from '../types/agrishield';

interface SprayDosageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendedDosageText: string;
  currentLanguage: SupportedLanguage;
}

export const SprayDosageCalculatorModal: React.FC<SprayDosageCalculatorModalProps> = ({
  isOpen,
  onClose,
  recommendedDosageText,
  currentLanguage,
}) => {
  const [plotSizeAcre, setPlotSizeAcre] = useState<number>(1);
  const [tankCapacityLitre, setTankCapacityLitre] = useState<number>(16);
  const [waterPerAcreLitre, setWaterPerAcreLitre] = useState<number>(200);
  const [dosePerLitreGram, setDosePerLitreGram] = useState<number>(2.5);

  if (!isOpen) return null;

  // Total water needed for plot
  const totalWaterLitres = plotSizeAcre * waterPerAcreLitre;
  // Number of knapsack tanks
  const totalTanks = Math.ceil(totalWaterLitres / tankCapacityLitre);
  // Total chemical needed
  const totalChemicalGram = totalWaterLitres * dosePerLitreGram;
  // Chemical per tank
  const chemicalPerTankGram = tankCapacityLitre * dosePerLitreGram;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Spray Tank & Acre Dosage Mixer
              </h3>
              <p className="text-xs text-stone-400">
                Calibrate exact tank refills & pesticide volume for your plot
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Advisory Reference Snippet */}
        <div className="p-4 bg-emerald-950/20 border-b border-stone-800/80">
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
            Target Prescribed Dosage Metric:
          </span>
          <p className="text-xs text-stone-200 mt-0.5 font-medium">
            {recommendedDosageText}
          </p>
        </div>

        {/* Inputs */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Farm Acreage (Acres)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.25"
                value={plotSizeAcre}
                onChange={(e) => setPlotSizeAcre(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                className="w-full px-3 py-2 text-sm bg-stone-950 border border-stone-800 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Knapsack Tank Size (Litres)
              </label>
              <select
                value={tankCapacityLitre}
                onChange={(e) => setTankCapacityLitre(parseInt(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-stone-950 border border-stone-800 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
              >
                <option value={12}>12 Litres (Manual Pump)</option>
                <option value={15}>15 Litres (Compact Battery)</option>
                <option value={16}>16 Litres (Standard Knapsack)</option>
                <option value={20}>20 Litres (Power Sprayer)</option>
                <option value={25}>25 Litres (High Capacity)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Pesticide / Litre (g or ml)
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={dosePerLitreGram}
                onChange={(e) => setDosePerLitreGram(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                className="w-full px-3 py-2 text-sm bg-stone-950 border border-stone-800 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Water Volume / Acre
              </label>
              <select
                value={waterPerAcreLitre}
                onChange={(e) => setWaterPerAcreLitre(parseInt(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-stone-950 border border-stone-800 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
              >
                <option value={150}>150 Litres (Low Canopy)</option>
                <option value={200}>200 Litres (Standard Foliage)</option>
                <option value={250}>250 Litres (Dense Crop / Heavy Blight)</option>
              </select>
            </div>
          </div>

          {/* Computed Results */}
          <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-emerald-500/30 space-y-3">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Mixing Guidance for {plotSizeAcre} Acre(s)</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                  Total Water Needed
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {totalWaterLitres} Litres
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                  Tanks to Prepare
                </span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {totalTanks} Tanks ({tankCapacityLitre}L each)
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                  Per Single Tank Dose
                </span>
                <span className="text-sm font-bold text-amber-400 font-mono">
                  {chemicalPerTankGram} g / ml
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                  Total Chemical Quantity
                </span>
                <span className="text-sm font-bold text-emerald-300 font-mono">
                  {totalChemicalGram >= 1000
                    ? `${(totalChemicalGram / 1000).toFixed(2)} kg / L`
                    : `${totalChemicalGram} g / ml`}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 pt-1">
              💡 Always make a slurry of chemical in a small bucket of water first before adding to the full tank. Spray during calm morning or evening hours.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
