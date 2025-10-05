import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface AuthDialogProps {
  open: boolean;
  authMode: 'login' | 'register';
  authForm: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
  onClose: () => void;
  onAuthModeChange: (mode: 'login' | 'register') => void;
  onAuthFormChange: (form: { name: string; email: string; phone: string; password: string }) => void;
  onAuth: () => void;
}

export default function AuthDialog({
  open,
  authMode,
  authForm,
  onClose,
  onAuthModeChange,
  onAuthFormChange,
  onAuth
}: AuthDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-primary/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {authMode === 'login' ? 'Вход' : 'Регистрация'}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={24} />
            </Button>
          </div>

          <div className="space-y-4">
            {authMode === 'register' && (
              <div>
                <Label htmlFor="auth-name">Имя *</Label>
                <Input
                  id="auth-name"
                  value={authForm.name}
                  onChange={(e) => onAuthFormChange({ ...authForm, name: e.target.value })}
                  className="bg-background border-primary/50"
                  placeholder="Иван"
                />
              </div>
            )}

            <div>
              <Label htmlFor="auth-email">Email *</Label>
              <Input
                id="auth-email"
                type="email"
                value={authForm.email}
                onChange={(e) => onAuthFormChange({ ...authForm, email: e.target.value })}
                className="bg-background border-primary/50"
                placeholder="ivan@example.com"
              />
            </div>

            {authMode === 'register' && (
              <div>
                <Label htmlFor="auth-phone">Телефон *</Label>
                <Input
                  id="auth-phone"
                  value={authForm.phone}
                  onChange={(e) => onAuthFormChange({ ...authForm, phone: e.target.value })}
                  className="bg-background border-primary/50"
                  placeholder="+7 999 123-45-67"
                />
              </div>
            )}

            <div>
              <Label htmlFor="auth-password">Пароль *</Label>
              <Input
                id="auth-password"
                type="password"
                value={authForm.password}
                onChange={(e) => onAuthFormChange({ ...authForm, password: e.target.value })}
                className="bg-background border-primary/50"
                placeholder="••••••••"
              />
            </div>

            <Button
              onClick={onAuth}
              className="w-full bg-primary text-white hover:bg-primary/90 neon-glow"
            >
              {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {authMode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
              <button
                onClick={() => onAuthModeChange(authMode === 'login' ? 'register' : 'login')}
                className="text-primary hover:underline"
              >
                {authMode === 'login' ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
