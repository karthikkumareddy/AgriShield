import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles, RefreshCw, X, AlertCircle } from 'lucide-react';
import { SAMPLE_CROPS, SampleCropItem } from '../data/sampleCrops';

interface LeafUploaderProps {
  onAnalyze: (imageData: { base64: string; mimeType: string; cropHint?: string }) => void;
  onSelectSample: (sample: SampleCropItem) => void;
  isLoading: boolean;
  selectedSampleId?: string | null;
}

export const LeafUploader: React.FC<LeafUploaderProps> = ({
  onAnalyze,
  onSelectSample,
  isLoading,
  selectedSampleId,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [cropHint, setCropHint] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WEBP).');
      return;
    }
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access camera. Please allow camera permissions or upload an image file.');
      setIsCameraActive(false);
    }
  };

  const captureCameraSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      setMimeType('image/jpeg');
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRunAnalysis = () => {
    if (!selectedImage) return;
    onAnalyze({
      base64: selectedImage,
      mimeType,
      cropHint: cropHint.trim() || undefined,
    });
  };

  return (
    <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Crop Leaf Specimen Ingestion
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Upload infected crop foliage for automated surface infection % and quad-lingual advisory
          </p>
        </div>

        {/* Action toggles */}
        <div className="flex items-center gap-2">
          {!isCameraActive ? (
            <button
              onClick={startCamera}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 rounded-xl hover:bg-emerald-900 transition shadow-sm"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Camera Scan</span>
            </button>
          ) : (
            <button
              onClick={stopCamera}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700 rounded-xl hover:bg-stone-700 transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close Camera</span>
            </button>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-800 text-stone-200 border border-stone-700 rounded-xl hover:bg-stone-700 transition"
          >
            <UploadCloud className="w-3.5 h-3.5 text-stone-400" />
            <span>Upload File</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {cameraError && (
        <div className="mb-4 p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Camera Live Stream View */}
      {isCameraActive && (
        <div className="mb-5 relative rounded-xl overflow-hidden bg-black border border-emerald-500/40 aspect-video max-h-80 mx-auto flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {/* Target Reticle */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center">
              <span className="text-[11px] text-emerald-300 bg-stone-950/80 px-2 py-0.5 rounded font-mono">
                Align Leaf Center
              </span>
            </div>
          </div>
          <div className="absolute bottom-3 inset-x-0 flex justify-center">
            <button
              onClick={captureCameraSnapshot}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs shadow-lg flex items-center gap-2 transition"
            >
              <Camera className="w-4 h-4" />
              Capture Specimen Snapshot
            </button>
          </div>
        </div>
      )}

      {/* Main Upload / Drag Drop Box */}
      {!isCameraActive && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl transition-all ${
            isDragging
              ? 'border-emerald-500 bg-emerald-950/20'
              : 'border-stone-800 hover:border-stone-700 bg-stone-950/50'
          } p-4 sm:p-6 text-center`}
        >
          {selectedImage ? (
            <div className="relative group max-w-md mx-auto">
              <div className="relative rounded-xl overflow-hidden border border-stone-700 shadow-xl bg-black">
                <img
                  src={selectedImage}
                  alt="Selected Crop Leaf"
                  className="w-full max-h-72 object-contain mx-auto"
                />
                {isLoading && (
                  <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4">
                    <div className="w-12 h-12 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin mb-3"></div>
                    <span className="text-sm font-bold text-emerald-400">
                      Isolating Anomaly & Calculating %...
                    </span>
                    <span className="text-[11px] text-stone-400 mt-1 font-mono">
                      Running multi-spectral lesion segmentation
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={handleClearImage}
                type="button"
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-stone-900/90 text-stone-300 hover:text-white border border-stone-700 shadow"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer py-6 flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-stone-800/80 border border-stone-700/80 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition">
                <ImageIcon className="w-7 h-7" />
              </div>
              <p className="text-sm font-semibold text-stone-200">
                Drag and drop crop leaf image, or <span className="text-emerald-400 underline underline-offset-2">browse</span>
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Supports High-Res JPG, PNG, WEBP from field cameras or smartphones
              </p>
            </div>
          )}
        </div>
      )}

      {/* Field Context Note (Optional) */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={cropHint}
            onChange={(e) => setCropHint(e.target.value)}
            placeholder="Field context (e.g. Tomato, 40 days, irrigated, spotted lesions after rains)..."
            className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-emerald-500/80"
          />
        </div>
        <button
          onClick={handleRunAnalysis}
          disabled={!selectedImage || isLoading}
          type="button"
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-lg ${
            !selectedImage || isLoading
              ? 'opacity-40 cursor-not-allowed bg-stone-800 text-stone-400'
              : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 shadow-emerald-900/30'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
              <span>Analyzing Foliage...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Run AgriShield Diagnostic</span>
            </>
          )}
        </button>
      </div>

      {/* Instant Test Sample Specimens */}
      <div className="mt-5 pt-4 border-t border-stone-800/80">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <span>⚡ Instant Diagnostic Specimens</span>
            <span className="text-[10px] lowercase text-stone-500 font-normal">
              (click to test real field data in 1 click)
            </span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SAMPLE_CROPS.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            const stageColor =
              sample.stage === 'Severe'
                ? 'text-rose-400 border-rose-500/30 bg-rose-950/20'
                : sample.stage === 'Moderate'
                ? 'text-amber-400 border-amber-500/30 bg-amber-950/20'
                : 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';

            return (
              <button
                key={sample.id}
                onClick={() => {
                  setSelectedImage(sample.thumbnailSvg);
                  onSelectSample(sample);
                }}
                type="button"
                className={`text-left p-2.5 rounded-xl border transition group relative overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500/50'
                    : 'border-stone-800 bg-stone-950/60 hover:border-stone-700 hover:bg-stone-900/60'
                }`}
              >
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-stone-900 border border-stone-800/60 mb-2 relative">
                  <img
                    src={sample.thumbnailSvg}
                    alt={sample.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <span
                    className={`absolute bottom-1 right-1 px-1.5 py-0.5 text-[9px] font-bold rounded border ${stageColor}`}
                  >
                    {sample.severityPercentage}%
                  </span>
                </div>
                <div className="font-semibold text-xs text-stone-200 truncate group-hover:text-emerald-400">
                  {sample.name.split(' - ')[0]}
                </div>
                <div className="text-[10px] text-stone-400 truncate">
                  {sample.diseaseEnglish.split(' (')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
