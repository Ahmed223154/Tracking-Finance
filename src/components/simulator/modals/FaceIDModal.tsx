import React, { useState, useEffect } from 'react';
import { Shield, ScanFace, Check, KeyRound } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';

interface FaceIDModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel?: () => void;
}

export const FaceIDModal: React.FC<FaceIDModalProps> = ({ isOpen, onSuccess, onCancel }) => {
  const { t, language } = useI18n();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcode, setPasscode] = useState('');

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setScanned(false);
      setShowPasscode(false);
      setPasscode('');

      const timer1 = setTimeout(() => {
        setScanning(false);
        setScanned(true);
      }, 1400);

      const timer2 = setTimeout(() => {
        onSuccess();
      }, 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xs rounded-[32px] bg-[#1C1C1E] border border-[#3A3A3C] p-6 text-center text-white shadow-2xl">
        {!showPasscode ? (
          <div className="space-y-4">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#2C2C2E] border border-[#3A3A3C] shadow-inner">
              {scanned ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#34C759] text-white animate-in zoom-in-75 duration-300">
                  <Check className="h-7 w-7 stroke-[3]" />
                </div>
              ) : (
                <ScanFace className={`h-10 w-10 text-[#007AFF] ${scanning ? 'animate-pulse' : ''}`} />
              )}
            </div>

            <div>
              <h4 className="font-bold text-base tracking-tight">
                {language === 'ar' ? 'بصمة الوجه (Face ID)' : 'Face ID'}
              </h4>
              <p className="mt-1 text-xs text-[#8E8E93]">
                {scanned 
                  ? (language === 'ar' ? 'تم التحقق بنجاح' : 'Authenticated Successfully') 
                  : (language === 'ar' ? 'جارٍ التعرف على الوجه...' : 'Recognizing Face...')}
              </p>
            </div>

            <button
              onClick={() => setShowPasscode(true)}
              className="mt-2 text-xs font-semibold text-[#007AFF] hover:text-[#0062CC] transition-colors"
            >
              {language === 'ar' ? 'إدخال رمز الدخول' : 'Enter Passcode'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <KeyRound className="mx-auto h-8 w-8 text-[#007AFF]" />
            <h4 className="font-bold text-base tracking-tight">
              {language === 'ar' ? 'أدخل رمز دخول iPhone' : 'Enter iPhone Passcode'}
            </h4>
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map(idx => (
                <div
                  key={idx}
                  className={`h-3.5 w-3.5 rounded-full border border-[#007AFF] ${passcode.length > idx ? 'bg-[#007AFF]' : 'bg-transparent'}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(digit => (
                <button
                  key={digit}
                  onClick={() => {
                    const next = passcode + digit;
                    setPasscode(next);
                    if (next.length >= 4) {
                      setTimeout(onSuccess, 300);
                    }
                  }}
                  className="flex h-12 items-center justify-center rounded-2xl bg-[#2C2C2E] text-base font-bold text-white hover:bg-[#3A3A3C] active:scale-95 transition-all"
                >
                  {digit}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

