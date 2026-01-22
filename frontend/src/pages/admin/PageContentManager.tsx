import React, { useState, useEffect } from 'react';
import { Save, Upload, X } from 'lucide-react';
import api from '../../services/api';

interface PageContent {
    id?: number;
    page: string;
    section_type: string;
    title: string | null;
    content: {
        heading?: string;
        subheading?: string;
        description?: string;
        image?: string;
        button_text?: string;
        button_link?: string;
        [key: string]: any;
    };
    order: number;
    is_active: boolean;
}

const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Page' },
    { value: 'services', label: 'Services Page' },
    { value: 'e360', label: 'E360 Page' },
    { value: 'growth-marketing', label: 'Growth Marketing Page' },
    { value: 'contact', label: 'Contact Page' },
    { value: 'case-studies', label: 'Case Studies Page' },
];

const sectionTypes = [
    { value: 'hero', label: 'Hero Section' },
    { value: 'text_block', label: 'Text Block' },
    { value: 'image_text', label: 'Image + Text' },
    { value: 'cta', label: 'Call to Action' },
    { value: 'features', label: 'Features List' },
    { value: 'testimonial', label: 'Testimonial' },
    { value: 'seo', label: 'SEO Metadata' },
    { value: 'feature_grid', label: 'Feature Grid' },
    { value: 'process', label: 'Process Steps' },
];

const PageContentManager: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState('home');
    const [sections, setSections] = useState<PageContent[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchPageContent();
    }, [selectedPage]);

    const fetchPageContent = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/admin/page-sections?page=${selectedPage}`);
            setSections(response.data);
        } catch (err: any) {
            setError('Failed to fetch page content');
        } finally {
            setLoading(false);
        }
    };

    const updateSectionContent = (index: number, field: string, value: any) => {
        const updated = [...sections];
        updated[index].content = {
            ...updated[index].content,
            [field]: value,
        };
        setSections(updated);
    };

    const updateSectionField = (index: number, field: keyof PageContent, value: any) => {
        const updated = [...sections];
        (updated[index] as any)[field] = value;
        setSections(updated);
    };

    const handleImageUpload = async (index: number, file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/admin/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            updateSectionContent(index, 'image', response.data.upload.url);
            setSuccess('Image uploaded successfully');
        } catch (err: any) {
            setError('Failed to upload image');
        }
    };

    const saveAllSections = async () => {
        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            // Update each section
            for (const section of sections) {
                if (section.id) {
                    await api.put(`/admin/page-sections/${section.id}`, section);
                } else {
                    await api.post('/admin/page-sections', section);
                }
            }
            setSuccess('All changes saved successfully!');
            fetchPageContent();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const addNewSection = () => {
        const newSection: PageContent = {
            page: selectedPage,
            section_type: 'text_block',
            title: 'New Section',
            content: {
                heading: '',
                description: '',
            },
            order: sections.length,
            is_active: true,
        };
        setSections([...sections, newSection]);
    };

    const removeSection = (index: number) => {
        if (confirm('Remove this section?')) {
            setSections(sections.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Page Content Manager
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage all text, images, and content for your pages
                    </p>
                </div>
                <button
                    onClick={saveAllSections}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium"
                >
                    <Save className="w-5 h-5" />
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            {/* Alerts */}
            {error && (
                <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
                    {success}
                </div>
            )}

            {/* Page Selector */}
            <div className="mb-6 flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <label className="font-medium text-gray-700 dark:text-gray-300">Select Page:</label>
                <select
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    {pages.map((page) => (
                        <option key={page.value} value={page.value}>
                            {page.label}
                        </option>
                    ))}
                </select>
                <button
                    onClick={addNewSection}
                    className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    + Add Section
                </button>
            </div>

            {/* Content Sections */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : sections.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No content sections for this page yet.</p>
                    <button
                        onClick={addNewSection}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Create First Section
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                            {/* Section Header */}
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                        Section {index + 1}
                                    </span>
                                    <select
                                        value={section.section_type}
                                        onChange={(e) => updateSectionField(index, 'section_type', e.target.value)}
                                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                    >
                                        {sectionTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={() => removeSection(index)}
                                    className="text-red-600 hover:text-red-800 dark:text-red-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Section Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Section Title */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Section Title (Internal)
                                    </label>
                                    <input
                                        type="text"
                                        value={section.title || ''}
                                        onChange={(e) => updateSectionField(index, 'title', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="e.g., Hero Section, About Us"
                                    />
                                </div>

                                {/* SEO Fields */}
                                {section.section_type === 'seo' ? (
                                    <>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                Meta Title
                                            </label>
                                            <input
                                                type="text"
                                                value={section.content.title || ''}
                                                onChange={(e) => updateSectionContent(index, 'title', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder="Page Title | Kinative"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                Meta Description
                                            </label>
                                            <textarea
                                                value={section.content.description || ''}
                                                onChange={(e) => updateSectionContent(index, 'description', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder="Brief description for SEO"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                Meta Keywords
                                            </label>
                                            <input
                                                type="text"
                                                value={section.content.keywords || ''}
                                                onChange={(e) => updateSectionContent(index, 'keywords', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder="keyword1, keyword2, bd, usa, melbourne"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                OG Image
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer border border-gray-300 dark:border-gray-600">
                                                    <Upload className="w-4 h-4" />
                                                    Upload OG Image
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleImageUpload(index, file); // This will update 'image' by default
                                                        }}
                                                        className="hidden"
                                                    />
                                                </label>
                                                {/* Specialized upload for og_image */}
                                                <button
                                                    onClick={async () => {
                                                        const input = document.createElement('input');
                                                        input.type = 'file';
                                                        input.accept = 'image/*';
                                                        input.onchange = async (e: any) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const formData = new FormData();
                                                                formData.append('file', file);
                                                                try {
                                                                    const response = await api.post('/admin/upload', formData, {
                                                                        headers: { 'Content-Type': 'multipart/form-data' },
                                                                    });
                                                                    updateSectionContent(index, 'og_image', response.data.upload.url);
                                                                } catch (err: any) {
                                                                    setError('Failed to upload OG image');
                                                                }
                                                            }
                                                        };
                                                        input.click();
                                                    }}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                                >
                                                    Upload OG Image
                                                </button>
                                                {(section.content.og_image || section.content.image) && (
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={section.content.og_image || section.content.image}
                                                            alt="Preview"
                                                            className="w-20 h-20 object-cover rounded border border-gray-300 dark:border-gray-600"
                                                        />
                                                        <button
                                                            onClick={() => updateSectionContent(index, 'og_image', '')}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Heading */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                Heading
                                            </label>
                                            <input
                                                type="text"
                                                value={section.content.heading || ''}
                                                onChange={(e) => updateSectionContent(index, 'heading', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder="Main heading text"
                                            />
                                        </div>

                                        {/* Subheading */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                Subheading
                                            </label>
                                            <input
                                                type="text"
                                                value={section.content.subheading || ''}
                                                onChange={(e) => updateSectionContent(index, 'subheading', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder="Subtitle or tagline"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                Description
                                            </label>
                                            <textarea
                                                value={section.content.description || ''}
                                                onChange={(e) => updateSectionContent(index, 'description', e.target.value)}
                                                rows={4}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder="Main content description"
                                            />
                                        </div>

                                        {/* Image Upload */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                Image
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer border border-gray-300 dark:border-gray-600">
                                                    <Upload className="w-4 h-4" />
                                                    Upload Image
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleImageUpload(index, file);
                                                        }}
                                                        className="hidden"
                                                    />
                                                </label>
                                                {section.content.image && (
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={section.content.image}
                                                            alt="Preview"
                                                            className="w-20 h-20 object-cover rounded border border-gray-300 dark:border-gray-600"
                                                        />
                                                        <button
                                                            onClick={() => updateSectionContent(index, 'image', '')}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Button (if CTA type) */}
                                        {section.section_type === 'cta' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                        Button Text
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={section.content.button_text || ''}
                                                        onChange={(e) => updateSectionContent(index, 'button_text', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                        placeholder="Get Started"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                        Button Link
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={section.content.button_link || ''}
                                                        onChange={(e) => updateSectionContent(index, 'button_link', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                        placeholder="/contact"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}

                                {/* Order */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        value={section.order}
                                        onChange={(e) => updateSectionField(index, 'order', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>

                                {/* Active Status */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Status
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={section.is_active}
                                            onChange={(e) => updateSectionField(index, 'is_active', e.target.checked)}
                                            className="w-4 h-4 text-blue-600 rounded"
                                        />
                                        <span className="text-gray-700 dark:text-gray-300">Active</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PageContentManager;
