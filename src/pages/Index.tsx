import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const products: Product[] = [
  { id: 1, name: 'Wireless Headphones Pro', price: 12990, image: '/img/9ecd0c0e-c1ea-431d-9109-3e0e1fdfc41d.jpg', category: 'Audio', rating: 4.8 },
  { id: 2, name: 'RGB Gaming Keyboard', price: 8990, image: '/img/cb59de24-07ed-42a8-8331-a877fba91702.jpg', category: 'Gaming', rating: 4.9 },
  { id: 3, name: 'Smart Watch Ultra', price: 24990, image: '/img/31a2e2ca-93f4-4d65-803b-0b73360184cb.jpg', category: 'Wearables', rating: 4.7 },
  { id: 4, name: 'Wireless Mouse X', price: 4990, image: '/img/9ecd0c0e-c1ea-431d-9109-3e0e1fdfc41d.jpg', category: 'Gaming', rating: 4.6 },
  { id: 5, name: 'USB-C Hub Pro', price: 5990, image: '/img/cb59de24-07ed-42a8-8331-a877fba91702.jpg', category: 'Accessories', rating: 4.5 },
  { id: 6, name: 'Mechanical Switches', price: 2990, image: '/img/31a2e2ca-93f4-4d65-803b-0b73360184cb.jpg', category: 'Gaming', rating: 4.9 },
];

export default function Index() {
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewedProducts, setViewedProducts] = useState<number[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    if (!viewedProducts.includes(productId)) {
      setViewedProducts([...viewedProducts, productId]);
    }
  };

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  useEffect(() => {
    if (viewedProducts.length > 0) {
      const viewedCategories = products
        .filter(p => viewedProducts.includes(p.id))
        .map(p => p.category);
      
      const recommended = products.filter(
        p => !viewedProducts.includes(p.id) && viewedCategories.includes(p.category)
      ).slice(0, 3);
      
      setRecommendations(recommended);
    }
  }, [viewedProducts]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-primary/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-bold neon-text tracking-wider">MARKETPLACE</h1>
            
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-primary/50 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative hover:bg-primary/10"
                onClick={() => setCartOpen(!cartOpen)}
              >
                <Icon name="ShoppingCart" size={24} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs animate-glow-pulse">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                <Icon name="Heart" size={24} />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-background text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Icon name="User" size={24} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {recommendations.length > 0 && (
          <section className="mb-12 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Icon name="Sparkles" className="text-primary" size={24} />
              <h2 className="text-2xl font-bold">Рекомендации для вас</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map(product => (
                <Card key={product.id} className="bg-card border-secondary/50 hover-scale overflow-hidden group">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <Badge className="absolute top-3 right-3 bg-secondary text-background">
                      Для вас
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</span>
                      <Button
                        onClick={() => addToCart(product.id)}
                        className="bg-secondary text-background hover:bg-secondary/90 neon-glow-cyan"
                      >
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">Каталог товаров</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="bg-card border-primary/30 hover:border-primary transition-all duration-300 hover-scale overflow-hidden group">
                <div className="relative h-64 bg-muted overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-3 right-3 backdrop-blur-sm ${
                      favorites.includes(product.id) ? 'text-primary bg-background/90' : 'text-white bg-black/30'
                    }`}
                  >
                    <Icon name={favorites.includes(product.id) ? "Heart" : "Heart"} size={20} className={favorites.includes(product.id) ? "fill-current" : ""} />
                  </Button>
                  <Badge className="absolute bottom-3 left-3 bg-background/90 text-foreground">
                    <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                    {product.rating}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-2 border-primary/50 text-primary">{product.category}</Badge>
                  <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-3xl font-bold text-primary">{product.price.toLocaleString()}</span>
                      <span className="text-xl ml-1">₽</span>
                    </div>
                    <Button
                      onClick={() => addToCart(product.id)}
                      className="bg-primary text-white hover:bg-primary/90 neon-glow border-0"
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Купить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setCartOpen(false)}>
          <Card className="w-full max-w-md bg-card border-primary/50" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="ShoppingCart" size={24} />
                  Корзина
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>
              
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((productId, index) => {
                    const product = products.find(p => p.id === productId);
                    return product ? (
                      <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-primary font-bold">{product.price.toLocaleString()} ₽</p>
                        </div>
                      </div>
                    ) : null;
                  })}
                  <div className="border-t border-primary/30 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg">Итого:</span>
                      <span className="text-2xl font-bold text-primary">
                        {cart.reduce((sum, id) => sum + (products.find(p => p.id === id)?.price || 0), 0).toLocaleString()} ₽
                      </span>
                    </div>
                    <Button className="w-full bg-primary text-white hover:bg-primary/90 neon-glow">
                      Оформить заказ
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
