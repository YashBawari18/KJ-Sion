'use client';

import React, { useState } from 'react';
import { PipelineStepStatus } from '@/types/analysis';
import { Cpu, CheckCircle2, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface PipelineStatusCardProps {
  steps: PipelineStepStatus[];
  metadata?: Record<string, any>;
}

export function PipelineStatusCard({ steps, metadata }: PipelineStatusCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs transition-colors">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Pipeline Transparency & Diagnostics
          </h4>
          <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-medium">
            {steps.filter((s) => s.status === 'completed').length}/{steps.length} Steps
          </span>
        </div>

        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
          {metadata && (
            <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800/60 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <strong>Source:</strong> {metadata.filename} ({metadata.width}×{metadata.height}px, {metadata.format})
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700"
              >
                <div className="flex items-center space-x-2 truncate">
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                  )}
                  <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate">
                    {step.step_name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[120px]">
                  {step.details || step.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
