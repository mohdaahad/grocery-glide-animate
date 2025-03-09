
import { Category, Product, OrderStatus } from "./types";
import { ShoppingBasket, Apple, Carrot, Coffee, Beef, Milk, Cookie, Fish } from "lucide-react";

export const categories: Category[] = [
  {
    id: "fruits",
    name: "Fruits",
    icon: "Apple",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: "vegetables",
    name: "Vegetables",
    icon: "Carrot",
    imageUrl: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=1169&auto=format&fit=crop"
  },
  {
    id: "dairy",
    name: "Dairy",
    icon: "Milk",
    imageUrl: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: "bakery",
    name: "Bakery",
    icon: "Cookie",
    imageUrl: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1080&auto=format&fit=crop"
  },
  {
    id: "meat",
    name: "Meat",
    icon: "Beef",
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: "seafood",
    name: "Seafood",
    icon: "Fish",
    imageUrl: "https://images.unsplash.com/photo-1611089676913-93a1129ebc51?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "Coffee",
    imageUrl: "https://images.unsplash.com/photo-1544252890-c3e4b249fdff?q=80&w=1170&auto=format&fit=crop"
  }
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Organic Bananas",
    description: "Sweet and fresh organic bananas, perfect for smoothies or a healthy snack.",
    price: 2.99,
    discountedPrice: 1.99,
    imageUrl: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1374&auto=format&fit=crop",
    category: "fruits",
    inStock: true,
    unit: "bunch",
    rating: 4.8,
    isOnSale: true,
    isBestseller: true
  },
  {
    id: "prod-2",
    name: "Fresh Avocados",
    description: "Ripe and creamy avocados, rich in healthy fats and perfect for guacamole.",
    price: 3.49,
    imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1075&auto=format&fit=crop",
    category: "fruits",
    inStock: true,
    unit: "each",
    rating: 4.6,
    isNew: true
  },
  {
    id: "prod-3",
    name: "Red Apples",
    description: "Crisp and juicy red apples, full of flavor and nutrients.",
    price: 1.49,
    imageUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=1170&auto=format&fit=crop",
    category: "fruits",
    inStock: true,
    unit: "lb",
    rating: 4.5
  },
  {
    id: "prod-4",
    name: "Fresh Broccoli",
    description: "Crisp and nutritious broccoli florets, perfect for stir-fries or steaming.",
    price: 2.29,
    discountedPrice: 1.89,
    imageUrl: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=1074&auto=format&fit=crop",
    category: "vegetables",
    inStock: true,
    unit: "bunch",
    rating: 4.3,
    isOnSale: true
  },
  {
    id: "prod-5",
    name: "Organic Carrots",
    description: "Sweet and crunchy organic carrots, rich in beta-carotene.",
    price: 1.99,
    imageUrl: "https://images.unsplash.com/photo-1447175008436-054170c2e979?q=80&w=1142&auto=format&fit=crop",
    category: "vegetables",
    inStock: true,
    unit: "bunch",
    rating: 4.7,
    isBestseller: true
  },
  {
    id: "prod-6",
    name: "Full-Fat Milk",
    description: "Creamy full-fat milk from grass-fed cows, rich and nutritious.",
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1287&auto=format&fit=crop",
    category: "dairy",
    inStock: true,
    unit: "gallon",
    rating: 4.4
  },
  {
    id: "prod-7",
    name: "Artisan Sourdough Bread",
    description: "Freshly baked artisan sourdough bread with a crispy crust and chewy interior.",
    price: 5.99,
    imageUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=1170&auto=format&fit=crop",
    category: "bakery",
    inStock: true,
    unit: "loaf",
    rating: 4.9,
    isNew: true
  },
  {
    id: "prod-8",
    name: "Premium Ground Beef",
    description: "Lean ground beef from grass-fed cattle, perfect for burgers and meatballs.",
    price: 7.99,
    discountedPrice: 6.99,
    imageUrl: "https://images.unsplash.com/photo-1602470521006-6b8b64da42e7?q=80&w=1170&auto=format&fit=crop",
    category: "meat",
    inStock: true,
    unit: "lb",
    rating: 4.6,
    isOnSale: true
  }
];

export const currentOrder: OrderStatus = {
  id: "order-123456",
  status: "packed",
  estimatedDelivery: "Today, 6:30 PM",
  currentLocation: {
    lat: 37.7749,
    lng: -122.4194
  }
};

export const flashDeals = [
  {
    id: "deal-1",
    title: "Flash Sale! 50% Off",
    description: "Limited time offer on fresh produce",
    backgroundColor: "bg-gradient-to-r from-purple-500 to-indigo-500",
    expiresIn: "3 hours"
  },
  {
    id: "deal-2",
    title: "Buy 1 Get 1 Free",
    description: "On all dairy products",
    backgroundColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    expiresIn: "Today only"
  },
  {
    id: "deal-3",
    title: "Free Delivery",
    description: "On orders above $25",
    backgroundColor: "bg-gradient-to-r from-orange-500 to-amber-500",
    expiresIn: "Limited time"
  }
];
