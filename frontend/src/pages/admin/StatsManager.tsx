import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import api from '../../services/api';

interface Stat {
    id?: number;
    value: string;
    label: string;
    page: string;
    order: number;
    is_active: boolean;
}

const StatsManager: React.FC = () => {
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState<Stat>({
        value: '',
        label: '',
        page: 'home',
        order: 0,
        is_active: true,
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/admin/stats');
            setStats(response.data);
        } catch (err: any) {
            setError('Failed to fetch stats');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            await api.post('/admin/stats', formData);
            setCreating(false);
            setFormData({ value: '', label: '', page: 'home', order: 0, is_active: true });
            fetchStats();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create stat');
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            await api.put(`/admin/stats/${id}`, formData);
            setEditing(null);
            fetchStats();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update stat');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this stat?')) return;

        try {
            await api.delete(`/admin/stats/${id}`);
            fetchStats();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete stat');
        }
    };

    const startEdit = (stat: Stat) => {
        setEditing(stat.id!);
        setFormData(stat);
    };

    const cancelEdit = () => {
        setEditing(null);
        setCreating(false);
        setFormData({ value: '', label: '', page: 'home', order: 0, is_active: true });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stats Manager</h1>
                <button
                    onClick={() => setCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Stat
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                    {error}
                </div>
            )}

            {creating && (
                <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Create New Stat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Value</label>
                            <input
                                type="text"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="e.g., 300+"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Label</label>
                            <input
                                type="text"
                                value={formData.label}
                                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="e.g., Projects Completed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Page</label>
                            <select
                                value={formData.page}
                                onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="home">Home</option>
                                <option value="about">About</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Order</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            <Save className="w-4 h-4" />
                            Save
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Label</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Page</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {stats.map((stat) => (
                            <tr key={stat.id}>
                                {editing === stat.id ? (
                                    <>
                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                value={formData.value}
                                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                                className="w-full px-2 py-1 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                value={formData.label}
                                                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                                className="w-full px-2 py-1 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={formData.page}
                                                onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                                                className="w-full px-2 py-1 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            >
                                                <option value="home">Home</option>
                                                <option value="about">About</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                value={formData.order}
                                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                                className="w-20 px-2 py-1 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleUpdate(stat.id!)}
                                                className="text-green-600 hover:text-green-900 dark:text-green-400 mr-3"
                                            >
                                                <Save className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="text-gray-600 hover:text-gray-900 dark:text-gray-400"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{stat.value}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{stat.label}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">{stat.page}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{stat.order}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${stat.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {stat.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => startEdit(stat)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 mr-3"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(stat.id!)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {stats.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No stats found. Click "Add Stat" to create one.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsManager;
