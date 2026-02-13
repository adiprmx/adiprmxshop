import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'STYLE HAPPY TEAM',
    originalPrice: 60000,
    discountedPrice: 50000,
    sold: 18,
    image: '/images/product-1.jpg',
    description: 'Style film dengan warna ceria dan vibes positif, cocok untuk konten tim dan komunitas.',
  },
  {
    id: 2,
    name: 'STYLE BANG WAY',
    originalPrice: 80000,
    discountedPrice: 70000,
    sold: 8,
    image: '/images/product-2.jpg',
    description: 'Style film dengan tone gelap dan maskulin, perfect untuk konten street dan urban.',
  },
  {
    id: 3,
    name: 'STYLE TANTE V2 KHARIS SOPAN',
    originalPrice: 80000,
    discountedPrice: 68000,
    sold: 11,
    image: '/images/product-3.jpg',
    description: 'Style film elegan dengan sentuhan klasik, ideal untuk konten formal dan profesional.',
  },
  {
    id: 4,
    name: 'STYLE JDM GEN Z',
    originalPrice: 135000,
    discountedPrice: 105000,
    sold: 1,
    image: '/images/product-4.jpg',
    description: 'Style film dengan aesthetic JDM dan warna neon, cocok untuk konten otomotif dan lifestyle.',
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
