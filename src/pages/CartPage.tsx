
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ChevronLeft } from 'lucide-react';
import { CartItem, Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const { toast } = useToast();

  // For demo purposes, initialize with some items
  useEffect(() => {
    import('@/data').then(data => {
      const initialItems: CartItem[] = [
        { product: data.products[0], quantity: 2 },
        { product: data.products[3], quantity: 1 }
      ];
      setCartItems(initialItems);
    });
  }, []);

  // Calculate totals
  useEffect(() => {
    const newSubtotal = cartItems.reduce((total, item) => {
      const price = item.product.discountedPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
    
    setSubtotal(newSubtotal);
    setDeliveryFee(newSubtotal > 0 ? 2.99 : 0);
  }, [cartItems]);

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

  const handleApplyCoupon = () => {
    if (couponCode.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Coupon Applied",
      description: "Coupon code has been applied to your order",
      duration: 3000,
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Checkout functionality coming soon!",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => {}}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <ShoppingCart className="mr-2 h-6 w-6" />
              Shopping Cart
            </h1>
            <Link to="/" className="text-muted-foreground hover:text-foreground flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
                  <div className="p-4 border-b grid grid-cols-5 text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Product</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-center">Price</div>
                    <div className="text-right">Total</div>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="p-4 grid grid-cols-5 items-center">
                        <div className="col-span-2 flex items-center gap-3">
                          <Link to={`/product/${item.product.id}`} className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover" 
                            />
                          </Link>
                          <div>
                            <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary transition-colors">
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.product.unit}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border rounded-md">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-none" 
                              onClick={() => handleUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-none" 
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          {item.product.discountedPrice ? (
                            <div>
                              <span className="font-medium">${item.product.discountedPrice.toFixed(2)}</span>
                              <span className="text-xs text-muted-foreground line-through ml-1">
                                ${item.product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-medium">${item.product.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <div className="text-right flex items-center justify-end">
                          <span className="font-medium mr-3">
                            ${((item.product.discountedPrice || item.product.price) * item.quantity).toFixed(2)}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemoveItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-background rounded-lg border shadow-sm p-5 sticky top-20">
                  <h2 className="font-bold text-lg mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-3 border-t border-dashed">
                      <span>Total</span>
                      <span className="text-lg">${(subtotal + deliveryFee).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex gap-2 mb-2">
                      <Input 
                        placeholder="Coupon Code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={handleApplyCoupon}>Apply</Button>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <div className="mt-5 text-center">
                    <p className="text-xs text-muted-foreground">
                      By proceeding to checkout, you agree to our{' '}
                      <a href="#" className="underline">Terms of Service</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
