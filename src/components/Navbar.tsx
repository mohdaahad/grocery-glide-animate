
import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Navbar = ({ cartItemsCount = 0, onCartClick }: { cartItemsCount: number; onCartClick: () => void }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { toast } = useToast();
  
  const handleVoiceSearch = () => {
    toast({
      title: "Voice Search",
      description: "Voice search is coming soon!",
      duration: 3000,
    });
  };

  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild className="block md:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="#" className="px-2 py-1 rounded-md hover:bg-accent transition-colors">Home</a>
                  <a href="#" className="px-2 py-1 rounded-md hover:bg-accent transition-colors">Categories</a>
                  <a href="#" className="px-2 py-1 rounded-md hover:bg-accent transition-colors">Deals</a>
                  <a href="#" className="px-2 py-1 rounded-md hover:bg-accent transition-colors">My Orders</a>
                  <a href="#" className="px-2 py-1 rounded-md hover:bg-accent transition-colors">Settings</a>
                </nav>
              </SheetContent>
            </Sheet>
            <a href="/" className="flex items-center">
              <span className="text-primary text-xl font-bold">GroceryGlide</span>
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center relative flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Input
                placeholder="Search for groceries..."
                className="w-full pl-10 pr-10 py-2 rounded-full border-primary/20 focus-visible:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={handleVoiceSearch}
              >
                <Mic className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className={`absolute inset-x-0 top-0 ${isSearchActive ? 'h-full' : 'h-0'} overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-md z-10`}>
            {isSearchActive && (
              <div className="container mx-auto p-4 flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsSearchActive(false)}
                  className="mr-2"
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="relative w-full">
                  <Input
                    placeholder="Search for groceries..."
                    className="w-full pl-10 pr-10 py-2 rounded-full"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    onClick={handleVoiceSearch}
                  >
                    <Mic className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchActive(true)}>
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            
            <Avatar className="h-8 w-8 transition-transform hover:scale-110">
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6 mt-1">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Categories</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Deals</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">My Orders</a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
