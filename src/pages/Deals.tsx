
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlashDeals from '@/components/FlashDeals';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';
import { products } from '@/data';
import { CartItem, Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Deals = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  
  // Get on sale products
  const onSaleProducts = products.filter(product => product.isOnSale);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
          duration: 2000,
        });
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

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
        <h1 className="text-3xl font-bold mb-8">Deals & Offers</h1>
        
        <FlashDeals />
        
        <div className="my-10">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-6 mb-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary/10 rounded-full"></div>
            
            <h2 className="text-2xl font-bold mb-2 relative z-10">Weekend Special Offers</h2>
            <p className="text-muted-foreground mb-4 relative z-10">Limited time deals that you don't want to miss!</p>
            
            <div className="flex items-center gap-4">
              <div className="bg-background p-3 rounded-lg shadow-sm">
                <p className="text-sm font-semibold">Extra 10% OFF</p>
                <p className="text-xs text-muted-foreground">On all orders</p>
              </div>
              
              <div className="bg-background p-3 rounded-lg shadow-sm">
                <p className="text-sm font-semibold">Free Delivery</p>
                <p className="text-xs text-muted-foreground">On orders over $25</p>
              </div>
              
              <div className="bg-background p-3 rounded-lg shadow-sm">
                <p className="text-sm font-semibold">Buy 1 Get 1</p>
                <p className="text-xs text-muted-foreground">On select items</p>
              </div>
            </div>
          </div>
        </div>
        
        <ProductGrid 
          title="On Sale Products" 
          products={onSaleProducts} 
          onAddToCart={handleAddToCart}
        />
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

export default Deals;
