
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CartItem } from '@/types';
import Cart from '@/components/Cart';
import { User, MapPin, CreditCard, Settings, Bell, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  
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
  
  const handleSaveChanges = () => {
    toast({
      title: "Success",
      description: "Your profile has been updated",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="col-span-1">
              <div className="bg-background p-4 rounded-lg border shadow-sm mb-4">
                <div className="flex flex-col items-center py-4">
                  <Avatar className="h-20 w-20 mb-2">
                    <AvatarFallback className="bg-primary text-white text-xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">John Doe</h3>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              
              <div className="bg-background rounded-lg border shadow-sm">
                <div className="p-2">
                  <nav className="space-y-1">
                    {[
                      { icon: User, label: 'Personal Info', active: true },
                      { icon: MapPin, label: 'Addresses' },
                      { icon: CreditCard, label: 'Payment Methods' },
                      { icon: Bell, label: 'Notifications' },
                      { icon: Settings, label: 'Settings' },
                    ].map((item) => (
                      <a 
                        key={item.label}
                        href="#"
                        className={`flex items-center px-3 py-2 text-sm rounded-md ${item.active 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="p-2 border-t">
                  <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-muted">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </a>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="col-span-1 md:col-span-3">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-6">
                  <div className="bg-background p-6 rounded-lg border shadow-sm">
                    <h2 className="font-semibold text-lg mb-4">Basic Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                    
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-6">
                  <div className="bg-background p-6 rounded-lg border shadow-sm">
                    <h2 className="font-semibold text-lg mb-4">Shopping Preferences</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="defaultCategory">Default Category</Label>
                        <select id="defaultCategory" className="w-full border rounded-md p-2">
                          <option>All Categories</option>
                          <option>Fruits</option>
                          <option>Vegetables</option>
                          <option>Dairy</option>
                          <option>Bakery</option>
                        </select>
                      </div>
                      
                      {/* More preferences */}
                    </div>
                    
                    <Button onClick={handleSaveChanges}>Save Preferences</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6">
                  <div className="bg-background p-6 rounded-lg border shadow-sm">
                    <h2 className="font-semibold text-lg mb-4">Change Password</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                    
                    <Button onClick={handleSaveChanges}>Update Password</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
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

export default Profile;
