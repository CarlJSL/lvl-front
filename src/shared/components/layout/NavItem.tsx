import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../core/utils/cn';

interface NavItemProps {
  icon: ReactNode;
  label: string;
  to: string;
}

export function NavItem({ icon, label, to }: NavItemProps) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors',
        active
          ? 'bg-blue-50 text-blue-600'
          : 'text-slate-500 hover:bg-slate-50'
      )}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
