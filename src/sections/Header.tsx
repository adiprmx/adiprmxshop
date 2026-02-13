import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Beranda', href: '#dashboard', id: 'dashboard' },
    { label: 'Produk', href: '#produk', id: 'produk' },
    { label: 'Request', href: '#request', id: 'request' },
  ];

  const scrollToSection = (href: string, id: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      {/* Background */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-sm' 
            : 'bg-transparent'
        }`}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#dashboard', 'dashboard');
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 bg-[#4db6ac] rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#4db6ac]/20">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#2c3e50] tracking-tight">
                ADIP RMX
              </span>
              <span className="text-[10px] tracking-wider text-[#7f8c8d] uppercase">
                Jasa Remix
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-sm rounded-full px-1.5 py-1.5 border border-black/5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href, item.id);
                }}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-[#5a6c7d] hover:text-[#2c3e50]'
                }`}
              >
                {activeSection === item.id && (
                  <span className="absolute inset-0 bg-[#4db6ac] rounded-full" />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-black/5 hover:bg-white hover:border-[#4db6ac]/30 transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 text-[#5a6c7d] transition-colors duration-300 group-hover:text-[#4db6ac]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4db6ac] text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* CTA Button - Desktop */}
            <Button
              onClick={() => scrollToSection('#produk', 'produk')}
              className="hidden sm:flex bg-[#4db6ac] text-white hover:bg-[#3d9e94] px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#4db6ac]/20 hover:-translate-y-0.5"
            >
              Beli Sekarang
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-[#5a6c7d] hover:text-[#2c3e50] hover:bg-black/5"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#faf8f5] border-l border-black/5 w-[280px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center gap-3 p-6 border-b border-black/5">
                    <div className="w-10 h-10 bg-[#4db6ac] rounded-xl flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-[#2c3e50]">ADIP RMX</span>
                  </div>

                  {/* Mobile Nav */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-2">
                      {navItems.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.href, item.id);
                          }}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                            activeSection === item.id
                              ? 'bg-[#4db6ac] text-white'
                              : 'text-[#5a6c7d] hover:text-[#2c3e50] hover:bg-black/5'
                          }`}
                        >
                          <span className="font-medium">{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-black/5">
                    <Button
                      onClick={() => {
                        scrollToSection('#produk', 'produk');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#4db6ac] text-white hover:bg-[#3d9e94] py-6 text-base font-medium rounded-xl"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Beli Sekarang
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
