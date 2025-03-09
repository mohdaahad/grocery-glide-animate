
import React, { useState } from 'react';
import { categories } from '@/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data';
import { CartItem, Product } from '@/types';
import Cart from '@/components/Cart';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter products by category
  React.useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
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

  // Get icon component from Lucide icons
  const getIconComponent = (iconName: string): LucideIcon => {
    return (LucideIcons as any)[iconName] || LucideIcons.ShoppingCart;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
          {categories.map((category) => {
            const Icon = getIconComponent(category.icon);
            const isSelected = selectedCategory === category.id;
            
            return (
              <div 
                key={category.id}
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-105' : 'hover:scale-105'
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div 
                  className={`rounded-lg overflow-hidden aspect-square mb-2 relative ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img 
                    src={category.imageUrl} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className={`p-3 rounded-full ${
                      isSelected ? 'bg-primary text-white' : 'bg-white/80 text-primary'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <p className={`text-center font-medium ${
                  isSelected ? 'text-primary' : ''
                }`}>
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>
        
        {selectedCategory ? (
          <ProductGrid 
            title={`${categories.find(c => c.id === selectedCategory)?.name || ''} Products`}
            products={filteredProducts} 
            onAddToCart={handleAddToCart}
          />
        ) : (
          <div className="text-center p-8 bg-muted rounded-lg">
            <p className="text-lg">Please select a category to view products</p>
          </div>
        )}
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

export default Categories;
