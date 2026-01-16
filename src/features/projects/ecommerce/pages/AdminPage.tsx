import { useState } from 'react';
import { useGetProductsQuery } from '../services/productsApi';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';

export default function AdminPage() {
  const { data: productsData, isLoading } = useGetProductsQuery({});
  const [searchTerm, setSearchTerm] = useState('');

  const products = productsData?.data || [];
  
  const filteredProducts = products.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
      if (confirm('¿Estás seguro de que quieres eliminar este producto? (Simulación)')) {
          alert(`Producto ${id} eliminado (Simulación)`);
      }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Panel de Administración</h1>
            <p className="text-slate-500">Gestión de inventario y productos</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200">
            <Plus className="w-5 h-5" />
            Nuevo Producto
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex gap-4 bg-slate-50 dark:bg-slate-800/50">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Buscar productos..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase font-medium">
                    <tr>
                        <th className="px-6 py-4">Producto</th>
                        <th className="px-6 py-4">Categoría</th>
                        <th className="px-6 py-4">Precio</th>
                        <th className="px-6 py-4">Rating</th>
                        <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {isLoading ? (
                        <tr><td colSpan={5} className="p-8 text-center">Cargando inventario...</td></tr>
                    ) : filteredProducts?.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 p-1 flex-shrink-0">
                                        <img src={product.image} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="font-medium text-slate-900 dark:text-white line-clamp-1 max-w-[200px]">{product.title}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs font-medium border border-slate-200 dark:border-slate-700">
                                    {product.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                ${product.price}
                            </td>
                            <td className="px-6 py-4 text-slate-500">
                                ⭐ {product.rating.rate} ({product.rating.count})
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                        title="Eliminar"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {!isLoading && filteredProducts?.length === 0 && (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                <Package className="w-12 h-12 mb-4 opacity-50" />
                No se encontraron productos
            </div>
        )}
      </div>
    </div>
  );
}
