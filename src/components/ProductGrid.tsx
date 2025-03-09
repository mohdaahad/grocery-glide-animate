
import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, title, onAddToCart }: ProductGridProps) => {
  return (
    <div className="my-8">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
