import React, { useState, useEffect } from 'react';
import { Upload, X, File, Download, Trash2 } from 'lucide-react';
import api from '../services/api';

interface UploadedFile {
    id: number;
    filename: string;
    original_filename: string;
    url: string;
    mime_type: string;
    size: number;
    created_at: string;
    user?: {
        name: string;
        email: string;
    };
}

const AdminUpload: React.FC = () => {
    const [uploads, setUploads] = useState<UploadedFile[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchUploads();
    }, []);

    const fetchUploads = async () => {
        try {
            const response = await api.get('/admin/uploads');
            setUploads(response.data.data || []);
        } catch (err: any) {
            console.error('Failed to fetch uploads:', err);
            if (err.response?.status === 403) {
                setError('You do not have admin access.');
            }
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await api.post('/admin/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('File uploaded successfully!');
            setSelectedFile(null);
            fetchUploads();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to upload file');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this file?')) return;

        try {
            await api.delete(`/admin/upload/${id}`);
            setSuccess('File deleted successfully!');
            fetchUploads();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete file');
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const isImage = (mimeType: string) => mimeType.startsWith('image/');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Admin File Upload
                </h1>

                {/* Upload Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Upload New File
                    </h2>

                    {/* Drag and Drop Area */}
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                            }`}
                    >
                        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                            Drag and drop your file here, or
                        </p>
                        <label className="inline-block cursor-pointer">
                            <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                Browse Files
                            </span>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Maximum file size: 10MB
                        </p>
                    </div>

                    {/* Selected File Preview */}
                    {selectedFile && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between">
                            <div className="flex items-center">
                                <File className="w-8 h-8 text-blue-600 mr-3" />
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatFileSize(selectedFile.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Upload Button */}
                    {selectedFile && (
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="mt-4 w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {uploading ? 'Uploading...' : 'Upload File'}
                        </button>
                    )}

                    {/* Messages */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
                            {success}
                        </div>
                    )}
                </div>

                {/* Uploaded Files List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Uploaded Files
                    </h2>

                    {uploads.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                            No files uploaded yet.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {uploads.map((upload) => (
                                <div
                                    key={upload.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
                                >
                                    {/* File Preview */}
                                    <div className="mb-3">
                                        {isImage(upload.mime_type) ? (
                                            <img
                                                src={upload.url}
                                                alt={upload.original_filename}
                                                className="w-full h-40 object-cover rounded-md"
                                            />
                                        ) : (
                                            <div className="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                                                <File className="w-16 h-16 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* File Info */}
                                    <h3 className="font-medium text-gray-900 dark:text-white truncate mb-1">
                                        {upload.original_filename}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        {formatFileSize(upload.size)}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                                        {new Date(upload.created_at).toLocaleDateString()}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <a
                                            href={upload.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            <Download className="w-4 h-4" />
                                            View
                                        </a>
                                        <button
                                            onClick={() => handleDelete(upload.id)}
                                            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUpload;
