import { useState } from 'react';
import ProductModal from './ProductModal'; 

export default function ProductCard({ id, title, price, images, description }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        onClick={openModal} 
        className="block max-w-sm rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer transition-transform transform hover:scale-105"
      >
        <div className="relative w-full h-50">
          <img
            className="object-contain w-full h-full"
            src={images[0]}
            alt={title}
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {title}
          </h2>
          <p className="text-lg font-bold text-teal-500">
            ${price}
          </p>
        </div>
      </div>
      {isModalOpen && (
        <ProductModal 
          id={id}
          title={title} 
          price={price} 
          images={images} 
          description={description}
          onClose={closeModal}
        />
      )}
    </>
  );
}
