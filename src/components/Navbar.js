// components/Navbar.js
import Link from 'next/link';
import { ShoppingCart } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
      setCartCount(totalCount);
    };
    updateCartCount();
    
    const handleCartUpdate = (event) => {
      setCartCount(event.detail);
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <nav className="bg-white text-gray-800 py-4 px-6 rounded-b-lg shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold hover:text-gray-600">
          ShopKart
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="flex items-center space-x-2 hover:text-gray-600">
            <ShoppingCart className="text-xl" />
            <span>View Cart</span>
            {cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-2">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
