import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
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

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'seller';
  timestamp: Date;
}

interface ChatDialogProps {
  open: boolean;
  selectedProduct: Product | null;
  messages: Message[];
  newMessage: string;
  onClose: () => void;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export default function ChatDialog({
  open,
  selectedProduct,
  messages,
  newMessage,
  onClose,
  onMessageChange,
  onSendMessage
}: ChatDialogProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!open || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <Card className="w-full md:max-w-2xl h-[100vh] md:h-[600px] bg-card border-primary/50 rounded-none md:rounded-lg flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-primary/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="User" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{selectedProduct.seller}</h3>
              <p className="text-sm text-muted-foreground">{selectedProduct.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary text-white neon-glow'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-primary/30">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => onMessageChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
              placeholder="Напишите сообщение..."
              className="bg-background border-primary/50"
            />
            <Button 
              onClick={onSendMessage}
              className="bg-primary text-white hover:bg-primary/90 neon-glow"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
