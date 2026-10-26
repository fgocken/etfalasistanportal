import React, { useState } from 'react';
import { Share2, Check, Link2 } from 'lucide-react';
import { HashRouteType, buildShareUrl, copyToClipboard } from '../../utils/deepLink';

interface ShareLinkButtonProps {
  type: HashRouteType;
  id: string;
  title?: string;
  isDark: boolean;
  className?: string;
  variant?: 'compact' | 'full';
}

export const ShareLinkButton: React.FC<ShareLinkButtonProps> = ({
  type,
  id,
  title = 'Bağlantıyı Kopyala',
  isDark,
  className = '',
  variant = 'full'
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const url = buildShareUrl(type, id);
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? 'Bağlantı panoya kopyalandı!' : `${title} (#${type}=${id})`}
        aria-label={title}
        className={`relative inline-flex items-center justify-center p-2 rounded-xl border transition-all cursor-pointer ${
          copied
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
            : isDark
            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-2xs'
        } ${className}`}
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-500 animate-in zoom-in-75 duration-200" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? 'Bağlantı panoya kopyalandı!' : `${title} (#${type}=${id})`}
      className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer select-none ${
        copied
          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold'
          : isDark
          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500 animate-in zoom-in-75 duration-200 shrink-0" />
          <span>Bağlantı Kopyalandı!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 shrink-0" />
          <span>Bağlantıyı Kopyala</span>
        </>
      )}
    </button>
  );
};
