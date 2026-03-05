import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button, Input, Card, CardContent } from '../../../shared/components';
import { authService } from '../api/auth.service';
import { useAuthStore } from '../store/authStore';
import { useMutation } from '@tanstack/react-query';

const registerSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate('/');
    },
  });

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data);
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
          <h2 className="text-xl font-bold text-[#1e293b] text-center mb-1">
            Crear cuenta
          </h2>
          <p className="text-center text-slate-600 text-sm mb-4">
            Únete a la comunidad de LVL Consulting
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              {...register('email')}
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              aria-label="Correo electrónico"
            />

            <Input
              {...register('username')}
              label="Nombre de usuario"
              placeholder="usuario123"
              error={errors.username?.message}
              aria-label="Nombre de usuario"
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

            <p className="text-xs text-center text-slate-500">
              Al registrarte aceptas los{' '}
              <a href="#" className="text-[#002084] hover:underline">
                Términos de uso de LVL Consulting
              </a>.
            </p>

            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>

            {registerMutation.isError && (
              <p className="text-sm text-red-500 text-center">
                Error al crear la cuenta. Intenta de nuevo.
              </p>
            )}
          </form>

          {/* Social Auth */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-slate-500">Crear cuenta con</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                type="button"
                className="flex items-center justify-center px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                aria-label="Continuar con Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>

              <button
                type="button"
                className="flex items-center justify-center px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                aria-label="Continuar con Facebook"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              <button
                type="button"
                className="flex items-center justify-center px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                aria-label="Continuar con Adobe"
              >
                <svg className="w-5 h-5" fill="#FF0000" viewBox="0 0 24 24">
                  <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z" />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-[#002084] hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
