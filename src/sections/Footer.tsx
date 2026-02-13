import { Leaf, Instagram, Youtube, MessageCircle, Music2, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/adip.ori', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/adippangkiii', label: 'YouTube' },
    { icon: MessageCircle, href: 'https://wa.me/qr/2O4QW5T72IBHI1', label: 'WhatsApp' },
    { icon: Music2, href: 'https://tiktok.com/adiprmx', label: 'TikTok' },
  ];

  const navLinks = [
    { label: 'Beranda', href: '#dashboard' },
    { label: 'Produk', href: '#produk' },
    { label: 'Request', href: '#request' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-white overflow-hidden">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4db6ac]/30 to-transparent" />

      {/* Soft Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#4db6ac]/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="w-full px-4 sm:px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-center">
            {/* Logo & Description */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="w-10 h-10 bg-[#4db6ac] rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-[#2c3e50] block">
                    ADIP RMX
                  </span>
                  <span className="text-xs tracking-wider text-[#95a5a6] uppercase">
                    Jasa Remix
                  </span>
                </div>
              </div>
              <p className="text-[#7f8c8d] text-sm max-w-xs mx-auto lg:mx-0">
                Koleksi preset flm untuk meningkatkan skill Anda.
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-[#7f8c8d] hover:text-[#4db6ac] font-medium transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#4db6ac] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-end gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-[#f8f9fa] hover:bg-[#4db6ac]/10 rounded-xl flex items-center justify-center text-[#95a5a6] hover:text-[#4db6ac] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/5">
          <div className="w-full px-4 sm:px-6 lg:px-12 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[#95a5a6] text-sm">
                © {currentYear} ADIP RMX. All rights reserved.
              </p>
              
              <div className="flex items-center gap-4">
                <p className="text-[#bdc3c7] text-xs">
                  Remixer Bogor
                </p>
                <Button
                  onClick={scrollToTop}
                  size="icon"
                  className="w-9 h-9 bg-[#f8f9fa] hover:bg-[#4db6ac]/10 text-[#95a5a6] hover:text-[#4db6ac] rounded-xl transition-all duration-300"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
