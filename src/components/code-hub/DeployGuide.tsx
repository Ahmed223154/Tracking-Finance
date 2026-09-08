import React from 'react';
import { Smartphone, Laptop, CheckCircle2, ShieldAlert, Play, Download, Terminal, Zap, FileCode } from 'lucide-react';
import { downloadSwiftpmPackageZip, downloadSingleFileBundle } from '../../services/swiftCodeRepository';

export const DeployGuide: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 text-[#1C1C1E] dark:text-[#F2F2F7]">
      {/* Hero Header */}
      <div className="rounded-[28px] bg-[#1C1C1E] border border-[#3A3A3C] p-6 text-white shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#007AFF] uppercase tracking-wider">
          <Zap className="h-4 w-4" /> Zero-Fee Physical Deployment
        </div>
        <h2 className="mt-1 text-2xl font-black tracking-tight">
          How to Run on iPhone 13 Pro Max via Swift Playgrounds
        </h2>
        <p className="mt-1 text-sm text-[#8E8E93]">
          No paid Apple Developer account required ($99/yr saved). Follow these straightforward steps to install the app directly on your physical iPhone.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => downloadSwiftpmPackageZip()}
            className="flex items-center gap-1.5 rounded-xl bg-[#007AFF] px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0062CC] active:scale-95"
          >
            <Download className="h-4 w-4 text-white" /> Download Clean .swiftpm (ZIP)
          </button>
          <button
            onClick={() => downloadSingleFileBundle()}
            className="flex items-center gap-1.5 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] px-4 py-2.5 text-xs font-extrabold text-white transition-all hover:bg-[#38383A] active:scale-95"
          >
            <FileCode className="h-4 w-4 text-emerald-400" /> Download SingleFile.swift
          </button>
        </div>
      </div>

      {/* Step by step cards */}
      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex gap-4 rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#007AFF] dark:bg-blue-950/40">
            1
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">
              Get the Package & Open in Swift Playgrounds 4+
            </h3>
            <p className="text-xs text-[#8E8E93] leading-relaxed">
              Download the ZIP archive above and unzip it to reveal the <code className="rounded bg-[#F2F2F7] px-1.5 py-0.5 font-mono text-[11px] dark:bg-[#1C1C1E] text-[#007AFF]">FinanceApp.swiftpm</code> bundle.
              Double-click it to open directly in <strong>Swift Playgrounds 4+ on macOS</strong>.
            </p>
            <div className="rounded-xl bg-[#F2F2F7] p-3 text-xs text-[#1C1C1E] dark:bg-[#1C1C1E] dark:text-[#F2F2F7]">
              💡 <em>Alternative 1-Click Method:</em> Create a new "App" project in Swift Playgrounds, delete the default file, and paste the code from <strong className="text-[#007AFF]">SingleFileBundle.swift</strong>. It contains everything in one clean file!
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4 rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#007AFF] dark:bg-blue-950/40">
            2
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">
              Connect Your iPhone 13 Pro Max to Mac
            </h3>
            <p className="text-xs text-[#8E8E93] leading-relaxed">
              Plug your iPhone 13 Pro Max into your Mac using a Lightning-to-USB cable. When prompted on your iPhone, tap <strong>"Trust This Computer"</strong> and enter your device passcode.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4 rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#007AFF] dark:bg-blue-950/40">
            3
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">
              Enable Developer Mode on iOS 17 (Required once)
            </h3>
            <p className="text-xs text-[#8E8E93] leading-relaxed">
              On your iPhone:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-xs text-[#8E8E93]">
              <li>Open <strong>Settings</strong> &gt; <strong>Privacy &amp; Security</strong>.</li>
              <li>Scroll to the bottom and tap <strong>Developer Mode</strong>.</li>
              <li>Toggle Developer Mode <strong>ON</strong> and reboot your iPhone when prompted.</li>
              <li>After reboot, unlock your phone and tap <strong>"Turn On"</strong>.</li>
            </ol>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex gap-4 rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#007AFF] dark:bg-blue-950/40">
            4
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">
              Select Your iPhone & Tap "Run App"
            </h3>
            <p className="text-xs text-[#8E8E93] leading-relaxed">
              In Swift Playgrounds on macOS, click the device selector at the top toolbar and choose your <strong>iPhone 13 Pro Max</strong>.
              Then tap the <strong>Run (▶)</strong> button. Swift Playgrounds will sign the app with your free personal Apple ID and install it straight to your iPhone's home screen!
            </p>
          </div>
        </div>

        {/* Troubleshooting Cards */}
        <div className="space-y-4">
          <div className="rounded-[24px] border border-red-200 bg-red-50/70 p-5 dark:border-red-900/40 dark:bg-red-950/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-800 dark:text-red-400">
              <ShieldAlert className="h-4 w-4" /> Fixed: "Package.swift cannot be accessed / doesn't exist"
            </div>
            <h4 className="mt-1 text-sm font-bold text-[#1C1C1E] dark:text-white">
              PackageLoading.ToolsVersionParser.Error: Package.swift doesn't exist in file system
            </h4>
            <div className="mt-2 text-xs text-[#3A3A3C] dark:text-[#E5E5EA] space-y-2 leading-relaxed">
              <p>
                <strong>Cause:</strong> When macOS Archive Utility unzips a zip containing multiple items, it creates an outer folder named <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[11px] dark:bg-[#1C1C1E]">FinanceApp.swiftpm</code> containing an inner package. macOS thinks the <em>outer</em> folder is the app, but <code className="font-mono text-[11px]">Package.swift</code> is inside the inner folder!
              </p>
              <p className="font-semibold text-[#1C1C1E] dark:text-white">Three ways to resolve instantly:</p>
              <ol className="list-decimal list-inside space-y-1 pl-1">
                <li>
                  <strong>Direct Clean ZIP (Recommended):</strong> Click <strong>Download Clean .swiftpm (ZIP)</strong> above. The new package is named <code className="font-mono text-[11px]">FinanceApp-iOS.zip</code> and unzips with zero nesting.
                </li>
                <li>
                  <strong>Fix Existing Folder in Finder:</strong> In macOS Finder, right-click your existing <code className="font-mono text-[11px]">FinanceApp.swiftpm</code> &rarr; select <strong>Show Package Contents</strong>. You will see the actual <code className="font-mono text-[11px]">FinanceApp.swiftpm</code> inside it. Drag that inner package out onto your Desktop and double-click it.
                </li>
                <li>
                  <strong>Single-File Paste (100% Guaranteed):</strong> In Swift Playgrounds, click <strong>+ App</strong> (empty project), open the <strong>Code Hub &rarr; SingleFileBundle.swift</strong>, click <strong>Copy Swift Code</strong>, and replace the contents of <code className="font-mono text-[11px]">ContentView.swift</code>.
                </li>
              </ol>
            </div>
          </div>

          <div className="rounded-[24px] border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <ShieldAlert className="h-4 w-4" /> Manifest Evaluation: deviceFamilies
            </div>
            <h4 className="mt-1 text-sm font-bold text-[#1C1C1E] dark:text-white">
              Seeing "FailedToEvaluateManifest" or "Cannot convert value of type '[Any]'"?
            </h4>
            <p className="mt-1 text-xs text-[#8E8E93] leading-relaxed">
              This occurs if <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[11px] dark:bg-[#1C1C1E] text-amber-700 dark:text-amber-300">Package.swift</code> has an invalid orientation argument like <code className="line-through text-red-500">.when(deviceBasedOn: .pad)</code>. In the updated package, this is fixed to <code className="rounded bg-emerald-100 px-1 py-0.5 font-mono text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">.when(deviceFamilies: [.pad])</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
