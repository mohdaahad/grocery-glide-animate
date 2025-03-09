
import React, { useState, useEffect } from 'react';
import { flashDeals } from '@/data';
import { Timer, ArrowRight } from 'lucide-react';

const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // Set some random times for expiry based on the expiry text
    const calculateTimeLeft = () => {
      const result: {[key: string]: string} = {};
      
      flashDeals.forEach(deal => {
        let hours = 0;
        let minutes = 0;
        
        if (deal.expiresIn.includes('hours')) {
          hours = parseInt(deal.expiresIn.split(' ')[0], 10);
        } else if (deal.expiresIn.includes('Today')) {
          hours = Math.floor(Math.random() * 12) + 1;
          minutes = Math.floor(Math.random() * 59);
        } else {
          // Random time for "Limited time"
          hours = Math.floor(Math.random() * 6) + 1;
          minutes = Math.floor(Math.random() * 59);
        }
        
        result[deal.id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      });
      
      return result;
    };
    
    setTimeLeft(calculateTimeLeft());
    
    // Update the countdown every minute
    const timer = setInterval(() => {
      setTimeLeft(prevTimes => {
        const newTimes = { ...prevTimes };
        
        Object.keys(newTimes).forEach(key => {
          const [hours, minutes] = newTimes[key].split(':').map(n => parseInt(n, 10));
          
          if (hours === 0 && minutes === 0) {
            // Reset to a random new time when it hits zero
            const newHours = Math.floor(Math.random() * 6) + 1;
            const newMinutes = Math.floor(Math.random() * 59);
            newTimes[key] = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
          } else if (minutes === 0) {
            newTimes[key] = `${(hours - 1).toString().padStart(2, '0')}:59`;
          } else {
            newTimes[key] = `${hours.toString().padStart(2, '0')}:${(minutes - 1).toString().padStart(2, '0')}`;
          }
        });
        
        return newTimes;
      });
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Flash Deals</h2>
        <a href="#all-deals" className="text-primary flex items-center text-sm font-medium hover:underline">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {flashDeals.map((deal) => (
          <div 
            key={deal.id}
            className={`${deal.backgroundColor} rounded-lg p-4 text-white overflow-hidden relative group hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            
            <div className="flex items-center mb-2 space-x-2">
              <Timer className="h-5 w-5 animate-pulse" />
              <div className="font-mono bg-black/20 px-2 py-1 rounded text-sm">
                {timeLeft[deal.id] || '00:00'}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform duration-300">{deal.title}</h3>
            <p className="text-white/80 mb-3">{deal.description}</p>
            
            <button className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors duration-300">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashDeals;
