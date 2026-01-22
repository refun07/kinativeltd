import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload } from 'lucide-react';
import api from '../../services/api';

interface Service {
    id?: number;
    identifier: string;
    title: string;
    description: string;
    icon_path: string | null;
    category: string;
    order: number;
    is_active: boolean;
    icon_url?: string;
}

const ServiceManager: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('expertise');
    const [formData, setFormData] = useState<Service>({
        identifier: '01',
        title: '',
        description: '',
        icon_path: null,
        category: 'expertise',
        order: 0,
        is_active: true,
    });
    const [error, setError] = useState<string | null>(null);

    // Image handling
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [iconPreview, setIconPreview] = useState<string | null>(null);

    useEffect(() => {
        fetchServices();
    }, [selectedCategory]);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/admin/services?category=${selectedCategory}`);
            setServices(response.data);
        } catch (err: any) {
            setError('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setCreating(true);
        setFormData({
            identifier: String(services.length + 1).padStart(2, '0'),
            title: '',
            description: '',
            icon_path: null,
            category: selectedCategory,
            order: services.length,
            is_active: true,
        });
        setIconFile(null);
        setIconPreview(null);
    };

    const handleSubmit = async (isUpdate: boolean) => {
        const data = new FormData();
        data.append('identifier', formData.identifier);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('order', formData.order.toString());
        data.append('is_active', formData.is_active ? '1' : '0');

        if (iconFile) {
            data.append('icon_path', iconFile);
        }

        try {
            if (isUpdate && editing) {
                data.append('_method', 'PUT');
                await api.post(`/admin/services/${editing}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await api.post('/admin/services', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            setCreating(false);
            setEditing(null);
            fetchServices();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Operation failed');
        }
    };

    const startEdit = (service: Service) => {
        setEditing(service.id!);
        setFormData(service);
        setIconPreview(service.icon_url || null);
        setIconFile(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this service?")) return;
        try {
            await api.delete(`/admin/services/${id}`);
            fetchServices();
        } catch (err) {
            setError("Failed to delete");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services & Expertise</h1>
                    <p className="text-sm text-gray-500">Manage service cards for various sections</p>
                </div>
                <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="w-4 h-4" /> Add Service
                </button>
            </div>

            <div className="mb-6">
                <label className="text-sm font-medium mr-2 dark:text-gray-300">Category Filter:</label>
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="px-3 py-1.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                    <option value="expertise">Expertise (Home)</option>
                    <option value="e360">E360 Features</option>
                    <option value="growth">Growth Marketing</option>
                </select>
            </div>

            {(creating || editing) && (
                <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-4 dark:text-white">{creating ? 'New Service' : 'Edit Service'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Identifier (e.g. 01)</label>
                            <input
                                type="text"
                                value={formData.identifier}
                                onChange={e => setFormData({ ...formData, identifier: e.target.value })}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                rows={2}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Icon</label>
                            <div className="flex items-center gap-3">
                                <label className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded border cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white text-sm">
                                    Upload Icon
                                    <input type="file" className="hidden" accept="image/*" onChange={e => {
                                        if (e.target.files?.[0]) {
                                            setIconFile(e.target.files[0]);
                                            setIconPreview(URL.createObjectURL(e.target.files[0]));
                                        }
                                    }} />
                                </label>
                                {iconPreview && <img src={iconPreview} className="w-10 h-10 object-contain bg-gray-50 rounded" />}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-20 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="mt-6">
                                <label className="flex items-center gap-2 cursor-pointer dark:text-white">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                                    />
                                    Active
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                        <button onClick={() => handleSubmit(!!editing)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            <Save className="w-4 h-4" /> Save
                        </button>
                        <button onClick={() => { setCreating(false); setEditing(null); }} className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            <X className="w-4 h-4" /> Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 shadow-sm relative group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                {service.icon_url ? (
                                    <img src={service.icon_url} alt={service.title} className="w-8 h-8 object-contain" />
                                ) : (
                                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                )}
                            </div>
                            <span className="text-2xl font-bold text-gray-200 dark:text-gray-700">{service.identifier}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 dark:text-white">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{service.description}</p>

                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button onClick={() => startEdit(service)} className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(service.id!)} className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {services.length === 0 && !loading && (
                    <div className="col-span-full py-12 text-center text-gray-500 border border-dashed rounded-lg">
                        No services found in this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceManager;
