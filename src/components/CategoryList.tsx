
import React, { useRef } from 'react';
import { categories } from '@/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface CategoryListProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string | null;
}

const CategoryList = ({ onSelectCategory, selectedCategory }: CategoryListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 200;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Get icon component from Lucide icons
  const getIconComponent = (iconName: string): LucideIcon => {
    return (LucideIcons as any)[iconName] || LucideIcons.ShoppingCart;
  };

  return (
    <div className="relative my-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      
      <div className="relative">
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background rounded-full shadow-md"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none gap-4 py-2 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => {
            const Icon = getIconComponent(category.icon);
            return (
              <div 
                key={category.id}
                className={`flex-shrink-0 w-[110px] cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'scale-105' 
                    : 'hover:scale-105'
                }`}
                onClick={() => onSelectCategory(category.id)}
              >
                <div 
                  className={`rounded-lg overflow-hidden aspect-square mb-2 relative ${
                    selectedCategory === category.id 
                      ? 'ring-2 ring-primary' 
                      : ''
                  }`}
                >
                  <img 
                    src={category.imageUrl} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className={`p-2 rounded-full bg-white/80 ${
                      selectedCategory === category.id 
                        ? 'bg-primary text-white' 
                        : 'text-primary'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <p className={`text-sm font-medium text-center truncate ${
                  selectedCategory === category.id ? 'text-primary' : ''
                }`}>
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background rounded-full shadow-md"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CategoryList;
