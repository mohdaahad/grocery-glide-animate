
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import CategoryList from '@/components/CategoryList';
import ProductGrid from '@/components/ProductGrid';
import FlashDeals from '@/components/FlashDeals';
import OrderTracking from '@/components/OrderTracking';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import { products } from '@/data';
import { CartItem, Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [bestsellerProducts, setBestsellerProducts] = useState<Product[]>([]);
  const [onSaleProducts, setOnSaleProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  // Filter products by category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory]);
  
  // Set bestseller and on sale products
  useEffect(() => {
    setBestsellerProducts(products.filter(product => product.isBestseller));
    setOnSaleProducts(products.filter(product => product.isOnSale));
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    
    // Show toast for category selection
    if (categoryId !== selectedCategory) {
      toast({
        title: "Category Selected",
        description: `Browsing products in selected category`,
        duration: 2000,
      });
    }
  };

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
      
      <main className="flex-grow container mx-auto px-4">
        <HeroBanner />
        
        <CategoryList 
          onSelectCategory={handleCategorySelect} 
          selectedCategory={selectedCategory}
        />
        
        <FlashDeals />
        
        {bestsellerProducts.length > 0 && (
          <ProductGrid 
            title="Bestsellers" 
            products={bestsellerProducts} 
            onAddToCart={handleAddToCart}
          />
        )}
        
        <ProductGrid 
          title={selectedCategory ? "Products" : "All Products"} 
          products={filteredProducts} 
          onAddToCart={handleAddToCart}
        />
        
        {onSaleProducts.length > 0 && (
          <ProductGrid 
            title="On Sale" 
            products={onSaleProducts} 
            onAddToCart={handleAddToCart}
          />
        )}
        
        <OrderTracking />
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

export default Index;
