import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '../../data/menu';

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Omit<MenuItem, 'id'>) => Promise<void>;
    initialData?: MenuItem | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState<MenuItem['category']>('Pizza');
    const [image, setImage] = useState('');
    const [popular, setPopular] = useState(false);
    const [ingredients, setIngredients] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description);
            setPrice(initialData.price.toString());
            setCategory(initialData.category);
            setImage(initialData.image);
            setPopular(initialData.popular || false);
            setIngredients(initialData.ingredients?.join(', ') || '');
        } else {
            // Reset form
            setName('');
            setDescription('');
            setPrice('');
            setCategory('Pizza');
            setImage('');
            setPopular(false);
            setIngredients('');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave({
                name,
                description,
                price: parseFloat(price),
                category,
                image,
                popular,
                ingredients: ingredients.split(',').map(i => i.trim()).filter(i => i)
            });
            onClose();
        } catch (error) {
            console.error("Failed to save product:", error);
            alert("Failed to save product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto hidden-scrollbar relative flex flex-col shadow-2xl">
                <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-2xl font-display">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={loading}
                    >
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all font-medium"
                                placeholder="E.g., Margherita"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Price (Rs.)</label>
                            <input
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all font-medium"
                                placeholder="E.g., 1450"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            required
                            rows={3}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all font-medium resize-none"
                            placeholder="Brief description of the item"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value as MenuItem['category'])}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all font-medium bg-white"
                            >
                                <option value="Pizza">Pizza</option>
                                <option value="Burgers">Burgers</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Wings">Wings</option>
                                <option value="Sandwiches">Sandwiches</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input
                                type="url"
                                required
                                value={image}
                                onChange={e => setImage(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all font-medium"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
                        <input
                            type="text"
                            value={ingredients}
                            onChange={e => setIngredients(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all font-medium"
                            placeholder="E.g., Mozzarella, Basil, Tomato Sauce"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="popular"
                            checked={popular}
                            onChange={e => setPopular(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
                        />
                        <label htmlFor="popular" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Mark as Popular Item
                        </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 rounded-xl font-bold bg-brand-orange text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 flex items-center gap-2"
                        >
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
