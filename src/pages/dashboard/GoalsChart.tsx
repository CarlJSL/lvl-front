import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Anual', value: 100, amount: 'S/4550' },
  { name: 'Mensual', value: 60, amount: 'S/4550' },
  { name: 'Semanal', value: 20, amount: 'S/4550' },
  { name: 'Diario', value: 30, amount: 'S/4550' },
];

const COLORS = ['#002084', '#3b82f6', '#60a5fa', '#93c5fd'];

export function GoalsChart() {
  return (
    <div className="w-full h-full flex items-center">
      <div className="flex items-center justify-center w-1/2">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-1/2 space-y-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-slate-600 font-medium">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-slate-800">{item.value}%</div>
              <div className="text-[10px] text-slate-500">{item.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
