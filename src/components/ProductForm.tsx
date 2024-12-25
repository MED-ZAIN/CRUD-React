import React, { useState } from 'react';
import { Product } from '../types/Product';
import { Plus, Save } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id'>) => void;
  initialProduct?: Product;
  isEdit?: boolean;
}

export default function ProductForm({ onSubmit, initialProduct, isEdit = false }: ProductFormProps) {
  const [product, setProduct] = useState({
    name: initialProduct?.name || '',
    quantity: initialProduct?.quantity || 0,
    price: initialProduct?.price || 0,
    category: initialProduct?.category || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
    if (!isEdit) {
      setProduct({ name: '', quantity: 0, price: 0, category: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom du produit
        </label>
        <input
          type="text"
          id="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantité
        </label>
        <input
          type="number"
          id="quantity"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Prix
        </label>
        <input
          type="number"
          id="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Catégorie
        </label>
        <input
          type="text"
          id="category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isEdit ? <Save className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
        {isEdit ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
}