import Carousel from './Carousel';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ id, title, price, images, description, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleAddToCart = async () => {
    const product = { id, title, price, images, description, quantity };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
    const event = new CustomEvent('cartUpdated', { detail: totalCount });
    window.dispatchEvent(event);
    alert('Successfully added item to cart!');
    onClose();
  };

  const handleBuyNow = () => {
    const product = { id, title, price, images, description, quantity };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    onClose();
    router.push('/cart');
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(Math.max(quantity - 1, 1));

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-4/5">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <Carousel images={images} />
        <div className="mt-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            {title}
          </h1>
          <p className="text-2xl font-semibold text-teal-500 mb-4">
            ${price}
          </p>
          <div className="text-gray-700 text-base mb-4">
            {description}
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
