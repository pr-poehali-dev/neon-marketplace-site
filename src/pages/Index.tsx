import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import AuthDialog from '@/components/AuthDialog';
import ProfileDialog from '@/components/ProfileDialog';
import ChatDialog from '@/components/ChatDialog';
import ProductCard from '@/components/ProductCard';

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

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'seller';
  timestamp: Date;
}

export default function Index() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    seller: '',
    image: ''
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAuth = () => {
    if (authMode === 'register') {
      if (!authForm.name || !authForm.email || !authForm.phone || !authForm.password) {
        return;
      }
      const user: User = {
        id: Date.now(),
        name: authForm.name,
        email: authForm.email,
        phone: authForm.phone
      };
      setCurrentUser(user);
    } else {
      if (!authForm.email || !authForm.password) {
        return;
      }
      const user: User = {
        id: 1,
        name: 'Демо пользователь',
        email: authForm.email,
        phone: '+7 999 123-45-67'
      };
      setCurrentUser(user);
    }
    setAuthForm({ name: '', email: '', phone: '', password: '' });
    setAuthOpen(false);
  };

  const handleAddProduct = () => {
    if (!currentUser) {
      setAuthOpen(true);
      return;
    }
    
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      seller: currentUser.name,
      sellerId: currentUser.id,
      image: newProduct.image || '/img/9ecd0c0e-c1ea-431d-9109-3e0e1fdfc41d.jpg',
      createdAt: new Date()
    };

    setProducts([product, ...products]);
    setNewProduct({ name: '', price: '', category: '', description: '', seller: '', image: '' });
    setDialogOpen(false);
  };

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const openChat = (product: Product) => {
    setSelectedProduct(product);
    setChatOpen(true);
    setMessages([
      {
        id: 1,
        text: `Здравствуйте! Интересует ${product.name}. Товар ещё актуален?`,
        sender: 'user',
        timestamp: new Date()
      }
    ]);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');

    setTimeout(() => {
      const sellerResponse: Message = {
        id: Date.now() + 1,
        text: 'Да, товар в наличии! Могу ответить на любые вопросы',
        sender: 'seller',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, sellerResponse]);
    }, 1000);
  };

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
                  placeholder="Поиск объявлений..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-primary/50 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white hover:bg-primary/90 neon-glow">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить объявление
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-primary/50 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Новое объявление</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="name">Название товара *</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="bg-background border-primary/50"
                        placeholder="Например: iPhone 15 Pro"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Цена (₽) *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          className="bg-background border-primary/50"
                          placeholder="50000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Категория *</Label>
                        <Input
                          id="category"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                          className="bg-background border-primary/50"
                          placeholder="Электроника"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="bg-background border-primary/50 min-h-[100px]"
                        placeholder="Расскажите о товаре..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">Ссылка на фото (необязательно)</Label>
                      <Input
                        id="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="bg-background border-primary/50"
                        placeholder="https://..."
                      />
                    </div>

                    <Button 
                      onClick={handleAddProduct}
                      className="w-full bg-primary text-white hover:bg-primary/90 neon-glow"
                    >
                      Опубликовать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                <Icon name="Heart" size={24} />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-background text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>

              {currentUser ? (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-primary/10"
                  onClick={() => setProfileOpen(true)}
                >
                  <Icon name="User" size={24} />
                </Button>
              ) : (
                <Button 
                  onClick={() => setAuthOpen(true)}
                  className="bg-accent text-white hover:bg-accent/90"
                >
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 relative">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center animate-glow-pulse">
                <Icon name="Package" size={64} className="text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-3">Объявлений пока нет</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Станьте первым! Нажмите кнопку "Добавить объявление" и разместите свой товар
            </p>
            <Button 
              onClick={() => setDialogOpen(true)}
              className="bg-primary text-white hover:bg-primary/90 neon-glow"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Создать объявление
            </Button>
          </div>
        ) : (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Все объявления</h2>
              <Badge variant="outline" className="border-primary text-primary">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'объявление' : 'объявлений'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onOpenChat={openChat}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <AuthDialog
        open={authOpen}
        authMode={authMode}
        authForm={authForm}
        onClose={() => setAuthOpen(false)}
        onAuthModeChange={setAuthMode}
        onAuthFormChange={setAuthForm}
        onAuth={handleAuth}
      />

      <ProfileDialog
        open={profileOpen}
        currentUser={currentUser}
        products={products}
        onClose={() => setProfileOpen(false)}
        onLogout={() => {
          setCurrentUser(null);
          setProfileOpen(false);
        }}
      />

      <ChatDialog
        open={chatOpen}
        selectedProduct={selectedProduct}
        messages={messages}
        newMessage={newMessage}
        onClose={() => setChatOpen(false)}
        onMessageChange={setNewMessage}
        onSendMessage={sendMessage}
      />
    </div>
  );
}
