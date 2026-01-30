import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: '1024', label: 'Teléfonos', value: 87, color: '#10b981' },
  { name: '1024', label: 'Referidos', value: 87, color: '#3b82f6' },
];

export function ReferralsChart() {
  return (
    <div className="w-full h-full py-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
        >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" hide />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col justify-center space-y-6 px-4 pointer-events-none">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-800">{item.name}</div>
              <div className="text-xs text-slate-500">{item.label}</div>
            </div>
            <div className="text-sm font-semibold text-slate-600">{item.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
