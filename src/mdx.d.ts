declare module '*.mdx' {
  import type { ReactElement } from 'react';

  const Component: (props: Record<string, unknown>) => ReactElement;
  export default Component;
}
