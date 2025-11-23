import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Search, Plus, Filter, Edit, Trash2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/dataService';

const getStockColor = (status: string) => {
  switch (status) {
    case 'In Stock': return 'text-green-600 bg-green-50';
    case 'Low Stock': return 'text-orange-600 bg-orange-50';
    case 'Out of Stock': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Inventory
            {loading && <Loader2 size={18} className="animate-spin text-indigo-500" />}
          </h2>
          <p className="text-gray-500">Manage your products and stock levels.</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center shadow-sm">
                <Filter size={16} className="mr-2" />
                Filter
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-sm">
                <Plus size={18} className="mr-2" />
                Add Product
            </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors"
            />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 h-80 animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                        <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                        <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
                <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
                >
                    <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                        <span className="text-gray-400 text-4xl">📦</span>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                            <button className="p-2 bg-white rounded-full text-gray-700 hover:text-indigo-600"><Edit size={18} /></button>
                            <button className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600"><Trash2 size={18} /></button>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{product.category}</span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStockColor(product.status)}`}>{product.status}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">SKU: {product.id}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-lg font-bold text-gray-900">{product.price}</span>
                            <span className="text-sm text-gray-500">{product.stock} units</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;