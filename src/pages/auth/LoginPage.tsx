import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button, Input, Card, CardContent } from '../../components/ui';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../stores/authStore';
import { useMutation } from '@tanstack/react-query';

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate('/');
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/fondo-login.jpg)' }}
      />
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />

      <Card className="w-full max-w-md relative z-10">
        <CardContent className="p-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#1e293b] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              LVL
            </div>
            <span className="font-bold text-[#1e293b] text-lg">CONSULTING</span>
          </div>

          <h2 className="text-xl font-bold text-[#1e293b] text-center mb-4">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              {...register('email')}
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              aria-label="Correo electrónico"
            />

            <div className="relative">
              <Input
                {...register('password')}
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                error={errors.password?.message}
                aria-label="Contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9.5 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 border-slate-300 rounded text-[#002084] focus:ring-[#002084]"
                />
                <span className="text-slate-600">Recordarme</span>
              </label>
              <a href="#" className="text-[#002084] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>

            {loginMutation.isError && (
              <p className="text-sm text-red-500 text-center">
                Credenciales incorrectas. Intenta de nuevo.
              </p>
            )}
          </form>

          <p className="mt-4 text-center text-xs text-slate-600">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-[#002084] hover:underline font-medium">
              Regístrate
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
