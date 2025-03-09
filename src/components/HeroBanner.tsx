
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerItem {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  ctaLink: string;
  textColor: string;
}

const banners: BannerItem[] = [
  {
    id: 1,
    title: "Fresh Produce Delivered Fast",
    description: "Get fresh fruits and vegetables delivered in 10 minutes",
    buttonText: "Shop Now",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1074&auto=format&fit=crop",
    ctaLink: "#",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "50% Off Dairy Products",
    description: "Limited time offer on all milk, cheese and yogurt",
    buttonText: "View Deals",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1287&auto=format&fit=crop",
    ctaLink: "#deals",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Fresh Baked Goods",
    description: "Artisan breads and pastries baked daily",
    buttonText: "Discover",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1172&auto=format&fit=crop",
    ctaLink: "#bakery",
    textColor: "text-white"
  }
];

const HeroBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextBanner = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextBanner();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentBanner]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] mb-8">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 h-full w-full transition-all duration-500 ease-in-out ${
            index === currentBanner 
              ? 'opacity-100 translate-x-0' 
              : index < currentBanner || (currentBanner === 0 && index === banners.length - 1)
                ? 'opacity-0 -translate-x-full' 
                : 'opacity-0 translate-x-full'
          }`}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"
            style={{ backgroundImage: `url(${banner.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
          <div className="relative h-full flex flex-col justify-center px-6 md:px-12 z-20">
            <div className={`max-w-lg ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 delay-200`}>
              <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${banner.textColor}`}>{banner.title}</h2>
              <p className={`text-lg mb-4 ${banner.textColor}`}>{banner.description}</p>
              <Button 
                asChild 
                className="animate-pulse-gentle"
                variant="default"
              >
                <a href={banner.ctaLink}>{banner.buttonText}</a>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 text-white hover:bg-black/30"
        onClick={prevBanner}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 text-white hover:bg-black/30"
        onClick={nextBanner}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentBanner ? 'w-6 bg-primary' : 'w-2 bg-white/50'
            }`}
            onClick={() => setCurrentBanner(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
