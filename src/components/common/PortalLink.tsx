import React from 'react';

export interface PortalLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> {
  href?: string;
  onNavigate?: () => void;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Standart Portal Navigasyon Bağlantısı.
 *
 * - Her zaman gerçek bir `<a href="...">` render eder; böylece sağ tık ("Yeni sekmede aç",
 *   "Bağlantı adresini kopyala"), orta tık ve Ctrl/Cmd+Tık doğal olarak çalışır.
 * - Normal sol tıkta (Ctrl/Cmd/Shift/Alt basılı değilken) `e.preventDefault()` ile
 *   SPA içi anında geçiş yapar.
 */
export const PortalLink: React.FC<PortalLinkProps> = ({
  href,
  onNavigate,
  disabled = false,
  onClick,
  className = '',
  children,
  ...rest
}) => {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
    if (e.defaultPrevented) return;

    const isPlainLeftClick =
      e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;

    if (isPlainLeftClick && onNavigate) {
      e.preventDefault();
      onNavigate();
    }
  };

  return (
    <a
      href={disabled ? undefined : href}
      draggable={false}
      onClick={handleClick}
      aria-disabled={disabled || undefined}
      className={`no-underline text-inherit select-text ${className}`.trim()}
      {...rest}
    >
      {children}
    </a>
  );
};
