import { useEffect, useRef } from 'react';
import { Play, Sparkles, Zap, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const progress = Math.min(scrollY / heroHeight, 1);
      
      const headline = heroRef.current.querySelector('.hero-headline') as HTMLElement;
      const subheadline = heroRef.current.querySelector('.hero-subheadline') as HTMLElement;
      const image = heroRef.current.querySelector('.hero-image') as HTMLElement;
      
      if (headline) headline.style.transform = `translateY(${-progress * 50}px)`;
      if (subheadline) subheadline.style.transform = `translateY(${-progress * 80}px)`;
      if (image) {
        image.style.transform = `rotateY(${-progress * 10}deg) translateZ(${progress * 30}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProducts = () => {
    const element = document.querySelector('#produk');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="dashboard"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#faf8f5]"
      style={{ perspective: '1200px' }}
    >
      {/* Soft Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Gradient Orbs */}
        <div 
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#4db6ac]/10 rounded-full blur-[100px]"
          style={{ animation: 'softFloat 8s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#ffab91]/10 rounded-full blur-[80px]"
          style={{ animation: 'softFloat 10s ease-in-out infinite 2s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c8e6c9]/20 rounded-full blur-[120px]"
          style={{ animation: 'softFloat 12s ease-in-out infinite 4s' }}
        />
        
        {/* Decorative Dots */}
        <div className="absolute top-32 left-[15%] w-3 h-3 bg-[#4db6ac]/30 rounded-full" />
        <div className="absolute top-48 right-[20%] w-2 h-2 bg-[#ffab91]/40 rounded-full" />
        <div className="absolute bottom-40 left-[25%] w-2.5 h-2.5 bg-[#c8e6c9]/50 rounded-full" />
        <div className="absolute top-1/3 right-[10%] w-2 h-2 bg-[#4db6ac]/20 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-full mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#4db6ac]" />
                <span className="text-sm font-medium text-[#5a6c7d]">Premium Film Styles</span>
              </div>

              {/* Headline */}
              <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2c3e50] mb-6 leading-tight">
                <span className="block">Tingkatkan</span>
                <span className="block text-[#4db6ac]">Kualitas Video</span>
                <span className="block">Anda</span>
              </h1>

              {/* Subheadline */}
              <p className="hero-subheadline text-lg text-[#7f8c8d] mb-8 max-w-lg mx-auto lg:mx-0">
                Di sini aku menyediakan penjualan file FLM ready maupun sesuai request, serta melayani jasa remix dengan hasil yang rapi dan berkualitas.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button
                  onClick={scrollToProducts}
                  className="bg-[#4db6ac] text-white hover:bg-[#3d9e94] px-8 py-6 text-base font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#4db6ac]/20 hover:-translate-y-0.5"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Lihat Koleksi
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const element = document.querySelector('#request');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-[#e0e0e0] text-[#5a6c7d] hover:bg-[#f5f5f5] hover:border-[#4db6ac]/30 px-8 py-6 text-base font-medium rounded-full transition-all duration-300"
                >
                  Request Style
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 justify-center lg:justify-start">
                {[
                  { value: '4+', label: 'Style', icon: Zap },
                  { value: '38+', label: 'Terjual', icon: Heart },
                  { value: '100%', label: 'Puas', icon: Sparkles },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <stat.icon className="w-4 h-4 text-[#4db6ac]" />
                      <p className="text-2xl sm:text-3xl font-bold text-[#2c3e50]">
                        {stat.value}
                      </p>
                    </div>
                    <p className="text-xs text-[#95a5a6] uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="hero-image relative">
                {/* Soft Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4db6ac]/20 to-[#ffab91]/20 blur-[60px] rounded-full scale-90" />
                
                {/* Image Container */}
                <div className="relative">
                  <img
                    src="/images/hero-logo.jpg"
                    alt="mau nyolong logo gw ya jir?"
                    className="relative w-full max-w-sm lg:max-w-md rounded-3xl shadow-xl shadow-black/5"
                    style={{ animation: 'softFloat 6s ease-in-out infinite' }}
                  />
                  
                  {/* Soft Border */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#4db6ac]/30 via-transparent to-[#ffab91]/30 rounded-3xl -z-10 blur-sm" />
                </div>

                {/* Floating Badge */}
                <div 
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-lg shadow-black/5 border border-black/5"
                  style={{ animation: 'softFloat 4s ease-in-out infinite 1s' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#4db6ac]/10 rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-[#4db6ac]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2c3e50]">Best Seller</p>
                      <p className="text-xs text-[#95a5a6]">Paling diminati</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-medium text-[#95a5a6] uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-[#e0e0e0] rounded-full flex justify-center pt-2">
          <div 
            className="w-1.5 h-1.5 bg-[#4db6ac] rounded-full"
            style={{ animation: 'scrollBounce 1.5s infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes softFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(0.5deg);
          }
        }
        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
