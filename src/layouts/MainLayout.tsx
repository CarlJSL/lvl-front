import type { ReactNode } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-8">
          {title && (
            <h1 className="text-xl font-semibold text-[#1e293b] mb-4">{title}</h1>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
