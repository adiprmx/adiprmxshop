import { useState } from 'react';
import { Search, ShoppingCart, Play, Check, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { products, formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function Products() {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  return (
    <section
      id="produk"
      className="relative w-full py-24 lg:py-32 bg-[#faf8f5] overflow-hidden"
    >
      {/* Soft Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c8e6c9]/20 rounded-full blur-[100px]"
        />
        <div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ffab91]/10 rounded-full blur-[80px]"
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#4db6ac]" />
            <span className="text-sm font-medium text-[#5a6c7d]">Katalog Produk</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2c3e50] mb-4">
            Pilih Style <span className="text-[#4db6ac]">Premium</span>
          </h2>
          <p className="text-lg text-[#7f8c8d] max-w-xl mx-auto">
            Koleksi style film berkualitas tinggi untuk berbagai kebutuhan konten Anda
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#95a5a6] group-focus-within:text-[#4db6ac] transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Cari style film..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-6 bg-white border border-black/8 rounded-2xl text-[#2c3e50] placeholder:text-[#95a5a6] focus:border-[#4db6ac]/50 focus:ring-4 focus:ring-[#4db6ac]/10 transition-all duration-300 shadow-sm"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-[#f5f5f5]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Preview Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm border-0 text-[#2c3e50] hover:bg-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 rounded-full px-6"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-[#4db6ac] text-white font-medium border-0 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {product.sold} Terjual
                  </Badge>
                  {product.originalPrice > product.discountedPrice && (
                    <Badge className="bg-[#ffab91] text-white font-medium border-0 rounded-full">
                      {Math.round((1 - product.discountedPrice / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#2c3e50] mb-3 line-clamp-2 group-hover:text-[#4db6ac] transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm text-[#95a5a6] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xl font-bold text-[#4db6ac]">
                    {formatPrice(product.discountedPrice)}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    variant="outline"
                    className="flex-1 border border-black/10 text-[#5a6c7d] hover:text-[#2c3e50] hover:bg-[#f5f5f5] hover:border-black/15 transition-all duration-300 rounded-full"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Detail
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      addedToCart === product.id
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-[#4db6ac] text-white hover:bg-[#3d9e94]'
                    }`}
                  >
                    {addedToCart === product.id ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Ditambahkan
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Beli
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Search className="w-8 h-8 text-[#95a5a6]" />
            </div>
            <p className="text-xl text-[#5a6c7d] mb-2">Tidak ada produk ditemukan</p>
            <p className="text-[#95a5a6]">Coba kata kunci lain</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-2 border-[#e0e0e0] text-[#5a6c7d] hover:bg-[#f5f5f5] hover:border-[#4db6ac]/30 px-8 py-6 rounded-full transition-all duration-300 group"
          >
            Lihat Semua Produk
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Product Preview Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="bg-white border border-black/5 rounded-3xl max-w-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#2c3e50]">
              {selectedProduct?.name}
            </DialogTitle>
            <DialogDescription className="text-[#7f8c8d]">
              {selectedProduct?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <img
              src={selectedProduct?.image}
              alt={selectedProduct?.name}
              className="w-full rounded-2xl"
            />
            <div className="flex items-center justify-between mt-6">
              <div>
                <span className="text-sm text-[#95a5a6] line-through mr-2">
                  {selectedProduct && formatPrice(selectedProduct.originalPrice)}
                </span>
                <span className="text-2xl font-bold text-[#4db6ac]">
                  {selectedProduct && formatPrice(selectedProduct.discountedPrice)}
                </span>
              </div>
              <Button
                onClick={() => {
                  if (selectedProduct) {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }
                }}
                className="bg-[#4db6ac] text-white hover:bg-[#3d9e94] rounded-full px-6"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Tambah ke Keranjang
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
