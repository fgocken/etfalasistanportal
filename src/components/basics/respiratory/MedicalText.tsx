import React from 'react';

interface MedicalTextProps {
  text: string;
  className?: string;
}

/**
 * Font-independent medical & physiological notation renderer.
 * Supports:
 *  - \dot{V}, \dot{Q}  -> crisp CSS overdot (never breaks across OS fonts)
 *  - \bar{v}, \bar{E}  -> crisp CSS overbar
 *  - _{...}            -> proper HTML <sub>
 *  - ^{...}            -> proper HTML <sup>
 *  - Nested tokens inside sub/sup (e.g. P_{\bar{E}CO_{2}}, C_{\bar{v}O_{2}})
 */
const TOKEN_REGEX =
  /\\dot\{([A-Za-z]+)\}|\\bar\{([A-Za-z]+)\}|_\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}|\^\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;

function renderTokens(input: string, keyPrefix = 't'): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(TOKEN_REGEX.source, 'g');
  let counter = 0;

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(input.slice(lastIndex, match.index));
    }

    const [full, dotChar, barChar, subContent, supContent] = match;
    const key = `${keyPrefix}-${counter++}`;

    if (dotChar !== undefined) {
      nodes.push(
        <span key={key} className="relative inline-block leading-none mx-[0.02em]">
          {dotChar}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-[0.26em] -translate-x-1/2 w-[0.2em] h-[0.2em] rounded-full bg-current"
          />
        </span>
      );
    } else if (barChar !== undefined) {
      nodes.push(
        <span key={key} className="relative inline-block leading-none mx-[0.02em]">
          {barChar}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-[0.16em] -translate-x-1/2 w-[0.68em] h-[1.3px] bg-current rounded-full"
          />
        </span>
      );
    } else if (subContent !== undefined) {
      nodes.push(
        <sub key={key} className="text-[0.74em] leading-none font-normal align-baseline relative top-[0.24em]">
          {renderTokens(subContent, `${key}-sub`)}
        </sub>
      );
    } else if (supContent !== undefined) {
      nodes.push(
        <sup key={key} className="text-[0.74em] leading-none font-normal align-baseline relative -top-[0.38em]">
          {renderTokens(supContent, `${key}-sup`)}
        </sup>
      );
    } else {
      nodes.push(full);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < input.length) {
    nodes.push(input.slice(lastIndex));
  }

  return nodes;
}

export const MedicalText: React.FC<MedicalTextProps> = ({ text, className }) => {
  if (!text) return null;
  const content = renderTokens(text);
  if (className) {
    return <span className={className}>{content}</span>;
  }
  return <>{content}</>;
};

export default MedicalText;
