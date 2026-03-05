import {
  LayoutDashboard,
  Smartphone,
  Globe,
  Server,
  ShoppingCart,
  LifeBuoy,
  Menu,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../core/utils/cn';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const [isOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['paginas-webs']);
  const location = useLocation();

  const toggleMenu = (menuId: string) => {
    if (isCollapsed) return;
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const navigation = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: Smartphone, label: 'Apps', to: '/apps', hasSubmenu: true },
  ];

  const paginasWebsSubmenu = [
    { label: 'Administrador', to: '/admin-form' },
    { label: 'Recursos humanos', to: '/recursos-humanos' },
    { label: 'Estudios contables', to: '/estudios-contables' },
    { label: 'Logística', to: '/logistica' },
  ];

  const navigationBottom = [
    { icon: Server, label: 'Servidores', to: '/servidores', hasSubmenu: true },
    { icon: ShoppingCart, label: 'Tienda', to: '/tienda', hasSubmenu: true },
    { icon: LifeBuoy, label: 'Centro de ayuda', to: '/ayuda', hasSubmenu: true },
  ];

  const isSubmenuActive = paginasWebsSubmenu.some(item => location.pathname === item.to);

  const iconSize = isCollapsed ? 18 : 20;

  return (
    <>
      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-40 bg-white border-r border-slate-200 p-4 transition-all overflow-y-auto',
          'md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'md:w-20' : 'md:w-64',
          isOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="relative mb-8">
          <div className={cn(
            'flex items-center justify-between px-3 py-3',
            isCollapsed && 'md:justify-center'
          )}>
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#002084] rounded flex items-center justify-center text-white font-bold text-xs">
                  LVL
                </div>
                <span className="font-bold text-[#002084] text-sm whitespace-nowrap">CONSULTING</span>
              </div>
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                'hidden md:block p-1 hover:bg-slate-100 rounded transition-colors',
                isCollapsed && 'mx-auto'
              )}
              aria-label="Colapsar menú"
            >
              <Menu size={18} className="text-slate-400" />
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <div className="px-5 mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu</span>
          </div>
        )}

        <nav className="space-y-4 px-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.to}>
                {isCollapsed ? (
                  <Link
                    to={item.to}
                    className={cn(
                      'flex items-center justify-center px-3 py-3 rounded-lg cursor-pointer transition-colors min-w-10 min-h-10',
                      location.pathname === item.to
                        ? 'bg-blue-50 text-[#002084]'
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                    )}
                    title={item.label}
                  >
                    <Icon size={iconSize} className="shrink-0" />
                  </Link>
                ) : (
                  <Link
                    to={item.to}
                    className={cn(
                      'flex items-center justify-between gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors group',
                      location.pathname === item.to
                        ? 'bg-blue-50 text-[#002084] font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={iconSize} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.hasSubmenu && (
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-600" />
                    )}
                  </Link>
                )}
              </div>
            );
          })}

          <div>
            {isCollapsed ? (
              <Link
                to="/paginas-webs"
                className={cn(
                  'flex items-center justify-center px-3 py-3 rounded-lg cursor-pointer transition-colors min-w-10 min-h-10',
                  isSubmenuActive || location.pathname === '/paginas-webs'
                    ? 'bg-blue-50 text-[#002084]'
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                )}
                title="Páginas webs"
              >
                <Globe size={iconSize} className="shrink-0" />
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleMenu('paginas-webs')}
                  className={cn(
                    'w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors',
                    isSubmenuActive || location.pathname === '/paginas-webs'
                      ? 'text-[#002084] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Globe size={iconSize} />
                    <span className="text-sm">Páginas webs</span>
                  </div>
                  {expandedMenus.includes('paginas-webs') ? (
                    <ChevronDown size={16} className="text-slate-400" />
                  ) : (
                    <ChevronRight size={16} className="text-slate-400" />
                  )}
                </button>

                {expandedMenus.includes('paginas-webs') && (
                  <div className="ml-6 mt-3 space-y-3">
                    {paginasWebsSubmenu.map((item) => {
                      const active = location.pathname === item.to;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={cn(
                            'block px-4 py-3 rounded-lg text-sm transition-colors',
                            active
                              ? 'bg-blue-50 text-[#002084] font-semibold'
                              : 'text-slate-500 hover:bg-slate-50'
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {navigationBottom.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.to}>
                {isCollapsed ? (
                  <Link
                    to={item.to}
                    className={cn(
                      'flex items-center justify-center px-3 py-3 rounded-lg cursor-pointer transition-colors min-w-10 min-h-10',
                      location.pathname === item.to
                        ? 'bg-blue-50 text-[#002084]'
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                    )}
                    title={item.label}
                  >
                    <Icon size={iconSize} className="shrink-0" />
                  </Link>
                ) : (
                  <Link
                    to={item.to}
                    className={cn(
                      'flex items-center justify-between gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors group',
                      location.pathname === item.to
                        ? 'bg-blue-50 text-[#002084]'
                        : 'text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={iconSize} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.hasSubmenu && (
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-600" />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
