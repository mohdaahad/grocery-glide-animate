
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderTracking from '@/components/OrderTracking';
import { Button } from '@/components/ui/button';
import { currentOrder } from '@/data';
import { products } from '@/data';
import { Package, ShoppingBag, Clock } from 'lucide-react';
import { CartItem } from '@/types';
import Cart from '@/components/Cart';

const PAST_ORDERS = [
  {
    id: "order-222333",
    date: "August 15, 2023",
    total: 45.99,
    status: "delivered",
    items: [products[0], products[1], products[3]],
  },
  {
    id: "order-111222",
    date: "July 30, 2023",
    total: 32.50,
    status: "delivered",
    items: [products[2], products[5]],
  }
];

const MyOrders = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        <div className="space-y-8">
          {/* Current order */}
          <div className="bg-background border rounded-lg shadow-sm overflow-hidden">
            <div className="p-5 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="text-primary h-5 w-5" />
                  <h2 className="font-semibold">Current Order</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Order #{currentOrder.id.split('-')[1]}</span>
                </div>
              </div>
            </div>
            
            <OrderTracking />
          </div>
          
          {/* Past orders */}
          <h2 className="text-xl font-bold mt-10 mb-4">Order History</h2>
          
          {PAST_ORDERS.map((order) => (
            <div key={order.id} className="bg-background border rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="text-primary h-5 w-5" />
                    <h3 className="font-semibold">Order #{order.id.split('-')[1]}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{order.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Delivered</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.unit}</p>
                        </div>
                        <div className="text-sm font-medium">
                          ${item.discountedPrice || item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2 justify-end">
                  <Button variant="outline" size="sm">Order Details</Button>
                  <Button size="sm">Reorder</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

const [useState] = [React.useState];
export default MyOrders;
