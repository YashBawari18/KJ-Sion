'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileImage, AlertCircle, Loader2, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
  error: string | null;
  onClearError: () => void;
}

export function UploadDropzone({
  onFileSelect,
  isAnalyzing,
  error,
  onClearError,
}: UploadDropzoneProps) {
  const { t } = useLanguage();
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  const maxBytes = 10 * 1024 * 1024; // 10MB

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const validateAndProceed = (file: File) => {
    onClearError();
    if (!allowedTypes.includes(file.type)) {
      alert('Unsupported file format. Please upload a PNG, JPG, JPEG, or WebP thumbnail.');
      return;
    }
    if (file.size > maxBytes) {
      alert('File size exceeds 10MB limit. Please upload an image under 10MB.');
      return;
    }
    setSelectedFileName(file.name);
    onFileSelect(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProceed(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProceed(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isAnalyzing && fileInputRef.current?.click()}
        id="thumbnail-dropzone"
        className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 backdrop-blur-md ${
          isDragOver
            ? 'border-purple-500 bg-purple-50/80 dark:bg-purple-950/50 scale-[1.01] shadow-lg shadow-purple-500/20'
            : isAnalyzing
            ? 'border-purple-300 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/20 cursor-wait'
            : 'border-slate-300/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 hover:bg-slate-50/90 dark:hover:bg-slate-900/90 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-md'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={handleFileInput}
          disabled={isAnalyzing}
        />

        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-4 animate-fade-in">
            {/* Glowing animated loader icon */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-pulse">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 opacity-30 blur-lg animate-pulse" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center space-x-2">
                <span>Analyzing visual attention…</span>
                <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                Computing visual saliency, face fixations, text contrast, and scanpath sequence.
              </p>
            </div>

            {/* Pipeline progress simulation */}
            <div className="w-full max-w-sm bg-slate-200/80 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mt-3 p-0.5">
              <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 h-full w-4/5 animate-pulse rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-500 dark:text-slate-400 w-full max-w-sm pt-2">
              <span className="flex items-center justify-center space-x-1 text-purple-700 dark:text-purple-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Validating</span>
              </span>
              <span className="flex items-center justify-center space-x-1 text-indigo-700 dark:text-indigo-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>CV Saliency</span>
              </span>
              <span className="flex items-center justify-center space-x-1 text-pink-600 dark:text-pink-400 font-semibold animate-pulse">
                <span>Generating Heatmap</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-100 dark:border-purple-800/60 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/60 transition-all shadow-xs">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                <span className="text-purple-600 dark:text-purple-400 underline underline-offset-4 decoration-purple-300 dark:decoration-purple-600">
                  {t('uploadClickText')}
                </span>{' '}
                {t('uploadDragText')}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                PNG, JPG, JPEG, or WebP · High quality (1280×720 recommended) · Max 10MB
              </p>
            </div>

            {selectedFileName && (
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700">
                <FileImage className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Selected: {selectedFileName}</span>
              </div>
            )}

            <div className="pt-2">
              <span className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-purple-500/20 transition-all">
                <span>Browse File</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Error State Banner */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/70 text-rose-800 dark:text-rose-200 flex items-start space-x-3 text-sm animate-fade-in shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-rose-900 dark:text-rose-100">Upload or Analysis Error</p>
            <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 mt-0.5">{error}</p>
          </div>
          <button
            onClick={onClearError}
            className="text-xs font-semibold text-rose-600 dark:text-rose-300 hover:text-rose-900 dark:hover:text-white px-2 py-1 rounded hover:bg-rose-100 dark:hover:bg-rose-900/60 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
