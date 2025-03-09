
import React, { useState, useEffect } from 'react';
import { currentOrder } from '@/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Package, Truck, Home, MapPin } from 'lucide-react';

const statuses = [
  { id: 'ordered', label: 'Ordered', icon: CheckCircle },
  { id: 'packed', label: 'Packed', icon: Package },
  { id: 'shipped', label: 'Shipped', icon: Clock },
  { id: 'outForDelivery', label: 'Out for Delivery', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: Home }
];

const OrderTracking = () => {
  const [progress, setProgress] = useState(0);
  
  // Find the current status index
  const currentStatusIndex = statuses.findIndex(s => s.id === currentOrder.status);
  
  useEffect(() => {
    // Set the progress percentage based on the current status
    const newProgress = ((currentStatusIndex + 1) / statuses.length) * 100;
    
    // Animate the progress
    let startProgress = 0;
    const step = newProgress / 30; // 30 steps over 1 second
    
    const interval = setInterval(() => {
      startProgress += step;
      if (startProgress >= newProgress) {
        setProgress(newProgress);
        clearInterval(interval);
      } else {
        setProgress(startProgress);
      }
    }, 33); // ~30fps
    
    return () => clearInterval(interval);
  }, [currentStatusIndex]);

  return (
    <div className="my-10 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Current Order</h2>
        <Badge variant="outline" className="font-medium">
          {currentOrder.estimatedDelivery}
        </Badge>
      </div>
      
      {/* Progress bar */}
      <div className="relative h-2 bg-background rounded-full mb-6 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Status steps */}
      <div className="flex items-center justify-between relative">
        {statuses.map((status, index) => {
          const isCompleted = index <= currentStatusIndex;
          const isCurrent = index === currentStatusIndex;
          const StatusIcon = status.icon;
          
          return (
            <div 
              key={status.id} 
              className={`flex flex-col items-center relative z-10 animate-pulse-gentle ${
                isCurrent ? 'text-primary' : isCompleted ? 'text-primary/70' : 'text-muted-foreground'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  isCurrent 
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                    : isCompleted 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                <StatusIcon className="h-4 w-4" />
              </div>
              <span className={`text-xs font-medium ${isCurrent ? 'font-bold' : ''}`}>{status.label}</span>
            </div>
          );
        })}
        
        {/* Connection lines */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted -z-0">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Map placeholder */}
      <div className="mt-8 bg-muted rounded-lg h-32 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-6 w-6 mx-auto mb-2 text-primary animate-bounce-subtle" />
            <p className="text-sm font-medium">Delivery tracking map coming soon</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button variant="outline" className="text-sm">View Details</Button>
      </div>
    </div>
  );
};

export default OrderTracking;
