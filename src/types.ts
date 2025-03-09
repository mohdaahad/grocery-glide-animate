
export interface Category {
  id: string;
  name: string;
  icon: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  unit: string;
  rating: number;
  isOnSale?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderStatus {
  id: string;
  status: 'ordered' | 'packed' | 'shipped' | 'outForDelivery' | 'delivered';
  estimatedDelivery: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}
