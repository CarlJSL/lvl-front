import { MainLayout } from '../../../shared/components/layout/MainLayout';
import { Card, CardHeader, CardContent } from '../../../shared/components';
import { StatCard } from '../components/StatCard';
import { SalesChart } from '../components/SalesChart';
import { GoalsChart } from '../components/GoalsChart';
import { ReferralsChart } from '../components/ReferralsChart';

export default function DashboardPage() {
  const stats = [
    { title: 'Ingresos', value: 'S/ 460.00', change: '+ S/50k', isPositive: true },
    { title: 'Número de clientes', value: '4789', change: '-30 clientes', isPositive: false },
    { title: 'Inversión realizada', value: 'S/ 5460.00k', change: '+ S/32k', isPositive: true },
    { title: 'Relación de ganancia', value: 'S/ 460.00', change: '- S/50k', isPositive: false },
  ];

  return (
    <MainLayout title="Dashboard">
      {/* Grid de Tarjetas Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Gráfico Principal - Historial de Ventas */}
      <Card className="mb-4">
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#1e293b]">Historial de Ventas</h3>
          <p className="text-sm text-slate-500">Total libre GB</p>
        </CardHeader>
        <CardContent className="h-48">
          <SalesChart />
        </CardContent>
      </Card>

      {/* Grid de Gráficos Inferiores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gráfico de Objetivos (Donut) */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-[#1e293b]">Historial de Ventas</h3>
          </CardHeader>
          <CardContent className="h-40">
            <GoalsChart />
          </CardContent>
        </Card>

        {/* Gráfico de Referidos (Barras Horizontales) */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-[#1e293b]">Historial de Ventas</h3>
          </CardHeader>
          <CardContent className="h-40">
            <ReferralsChart />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
