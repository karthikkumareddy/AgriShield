import React from 'react';
import { X, Trash2, Clock, Leaf, ChevronRight, FileText } from 'lucide-react';
import { ScanHistoryItem } from '../types/agrishield';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: ScanHistoryItem[];
  onSelectScan: (item: ScanHistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectScan,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-md bg-stone-900 border-l border-stone-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base text-white">
                Field Scan History ({history.length})
              </h3>
              <p className="text-xs text-stone-400">
                Recent crop disease diagnoses & severity logs
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

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="py-16 text-center text-stone-500">
              <Leaf className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No scans recorded yet</p>
              <p className="text-xs mt-1">Upload or test a sample leaf to log a diagnosis</p>
            </div>
          ) : (
            history.map((item) => {
              const stage = item.report.analysis_metadata.infection_stage;
              const stageBadge =
                stage === 'Severe'
                  ? 'bg-rose-950/80 text-rose-400 border-rose-800/50'
                  : stage === 'Moderate'
                  ? 'bg-amber-950/80 text-amber-400 border-amber-800/50'
                  : 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectScan(item);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-stone-800 bg-stone-950/80 hover:bg-stone-850 hover:border-emerald-500/50 transition cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-stone-200 group-hover:text-emerald-400 transition">
                        {item.report.analysis_metadata.crop_detected}
                      </h4>
                      <p className="text-xs text-stone-400 mt-0.5 font-medium">
                        {item.report.languages.english.disease_name.split(' (')[0]}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${stageBadge}`}>
                      {item.report.analysis_metadata.severity_percentage}%
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(item.timestamp).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold group-hover:translate-x-1 transition">
                      View Report <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
