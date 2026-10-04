import * as React from 'react';
import { TopNav } from '@/components/top-nav';
import { BottomNav } from '@/components/bottom-nav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNav />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 pb-24 md:px-10 md:py-8 md:pb-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
