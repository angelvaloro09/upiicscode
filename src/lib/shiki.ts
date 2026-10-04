import { createHighlighter, type Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['c', 'cpp'],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  lang: string = 'c',
): Promise<string> {
  const highlighter = await getHighlighter();
  const validLang = lang === 'cpp' || lang === 'c++' ? 'cpp' : 'c';

  return highlighter.codeToHtml(code.trim(), {
    lang: validLang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  });
}
