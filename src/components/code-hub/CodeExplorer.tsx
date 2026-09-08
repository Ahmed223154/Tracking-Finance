import React, { useState } from 'react';
import { SWIFT_FILES, SwiftFile, downloadSwiftpmPackageZip, downloadSingleFileBundle } from '../../services/swiftCodeRepository';
import { Copy, Check, Download, FileCode, FolderArchive, Sparkles, Terminal, FileCheck } from 'lucide-react';

export const CodeExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<SwiftFile>(SWIFT_FILES[1]); // SingleFileBundle by default
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      await downloadSwiftpmPackageZip();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 text-[#1C1C1E] dark:text-[#F2F2F7]">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[28px] bg-[#1C1C1E] border border-[#3A3A3C] p-6 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#2C2C2E] border border-[#3A3A3C] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#007AFF]">
              Swift Playgrounds 4+
            </span>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-[#34C759]">
              100% Pure Swift
            </span>
            <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-semibold text-blue-300">
              Clean Package Zip
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">FinanceApp.swiftpm Package</h2>
          <p className="text-sm text-[#8E8E93] max-w-2xl">
            Offline-first native iOS application built with SwiftData, Swift Charts, Face ID, and dynamic financial calculation engine.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => downloadSingleFileBundle()}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/20 active:scale-95"
            title="Download single self-contained Swift file to copy/paste into any project"
          >
            <FileCheck className="h-4 w-4 text-emerald-400" />
            <span>SingleFile.swift</span>
          </button>
          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="flex items-center gap-2 rounded-xl bg-[#007AFF] px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0062CC] active:scale-95"
          >
            <Download className="h-4 w-4 text-white" />
            <span>{downloading ? 'Preparing ZIP...' : 'Download Clean .swiftpm (ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Code Hub */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: File Explorer */}
        <div className="md:col-span-4 space-y-3">
          <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F2F7] dark:border-[#38383A]">
              <span className="font-bold text-xs uppercase tracking-wider text-[#8E8E93]">Package Tree</span>
              <span className="rounded-md bg-[#F2F2F7] px-2 py-0.5 text-[10px] font-bold text-[#1C1C1E] dark:bg-[#1C1C1E] dark:text-[#F2F2F7]">
                {SWIFT_FILES.length} Files
              </span>
            </div>

            <div className="mt-3 space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
              {SWIFT_FILES.map(file => {
                const isSelected = selectedFile.path === file.path;
                const isBundle = file.category === 'bundle';
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left rounded-xl p-2.5 transition-all flex items-start gap-2.5 ${isSelected ? 'bg-[#007AFF] text-white shadow-sm' : 'hover:bg-[#F2F2F7] text-[#1C1C1E] dark:text-[#F2F2F7] dark:hover:bg-[#38383A]'}`}
                  >
                    <FileCode className={`h-4 w-4 mt-0.5 shrink-0 ${isSelected ? 'text-white' : isBundle ? 'text-[#FF9500]' : 'text-[#007AFF]'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate flex items-center gap-1.5">
                        <span>{file.name}</span>
                        {isBundle && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}`}>
                            All-in-1
                          </span>
                        )}
                      </div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-[#8E8E93]'}`}>
                        {file.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Code Viewer */}
        <div className="md:col-span-8 space-y-3">
          <div className="overflow-hidden rounded-[24px] border border-[#E5E5EA] bg-[#1C1C1E] text-slate-100 shadow-xl dark:border-[#3A3A3C]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2C2C2E] bg-[#2C2C2E] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#007AFF]">
                  {selectedFile.path}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl bg-[#3A3A3C] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#48484A]"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#34C759]" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Pre container */}
            <div className="max-h-[580px] overflow-auto p-4 font-mono text-xs leading-relaxed selection:bg-[#007AFF] selection:text-white">
              <pre className="text-[#F2F2F7] whitespace-pre">
                <code>{selectedFile.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
