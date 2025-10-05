import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
  onOpenChat: (product: Product) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onOpenChat
}: ProductCardProps) {
  return (
    <Card className="bg-card border-primary/30 hover:border-primary transition-all duration-300 hover-scale overflow-hidden group">
      <div className="relative h-64 bg-muted overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleFavorite(product.id)}
          className={`absolute top-3 right-3 backdrop-blur-sm ${
            isFavorite ? 'text-primary bg-background/90' : 'text-white bg-black/30'
          }`}
        >
          <Icon name="Heart" size={20} className={isFavorite ? "fill-current" : ""} />
        </Button>
      </div>
      
      <CardContent className="p-6">
        <Badge variant="outline" className="mb-2 border-primary/50 text-primary">{product.category}</Badge>
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        
        {product.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        )}
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Icon name="User" size={16} />
          <span>{product.seller}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-primary">{product.price.toLocaleString()}</span>
            <span className="text-xl ml-1">₽</span>
          </div>
          <Button 
            onClick={() => onOpenChat(product)}
            className="bg-secondary text-background hover:bg-secondary/90 neon-glow-cyan"
          >
            Написать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
