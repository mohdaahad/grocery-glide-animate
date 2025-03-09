
import React, { useState } from 'react';
import { Plus, Minus, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate adding to cart with animation
    setTimeout(() => {
      onAddToCart(product);
      setIsAdding(false);
      
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart`,
        duration: 2000,
      });
    }, 300);
  };

  return (
    <div 
      className="relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isOnSale && (
            <Badge className="bg-red-500 hover:bg-red-600 px-2 py-1">
              Sale
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-purple-500 hover:bg-purple-600 px-2 py-1">
              New
            </Badge>
          )}
          {product.isBestseller && (
            <Badge className="bg-amber-500 hover:bg-amber-600 px-2 py-1">
              Bestseller
            </Badge>
          )}
        </div>
        
        {/* Quick Add to Cart */}
        <div 
          className={`absolute right-2 bottom-2 transform transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <Button 
            size="icon" 
            className={`rounded-full shadow-md ${isAdding ? 'animate-bounce-subtle' : ''}`}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs text-muted-foreground">{product.rating}</span>
        </div>
        
        <h3 className="font-medium text-base mb-1 truncate">{product.name}</h3>
        
        <div className="flex items-baseline gap-2">
          {product.discountedPrice ? (
            <>
              <span className="font-bold text-primary">${product.discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
          <span className="text-xs text-muted-foreground">/ {product.unit}</span>
        </div>
        
        {/* Add to Cart Button - Mobile */}
        <div className="mt-3 sm:hidden">
          <Button 
            className="w-full"
            size="sm"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
