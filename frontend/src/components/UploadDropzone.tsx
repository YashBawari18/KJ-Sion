'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileImage, AlertCircle, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

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
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-indigo-500 bg-indigo-50/70 scale-[1.01] shadow-md shadow-indigo-500/10'
            : isAnalyzing
            ? 'border-purple-300 bg-purple-50/40 cursor-wait'
            : 'border-slate-300/80 bg-white/70 hover:bg-slate-50/90 hover:border-indigo-400 shadow-xs'
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
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Running Attention Fusion Pipeline...
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
                Computing visual saliency, face fixations, text contrast, and scanpath sequence.
              </p>
            </div>

            {/* Pipeline progress simulation */}
            <div className="w-full max-w-sm bg-slate-200/80 h-2 rounded-full overflow-hidden mt-3">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full w-3/4 animate-pulse rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-500 w-full max-w-sm pt-2">
              <span className="flex items-center justify-center space-x-1 text-indigo-700 font-medium">
                <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                <span>Validating</span>
              </span>
              <span className="flex items-center justify-center space-x-1 text-purple-700 font-medium">
                <CheckCircle2 className="w-3 h-3 text-purple-600" />
                <span>CV Saliency</span>
              </span>
              <span className="flex items-center justify-center space-x-1 text-slate-400">
                <span>Heatmap</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-100 transition-all">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <p className="text-base sm:text-lg font-semibold text-slate-800">
                <span className="text-indigo-600 underline underline-offset-4 decoration-indigo-300">
                  Click to upload
                </span>{' '}
                or drag and drop your thumbnail
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                PNG, JPG, JPEG, or WebP · High quality (1280×720 recommended) · Max 10MB
              </p>
            </div>

            {selectedFileName && (
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                <FileImage className="w-3.5 h-3.5 text-indigo-600" />
                <span>Selected: {selectedFileName}</span>
              </div>
            )}

            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs sm:text-sm font-medium shadow-xs group-hover:bg-indigo-700 transition-colors">
                <span>Browse File</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3 text-sm animate-fade-in shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-rose-900">Upload or Analysis Failed</p>
            <p className="text-xs sm:text-sm text-rose-700 mt-0.5">{error}</p>
          </div>
          <button
            onClick={onClearError}
            className="text-xs font-medium text-rose-600 hover:text-rose-900 px-2 py-1 rounded hover:bg-rose-100"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
