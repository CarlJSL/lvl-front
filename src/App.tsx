import { LayoutDashboard, Package, Smartphone, Globe, Server, ShoppingCart, LifeBuoy } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar - La barra lateral de tu imagen */}
      <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold">LVL</div>
          <span className="font-bold text-slate-800">CONSULTING</span>
        </div>
        
        <nav className="space-y-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<Package size={20} />} label="Productos" />
          <NavItem icon={<Smartphone size={20} />} label="Apps" />
          <NavItem icon={<Globe size={20} />} label="Páginas webs" />
          <NavItem icon={<Server size={20} />} label="Servidores" />
          <NavItem icon={<ShoppingCart size={20} />} label="Tienda" />
          <NavItem icon={<LifeBuoy size={20} />} label="Centro de ayuda" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">¡Te damos la bienvenida Miguel!</h1>
          <div className="flex items-center gap-4">
             <span className="text-sm text-slate-500">Lunes, 15 de abril, 2024</span>
          </div>
        </header>

        {/* Grid de Tarjetas Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Ingresos" value="S/ 460.00" change="+ S/50k" color="text-emerald-500" />
          <StatCard title="Número de clientes" value="4789" change="-30 clientes" color="text-red-500" />
          <StatCard title="Inversión realizada" value="S/ 5460.00k" change="+ S/32k" color="text-emerald-500" />
          <StatCard title="Relación de ganancia" value="S/ 460.00" change="- S/50k" color="text-red-500" />
        </div>

        {/* Espacio para el Gráfico */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-64 flex items-center justify-center text-slate-400 italic">
          Aquí irá el gráfico de ventas (Historial de ventas)
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function StatCard({ title, value, change, color }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-sm text-slate-500 mb-1">{title}</p>
      <h3 className="text-xl font-bold mb-2">{value}</h3>
      <span className={`text-xs font-medium px-2 py-1 rounded-full bg-slate-50 ${color}`}>{change}</span>
    </div>
  );
}