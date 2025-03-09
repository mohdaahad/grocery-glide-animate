
import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingBag, AlertCircle, Trash2 } from "lucide-react";
import { CartItem, Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) => {
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(items.length > 0 ? 2.99 : 0);
  const { toast } = useToast();

  useEffect(() => {
    // Calculate subtotal and delivery fee
    const newSubtotal = items.reduce((total, item) => {
      const price = item.product.discountedPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
    
    setSubtotal(newSubtotal);
    setDeliveryFee(items.length > 0 ? 2.99 : 0);
  }, [items]);

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Checkout functionality coming soon!",
      duration: 3000,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0">
        <SheetHeader className="px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Your Cart
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 opacity-70">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground max-w-xs mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-auto p-4">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>${(subtotal + deliveryFee).toFixed(2)}</span>
                </div>
              </div>

              <SheetFooter className="flex flex-col gap-2 sm:flex-col">
                <Button 
                  className="w-full animate-pulse-gentle" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemoveItem 
}: { 
  item: CartItem; 
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemoveItem(item.product.id);
    }, 300);
  };
  
  const handleIncrease = () => {
    onUpdateQuantity(item.product.id, item.quantity + 1);
  };
  
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.product.id, item.quantity - 1);
    } else {
      handleRemove();
    }
  };
  
  return (
    <div 
      className={`flex gap-3 py-3 border-b transition-all duration-300 ${
        isRemoving ? 'opacity-0 -translate-x-full' : 'opacity-100'
      }`}
    >
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
        <img 
          src={item.product.imageUrl} 
          alt={item.product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h4 className="font-medium text-sm">{item.product.name}</h4>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mb-2">
          {item.product.unit}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none" 
              onClick={handleDecrease}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none" 
              onClick={handleIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="text-right">
            {item.product.discountedPrice ? (
              <div>
                <span className="font-medium">${(item.product.discountedPrice * item.quantity).toFixed(2)}</span>
                <span className="text-xs text-muted-foreground line-through ml-1">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
