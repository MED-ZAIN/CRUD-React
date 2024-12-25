import React, { useState } from 'react';
import { Product } from './types/Product';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { Package } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: crypto.randomUUID(),
    };
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-center mb-8">
            <Package className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Gestion de Stock</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
                  </h2>
                  <ProductForm
                    onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                    initialProduct={editingProduct || undefined}
                    isEdit={!!editingProduct}
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Liste des produits</h2>
                  {products.length > 0 ? (
                    <ProductList
                      products={products}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
                    />
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Aucun produit dans le stock. Ajoutez-en un !
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;