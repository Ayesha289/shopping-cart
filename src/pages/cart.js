import { useEffect, useState } from 'react';
import "@/app/globals.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemMap = new Map();
    cart.forEach(item => {
      if (itemMap.has(item.id)) {
        const existingItem = itemMap.get(item.id);
        existingItem.quantity += item.quantity || 1;
      } else {
        itemMap.set(item.id, { ...item, quantity: item.quantity || 1 });
      }
    });

    const updatedCart = Array.from(itemMap.values());
    setCartItems(updatedCart);
  }, []);

  const handleDelete = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cartItems];
    const item = updatedCart[index];
    item.quantity = Math.max(item.quantity + delta, 1);

    if (item.quantity <= 0) {
      handleDelete(index);
      return;
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = (price, quantity) => price * quantity;

  const getCartTotal = () => cartItems.reduce((total, item) => total + getTotalPrice(item.price, item.quantity), 0);

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center px-4 py-10 relative">
      <Link
        href="/" 
        className="absolute top-4 left-4 text-gray-700 text-lg font-semibold hover:text-gray-500"
      >
        &lt; Back
      </Link>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-700 text-base">No items available.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          {cartItems.map((item, index) => (
            <div key={item.id} className="flex items-center mb-4 border-b pb-4 relative">
              <img
                className="w-32 h-32 object-contain mr-4"
                src={item.images[0]}
                alt={item.title}
              />
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-teal-500 font-semibold mb-2">
                  ${item.price}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  {item.description}
                </p>
                <div className="flex items-center mb-2">
                  <button
                    onClick={() => handleQuantityChange(index, -1)}
                    className="bg-gray-300 text-gray-700 py-1 px-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    &minus;
                  </button>
                  <span className="mx-2 text-lg text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(index, 1)}
                    className="bg-gray-300 text-gray-700 py-1 px-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-700 text-base font-semibold">
                  Total: ${getTotalPrice(item.price, item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
          ))}
          <div className="mt-6 bg-gray-200 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Cart Summary
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-4 border-b pb-2">
              <span className="font-bold text-gray-800">Item</span>
              <span className="font-bold text-gray-800">Price</span>
              <span className="font-bold text-gray-800">Total</span>
            </div>
            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-3 gap-4 py-2 border-b">
                <span className="text-gray-800">{item.title}</span>
                <span className="text-gray-700">${item.price.toFixed(2)} x {item.quantity}</span>
                <span className="text-gray-800">${getTotalPrice(item.price, item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-4 py-2 border-b font-bold text-gray-800 pt-2">
              <span>Total:</span>
              <span></span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
