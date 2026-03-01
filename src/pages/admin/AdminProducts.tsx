import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Search, Database, Upload } from 'lucide-react';
import { MenuItem, MENU_ITEMS } from '../../data/menu';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/products';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { getProductImageUrl } from '../../utils/image';

export const AdminProducts: React.FC = () => {
    const [products, setProducts] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            await fetchProducts();
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert("Failed to delete product");
        }
    };

    const handleSave = async (productData: Omit<MenuItem, 'id'>) => {
        if (editingProduct) {
            await updateProduct(editingProduct.id, productData);
        } else {
            await addProduct(productData);
        }
        await fetchProducts();
    };

    const handleSeedData = async () => {
        if (!window.confirm('This will add all static menu items to the database. Continue?')) return;
        setLoading(true);
        try {
            for (const item of MENU_ITEMS) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id, ...productData } = item;
                await addProduct(productData);
            }
            await fetchProducts();
            alert("Data seeded successfully!");
        } catch (error) {
            console.error("Failed to seed data:", error);
            alert("Failed to seed data");
        } finally {
            setLoading(false);
        }
    };

    const handleSeedMissing = async () => {
        if (!window.confirm('Add any missing static items to the database?')) return;
        setLoading(true);
        try {
            const existingNames = new Set(products.map(p => p.name.trim().toLowerCase()));
            let added = 0;
            for (const item of MENU_ITEMS) {
                if (!existingNames.has(item.name.trim().toLowerCase())) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { id, ...productData } = item;
                    await addProduct(productData);
                    added++;
                }
            }
            await fetchProducts();
            alert(added > 0 ? `Added ${added} missing items.` : 'No missing items to add.');
        } catch (error) {
            console.error("Failed to add missing items:", error);
            alert("Failed to add missing items");
        } finally {
            setLoading(false);
        }
    };

    const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const content = e.target?.result as string;
                const data = JSON.parse(content);

                if (!Array.isArray(data)) {
                    throw new Error("JSON must be an array of products");
                }

                if (!window.confirm(`Are you sure you want to import ${data.length} products?`)) return;

                setLoading(true);
                let added = 0;
                let skipped = 0;

                for (const item of data) {
                    // Basic validation
                    if (!item.name || !item.category || typeof item.price !== 'number') {
                        console.warn("Skipping invalid product:", item);
                        skipped++;
                        continue;
                    }

                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { id, ...productData } = item;
                    await addProduct(productData);
                    added++;
                }

                await fetchProducts();
                alert(`Import complete! Added: ${added}, Skipped: ${skipped}`);
            } catch (error) {
                console.error("Failed to import JSON:", error);
                alert("Failed to import JSON. Please ensure the file is valid.");
            } finally {
                setLoading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        };
        reader.readAsText(file);
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display mb-2">Products Management</h1>
                    <p className="text-gray-500">Manage your menu items, categories, and prices.</p>
                </div>
                <div className="flex items-center gap-3">
                    {products.length === 0 && !loading && (
                        <button
                            onClick={handleSeedData}
                            className="bg-brand-yellow text-brand-dark px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors"
                        >
                            <Database size={20} />
                            Seed Initial Data
                        </button>
                    )}
                    {products.length > 0 && !loading && (
                        <button
                            onClick={handleSeedMissing}
                            className="bg-white text-brand-dark px-4 py-2.5 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-colors"
                            title="Add items from the static list that are not yet in the database"
                        >
                            Add Missing Items
                        </button>
                    )}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white text-brand-dark px-4 py-2.5 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        title="Import products from a JSON file"
                    >
                        <Upload size={20} />
                        Import JSON
                    </button>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setIsModalOpen(true);
                        }}
                        className="bg-brand-orange text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-lg shadow-brand-orange/30"
                    >
                        <Plus size={20} />
                        Add Product
                    </button>
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportJSON}
                accept=".json"
                className="hidden"
            />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand-orange/50 transition-all text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        Loading products...
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                                                    {product.image ? (
                                                        <img src={getProductImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <ImageIcon size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 group-hover:text-brand-orange transition-colors">{product.name}</p>
                                                    <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-gray-100 text-gray-700">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold">
                                            Rs. {product.price.toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            {product.popular && (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-yellow/20 text-brand-dark">
                                                    Popular
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2 text-gray-400">
                                                <button
                                                    onClick={() => {
                                                        setEditingProduct(product);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                }}
                onSave={handleSave}
                initialData={editingProduct}
            />
        </div >
    );
};
