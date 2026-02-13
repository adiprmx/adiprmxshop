import { CartProvider } from '@/context/CartContext';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Products } from '@/sections/Products';
import { CartDrawer } from '@/sections/CartDrawer';
import { RequestSection } from '@/sections/RequestSection';
import { Footer } from '@/sections/Footer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#faf8f5]">
        <Header />
        <main>
          <Hero />
          <Products />
          <RequestSection />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
