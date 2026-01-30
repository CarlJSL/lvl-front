import { Card } from '../../components/ui';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export function StatCard({ title, value, change, isPositive }: StatCardProps) {
  return (
    <Card>
      <div className="p-5">
        <p className="text-sm text-slate-500 mb-1">{title}</p>
        <h3 className="text-xl font-bold mb-2 text-[#1e293b]">{value}</h3>
        <span
          className={cn(
            'text-xs font-medium px-2 py-1 rounded-full bg-slate-50',
            isPositive ? 'text-emerald-500' : 'text-red-500'
          )}
        >
          {change}
        </span>
      </div>
    </Card>
  );
}
