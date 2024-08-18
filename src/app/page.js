'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=48');
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="py-10 px-4">
        <div className="container mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              images={product.images}
              description={product.description}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-500 disabled:bg-gray-400 transition-colors duration-300"
          >
            Previous
          </button>
          <span className="mx-4 text-lg text-black">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-500 disabled:bg-gray-400 transition-colors duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
