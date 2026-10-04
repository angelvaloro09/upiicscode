import * as React from 'react';
import { Callout } from '@/components/callout';
import { CodeBlock } from '@/components/code-block';
import { highlightCode } from '@/lib/shiki';

export type MDXComponents = {
  [key: string]: React.ComponentType<never> | React.ElementType;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

async function PreComponent({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'pre'>) {
  if (React.isValidElement(children)) {
    const codeProps = children.props as {
      className?: string;
      children?: string;
    };
    const code =
      typeof codeProps?.children === 'string'
        ? codeProps.children
        : String(codeProps?.children || '');

    const match = /language-(\w+)/.exec(codeProps?.className || '');
    const language = match ? match[1] : 'c';

    let highlightedHtml: string | undefined;
    try {
      highlightedHtml = await highlightCode(code, language);
    } catch {
      highlightedHtml = undefined;
    }

    return (
      <div className="my-6">
        <CodeBlock
          code={code.trim()}
          language={language}
          highlightedHtml={highlightedHtml}
        />
      </div>
    );
  }

  return (
    <pre
      className="border-border bg-code-block-bg overflow-x-auto rounded-[8px] border p-4 font-mono text-[13px] leading-relaxed [font-variant-ligatures:none]"
      {...props}
    >
      {children}
    </pre>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    CodeBlock,
    h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => {
      const text = typeof children === 'string' ? children : '';
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="border-border/40 text-foreground mt-8 mb-4 scroll-mt-24 border-b pb-2 font-sans text-2xl font-bold tracking-tight"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }: React.ComponentPropsWithoutRef<'h3'>) => {
      const text = typeof children === 'string' ? children : '';
      const id = slugify(text);
      return (
        <h3
          id={id}
          className="text-foreground mt-6 mb-3 scroll-mt-24 font-sans text-lg font-semibold tracking-tight"
          {...props}
        >
          {children}
        </h3>
      );
    },
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
      <p
        className="text-foreground/90 mb-4 font-sans text-base leading-[26px]"
        {...props}
      >
        {children}
      </p>
    ),
    a: ({ children, ...props }: React.ComponentPropsWithoutRef<'a'>) => (
      <a
        className="text-primary dark:text-primary-text font-sans font-medium underline underline-offset-2 hover:opacity-85"
        {...props}
      >
        {children}
      </a>
    ),
    code: ({
      className,
      children,
      ...props
    }: React.ComponentPropsWithoutRef<'code'>) => {
      if (className?.includes('language-')) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      return (
        <code
          className="bg-code-inline-bg text-foreground rounded px-1.5 py-0.5 font-mono text-[13px] [font-variant-ligatures:none]"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: PreComponent,
    table: ({
      children,
      ...props
    }: React.ComponentPropsWithoutRef<'table'>) => (
      <div className="border-border my-6 overflow-x-auto rounded-[8px] border">
        <table
          className="w-full border-collapse text-left font-sans text-sm"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({
      children,
      ...props
    }: React.ComponentPropsWithoutRef<'thead'>) => (
      <thead
        className="border-border bg-surface-subtle text-foreground border-b font-semibold"
        {...props}
      >
        {children}
      </thead>
    ),
    tbody: ({
      children,
      ...props
    }: React.ComponentPropsWithoutRef<'tbody'>) => (
      <tbody className="divide-border divide-y" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: React.ComponentPropsWithoutRef<'tr'>) => (
      <tr className="hover:bg-surface-subtle/50 transition-colors" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: React.ComponentPropsWithoutRef<'th'>) => (
      <th className="text-foreground px-4 py-2.5 font-semibold" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
      <td className="text-foreground/90 px-4 py-2.5" {...props}>
        {children}
      </td>
    ),
    ul: ({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) => (
      <ul
        className="text-foreground/90 my-4 list-disc space-y-1.5 pl-6 font-sans text-base leading-[26px]"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.ComponentPropsWithoutRef<'ol'>) => (
      <ol
        className="text-foreground/90 my-4 list-decimal space-y-1.5 pl-6 font-sans text-base leading-[26px]"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }: React.ComponentPropsWithoutRef<'li'>) => (
      <li className="pl-1" {...props}>
        {children}
      </li>
    ),
  };
}
