import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  seller: string;
  sellerId: number;
  createdAt: Date;
}

interface ProfileDialogProps {
  open: boolean;
  currentUser: User | null;
  products: Product[];
  onClose: () => void;
  onLogout: () => void;
  onDeleteProduct: (productId: number) => void;
}

export default function ProfileDialog({
  open,
  currentUser,
  products,
  onClose,
  onLogout,
  onDeleteProduct
}: ProfileDialogProps) {
  if (!open || !currentUser) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-primary/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Профиль</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={24} />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Icon name="User" size={48} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{currentUser.name}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="Mail" size={20} className="text-primary" />
                <span className="text-sm">{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="Phone" size={20} className="text-primary" />
                <span className="text-sm">{currentUser.phone}</span>
              </div>
            </div>

            <div className="border-t border-primary/30 pt-4">
              <h4 className="font-semibold mb-3">Мои объявления</h4>
              <div className="space-y-2">
                {products.filter(p => p.sellerId === currentUser.id).length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    У вас пока нет объявлений
                  </p>
                ) : (
                  products.filter(p => p.sellerId === currentUser.id).map(product => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-primary">{product.price.toLocaleString()} ₽</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteProduct(product.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
            >
              Выйти
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}