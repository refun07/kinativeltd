import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload, ArrowUp, ArrowDown } from 'lucide-react';
import api from '../../services/api';

interface HeroSlide {
    id?: number;
    title: string;
    subtitle: string;
    description: string;
    button_text: string;
    button_link: string;
    background_image: string | null;
    page: string;
    order: number;
    is_active: boolean;
}

const HeroSlideManager: React.FC = () => {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);
    const [selectedPage, setSelectedPage] = useState('home');
    const [formData, setFormData] = useState<HeroSlide>({
        title: '',
        subtitle: '',
        description: '',
        button_text: '',
        button_link: '',
        background_image: null,
        page: 'home',
        order: 0,
        is_active: true,
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSlides();
    }, [selectedPage]);

    const fetchSlides = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/admin/hero-slides?page_filter=${selectedPage}`);
            setSlides(response.data);
        } catch (err: any) {
            setError('Failed to fetch slides');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            if (!formData.background_image) {
                setError('Background image is required');
                return;
            }
            // For creating, we send the fields. Image is handled via separate upload or if backend supports base64/url
            // The current backend controller expects 'background_image' as file for upload or string path?
            // Let's check the controller. It expects 'background_image' to be a file in the request if it's an upload.
            // But here `formData.background_image` might be a URL string if we used the upload endpoint first.
            // Actually, my `handleImageUpload` uploads to `/admin/upload` and gets a URL.
            // But the `HeroSlideController` store method expects `background_image` to be a FILE for upload.
            // OR it should accept a string path if specifically handled.
            // Let's look at `HeroSlideController`.
            // It says: `if ($request->hasFile('background_image')) { ... store ... }`
            // It validates `background_image` as `nullable|image|max:5120`. 
            // This means it ONLY accepts a file upload directly in the specific store/update endpoint, 
            // OR we need to modify it to accept a string path if pre-uploaded.
            // The `PageContentManager` used `/admin/upload` generic endpoint.
            // To keep it simple and consistent with `PageContentManager`, I should probably adjust the formData construction 
            // to send a FILE object if it's a new upload, or handle it via FormData.

            // Let's change the approach to use FormData for the submit
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'background_image') {
                    // If it's a file object (we'll store file in a temp state), append it
                    // But here formData.background_image is string.
                    // Let's use a separate file state.
                } else {
                    data.append(key, (formData as any)[key]);
                }
            });
            // This is getting complicated with types.
            // Let's stick to the pattern: Upload image first -> get URL? 
            // No, `HeroSlideController` logic:
            // $request->validate([ 'background_image' => 'nullable|image|max:5120' ]);
            // This forces it to be an image file.
            // So I MUST send 'multipart/form-data'.
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create slide');
        }
    };

    // Improved Image Handling State
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSubmit = async (isUpdate: boolean) => {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('subtitle', formData.subtitle || '');
        data.append('description', formData.description || '');
        data.append('button_text', formData.button_text || '');
        data.append('button_link', formData.button_link || '');
        data.append('page', formData.page);
        data.append('order', formData.order.toString());
        data.append('is_active', formData.is_active ? '1' : '0');

        if (imageFile) {
            data.append('background_image', imageFile);
        }
        // If update and no new image, we don't send background_image, backend keeps old one.

        try {
            if (isUpdate && editing) {
                // For update, we append _method=PUT to simulate PUT with FormData
                data.append('_method', 'PUT');
                await api.post(`/admin/hero-slides/${editing}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await api.post('/admin/hero-slides', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            setCreating(false);
            setEditing(null);
            resetForm();
            fetchSlides();
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Operation failed');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            subtitle: '',
            description: '',
            button_text: '',
            button_link: '',
            background_image: null,
            page: selectedPage,
            order: 0,
            is_active: true,
        });
        setImageFile(null);
        setImagePreview(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this slide?')) return;
        try {
            await api.delete(`/admin/hero-slides/${id}`);
            fetchSlides();
        } catch (err: any) {
            setError('Failed to delete slide');
        }
    };

    const startEdit = (slide: HeroSlide) => {
        setEditing(slide.id!);
        setFormData(slide);
        setImagePreview(slide.background_image ? `/storage/${slide.background_image}` : null); // Adjust path logic depending on API response
        // The API accessor `image_url` might be cleaner, but let's assume `background_image` is the path
        // Actually, Model has `getImageUrlAttribute`. So API response likely has `image_url`.
        // Let's check fetched data logging or assume `image_url` exists.
        // The interface above uses `background_image`, let's add `image_url` to it for display.
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Slider Manager</h1>
                    <p className="text-sm text-gray-500">Manage hero slides for each page</p>
                </div>
                <button
                    onClick={() => { setCreating(true); resetForm(); }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4" /> Add Slide
                </button>
            </div>

            <div className="mb-6 flex gap-4">
                <select
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                    <option value="home">Home Page</option>
                    <option value="about">About Page</option>
                    <option value="services">Services Page</option>
                    <option value="e360">E360 Page</option>
                </select>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

            {(creating || editing) && (
                <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-4 dark:text-white">{creating ? 'Create New Slide' : 'Edit Slide'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Button Text</label>
                            <input
                                type="text"
                                value={formData.button_text}
                                onChange={e => setFormData({ ...formData, button_text: e.target.value })}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Button Link</label>
                            <input
                                type="text"
                                value={formData.button_link}
                                onChange={e => setFormData({ ...formData, button_link: e.target.value })}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Background Image</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded border cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white">
                                    <Upload className="w-4 h-4" /> Choose Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={e => {
                                            if (e.target.files?.[0]) {
                                                setImageFile(e.target.files[0]);
                                                setImagePreview(URL.createObjectURL(e.target.files[0]));
                                            }
                                        }}
                                    />
                                </label>
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="h-20 w-32 object-cover rounded border" />
                                )}
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
                            <div className="flex items-center mt-6">
                                <label className="flex items-center gap-2 cursor-pointer dark:text-white">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    Active
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                        <button
                            onClick={() => handleSubmit(!!editing)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            <Save className="w-4 h-4" /> Save Slide
                        </button>
                        <button
                            onClick={() => { setCreating(false); setEditing(null); }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            <X className="w-4 h-4" /> Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Slides List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map(slide => (
                    <div key={slide.id} className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden shadow-sm group">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                            {(slide as any).image_url ? (
                                <img src={(slide as any).image_url} alt={slide.title} className="w-full h-full object-cover" />
                            ) : slide.background_image ? (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">Image Path Only: {slide.background_image}</div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-1 bg-black/50 p-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEdit(slide)} className="p-1.5 text-blue-400 hover:text-blue-300"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(slide.id!)} className="p-1.5 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                            </div>
                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">
                                Order: {slide.order}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg dark:text-white truncate">{slide.title}</h3>
                                <span className={`px-2 py-0.5 text-xs rounded-full ${slide.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {slide.is_active ? 'Active' : 'Hidden'}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{slide.subtitle}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{slide.description}</p>

                            {slide.button_text && (
                                <span className="text-xs px-2 py-1 border border-blue-200 text-blue-600 rounded bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                                    CTA: {slide.button_text}
                                </span>
                            )}
                        </div>
                    </div>
                ))}

                {slides.length === 0 && !loading && (
                    <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed dark:border-gray-700">
                        No slides found for {selectedPage} page. Add one to get started!
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSlideManager;
