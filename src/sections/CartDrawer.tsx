import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function CartDrawer() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);

  const generateWhatsAppMessage = () => {
    const itemsList = cartItems
      .map(
        (item) =>
          `- ${item.name} (${item.quantity}x) = ${formatPrice(item.discountedPrice * item.quantity)}`
      )
      .join('\n');

    const message = `Halo ADIP RMX!

Saya ingin memesan:
${itemsList}

Total: ${formatPrice(totalPrice)}

Mohon informasi cara pembayaran dan pengiriman jasa remixnya. Terima kasih!`;

    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    const phoneNumber = '6285893523975';
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setShowCheckoutDialog(false);
    setIsCartOpen(false);
  };

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="bg-[#faf8f5] border-l border-black/5 w-full sm:max-w-lg flex flex-col rounded-l-3xl">
          <SheetHeader className="pb-4 border-b border-black/5">
            <SheetTitle className="text-xl font-bold text-[#2c3e50] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4db6ac]/10 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#4db6ac]" />
              </div>
              <div>
                <span>Keranjang</span>
                {totalItems > 0 && (
                  <span className="text-sm font-normal text-[#95a5a6] ml-2">
                    ({totalItems} item)
                  </span>
                )}
              </div>
            </SheetTitle>
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <ShoppingBag className="w-10 h-10 text-[#95a5a6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">Keranjang Kosong</h3>
              <p className="text-[#95a5a6] mb-6">Belum ada produk yang ditambahkan</p>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#4db6ac] text-white hover:bg-[#3d9e94] rounded-full"
              >
                Lihat Produk
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-2xl border border-black/5 shadow-sm"
                  >
                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-xl"
                    />

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#2c3e50] text-sm mb-1 line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-lg font-bold text-[#4db6ac] mb-3">
                        {formatPrice(item.discountedPrice)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-[#f5f5f5] hover:bg-[#e8e8e8] rounded-lg transition-colors"
                          >
                            <Minus className="w-3 h-3 text-[#5a6c7d]" />
                          </button>
                          <span className="w-8 text-center font-medium text-[#2c3e50]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-[#f5f5f5] hover:bg-[#e8e8e8] rounded-lg transition-colors"
                          >
                            <Plus className="w-3 h-3 text-[#5a6c7d]" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-black/5" />

              {/* Cart Footer */}
              <div className="pt-4 space-y-4">
                {/* Summary */}
                <div className="space-y-3 bg-white rounded-2xl p-4 border border-black/5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#95a5a6]">Subtotal</span>
                    <span className="font-medium text-[#2c3e50]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#95a5a6]">Diskon</span>
                    <span className="font-medium text-green-500">
                      -{formatPrice(
                        cartItems.reduce(
                          (sum, item) =>
                            sum + (item.originalPrice - item.discountedPrice) * item.quantity,
                          0
                        )
                      )}
                    </span>
                  </div>
                  <Separator className="bg-black/5" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#2c3e50]">Total</span>
                    <span className="text-2xl font-bold text-[#4db6ac]">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={() => setShowCheckoutDialog(true)}
                    className="w-full bg-[#25d366] hover:bg-[#128c7e] text-white py-6 text-base font-medium rounded-full transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Checkout via WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full border border-red-200 text-red-400 hover:bg-red-50 hover:border-red-300 rounded-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Kosongkan Keranjang
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Checkout Confirmation Dialog */}
      <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
        <DialogContent className="bg-white border border-black/5 rounded-3xl max-w-md shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#2c3e50] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#25d366]/10 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#25d366]" />
              </div>
              Konfirmasi Checkout
            </DialogTitle>
            <DialogDescription className="text-[#7f8c8d]">
              Pesanan Anda akan dikirim melalui WhatsApp. Pastikan data pesanan sudah benar.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {/* Order Summary */}
            <div className="bg-[#f8f9fa] rounded-2xl p-4 space-y-2 max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#5a6c7d]">
                    {item.name} ({item.quantity}x)
                  </span>
                  <span className="font-medium text-[#2c3e50]">
                    {formatPrice(item.discountedPrice * item.quantity)}
                  </span>
                </div>
              ))}
              <Separator className="bg-black/5" />
              <div className="flex justify-between">
                <span className="font-semibold text-[#2c3e50]">Total</span>
                <span className="text-xl font-bold text-[#4db6ac]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Preview Message */}
            <div className="bg-[#f8f9fa] rounded-2xl p-4">
              <p className="text-xs text-[#95a5a6] mb-2">Preview Pesan:</p>
              <p className="text-sm text-[#5a6c7d] whitespace-pre-line line-clamp-4">
                {decodeURIComponent(generateWhatsAppMessage())}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCheckoutDialog(false)}
                className="flex-1 border border-black/10 text-[#5a6c7d] hover:bg-[#f5f5f5] rounded-full"
              >
                <X className="w-4 h-4 mr-2" />
                Batal
              </Button>
              <Button
                onClick={handleCheckout}
                className="flex-1 bg-[#25d366] hover:bg-[#128c7e] text-white rounded-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Kirim ke WhatsApp
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
