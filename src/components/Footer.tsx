
import React from 'react';
import { Instagram, Twitter, Facebook, Truck, Clock, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 pt-10 pb-6">
      <div className="container mx-auto px-4">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex items-center justify-center md:justify-start gap-3 py-4 px-6 bg-background rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Deliver in 10-15 mins</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-3 py-4 px-6 bg-background rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">24/7 Service</h3>
              <p className="text-sm text-muted-foreground">Shop anytime</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-3 py-4 px-6 bg-background rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">100% secure checkout</p>
            </div>
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">GroceryGlide</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Making grocery shopping faster, easier, and more delightful with AI-powered recommendations and lightning-fast delivery.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Deals</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Orders</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping Info</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Download Our App</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the full experience with our mobile app.
            </p>
            <div className="flex flex-col space-y-2">
              <a href="#" className="bg-foreground text-background rounded-md py-2 px-4 text-sm font-medium hover:bg-foreground/90 transition-colors text-center">
                App Store
              </a>
              <a href="#" className="bg-foreground text-background rounded-md py-2 px-4 text-sm font-medium hover:bg-foreground/90 transition-colors text-center">
                Google Play
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GroceryGlide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
