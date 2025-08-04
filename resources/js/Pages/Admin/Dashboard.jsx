// resources/js/Pages/Admin/Dashboard.jsx

import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({ stats, recentActivities }) {
    const statCards = [
        { title: 'Total Articles', value: stats.articles_count, icon: '📰', color: 'bg-blue-500' },
        { title: 'Published Articles', value: stats.published_articles, icon: '✅', color: 'bg-green-500' },
        { title: 'Projects', value: stats.projects_count, icon: '🚀', color: 'bg-purple-500' },
        { title: 'Social Contents', value: stats.social_contents_count, icon: '📱', color: 'bg-pink-500' },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        className="bg-white rounded-lg shadow-md p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className="flex items-center">
                            <div className={`${card.color} p-3 rounded-full text-white text-2xl mr-4`}>
                                {card.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{card.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activities */}
            <motion.div 
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-blue-600 text-sm font-semibold">
                                    {activity.action.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900">
                                    <span className="font-medium">{activity.user?.name}</span>
                                    {' '}
                                    <span className="text-gray-600">{activity.action}d</span>
                                    {' '}
                                    <span className="font-medium">{activity.model_type.split('\\').pop()}</span>
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(activity.created_at).toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </AdminLayout>
    );
}