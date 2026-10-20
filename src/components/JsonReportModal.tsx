import React, { useState } from 'react';
import { X, Copy, Check, Download, Printer, Code, FileJson } from 'lucide-react';
import { AgriShieldReport } from '../types/agrishield';

interface JsonReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: AgriShieldReport | null;
}

export const JsonReportModal: React.FC<JsonReportModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !report) return null;

  // Strict output conforming strictly to prompt schema
  const cleanJsonString = JSON.stringify(report, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([cleanJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agrishield-${report.analysis_metadata.crop_detected.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                AgriShield Structured JSON Output
                <span className="text-[10px] font-mono font-normal uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                  Strict Schema
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Conforming strictly to schema with analysis metadata and quad-language regional payload
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

        {/* Toolbar */}
        <div className="px-5 py-2.5 bg-stone-950/70 border-b border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-400 font-mono">
            {report.analysis_metadata.crop_detected} • Stage: {report.analysis_metadata.infection_stage} ({report.analysis_metadata.severity_percentage}%)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 transition shadow-sm"
              title="Copy clean JSON to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-stone-950" />
                  <span>Copied Valid JSON</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Clean JSON</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition"
              title="Download as .json file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition"
              title="Print Crop Health Card"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Card</span>
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="flex-1 overflow-auto p-5 bg-stone-950 text-stone-200 font-mono text-xs leading-relaxed">
          <pre className="select-all whitespace-pre-wrap">{cleanJsonString}</pre>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs text-stone-500">
          <span>Schema: analysis_metadata + languages (english, telugu, tamil, hindi)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
