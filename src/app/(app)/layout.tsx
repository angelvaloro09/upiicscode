import * as React from 'react';
import { TopNav, NavProvider } from '@/components/top-nav';
import { BottomNav } from '@/components/bottom-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavProvider>
      <div className="bg-background text-foreground flex min-h-screen flex-col">
        <TopNav />
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 pb-24 md:px-10 md:py-8 md:pb-8">
          {children}
        </main>
        <BottomNav />
      </div>
    </NavProvider>
  );
}
