'use client';

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
  highlightedHtml?: string;
}

export function CodeBlock({
  code,
  filename,
  language,
  className,
  highlightedHtml,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard write failure
    }
  };

  const headerLabel =
    filename || (language ? language.toLowerCase() : 'código');

  return (
    <div
      className={cn(
        'group border-border bg-code-block-bg relative overflow-hidden rounded-[8px] border',
        className,
      )}
    >
      <div className="border-border/80 text-muted-foreground flex h-10 items-center justify-between border-b px-3.5 font-mono text-xs select-none">
        <span className="truncate">{headerLabel}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring h-7 gap-1.5 px-2.5 text-[13px] focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label={
            copied
              ? 'Código copiado al portapapeles'
              : 'Copiar código al portapapeles'
          }
        >
          {copied ? (
            <>
              <Check className="text-verdict-ac-fg size-3.5" />
              <span className="text-verdict-ac-fg text-[13px] font-medium">
                Copiado
              </span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span className="text-[13px] font-medium">Copiar</span>
            </>
          )}
        </Button>
      </div>
      {highlightedHtml ? (
        <div
          className="overflow-x-auto text-[13px] leading-relaxed [font-variant-ligatures:none] [&_.shiki]:m-0 [&_.shiki]:bg-transparent! [&_.shiki]:p-4 [&_.shiki]:font-mono [&_.shiki]:text-[13px] [&_.shiki]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="text-foreground overflow-x-auto p-4 font-mono text-[13px] leading-relaxed [font-variant-ligatures:none]">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
