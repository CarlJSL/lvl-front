import { Grid3x3, Bell, Settings, ChevronDown, LogOut, User } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { useAuthStore } from '../../stores/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { user, clearAuth } = useAuthStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = format(today, "EEEE, d 'de' MMMM, yyyy", { locale: es });
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Bloque Izquierdo - Mensaje de Bienvenida */}
        <div>
          <h1 className="text-lg font-semibold text-slate-800">
            ¡Te damos la bienvenida {user?.username}!
          </h1>
          <p className="text-sm text-slate-500">{capitalizedDate}</p>
        </div>

        {/* Bloque Derecho - Herramientas */}
        <div className="flex items-center gap-6">
          {/* Selector de Idioma */}
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            <span className="text-lg">🇪🇸</span>
            <span className="text-sm text-slate-700">Español</span>
            <ChevronDown size={16} className="text-slate-400" />
          </button>

          {/* Iconos de Acción */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <Grid3x3 size={20} className="text-slate-600" />
            </button>
            
            <button className="relative p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <Settings size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Perfil de Usuario */}
          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#002084] flex items-center justify-center text-white font-semibold text-sm">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-800">{user?.username || 'Usuario'}</p>
                <p className="text-xs text-slate-500">CEO LVL Consulting</p>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20">
                  <button 
                    onClick={() => {
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <User size={18} className="text-slate-500" />
                    <span>Mi perfil</span>
                  </button>
                  
                  <div className="border-t border-slate-200 my-2" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} className="text-red-600" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
