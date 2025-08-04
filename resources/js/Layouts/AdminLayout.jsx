// resources/js/Layouts/AdminLayout.jsx

import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function AdminLayout({ children, title }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navigation = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: '📊' },
        { name: 'CMS Sections', href: route('admin.cms-sections.index'), icon: '📝' },
        { name: 'Articles', href: route('admin.articles.index'), icon: '📰' },
        { name: 'Projects', href: route('admin.projects.index'), icon: '🚀' },
        { name: 'Social Contents', href: route('admin.social-contents.index'), icon: '📱' },
        { name: 'SEO Settings', href: route('admin.seo-settings.index'), icon: '🔍' },
        { name: 'Audit Logs', href: route('admin.audit-logs.index'), icon: '📋' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <motion.div 
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center justify-center h-16 bg-gray-800">
                    <h1 className="text-white text-lg font-bold">The Formulator CMS</h1>
                </div>
                
                <nav className="mt-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </motion.div>

            {/* Main Content */}
            <div className={`${sidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300`}>
                {/* Top Bar */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-gray-500 hover:text-gray-700 lg:hidden"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h2 className="ml-4 text-xl font-semibold text-gray-900">{title}</h2>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Welcome, {auth.user.name}</span>
                            <Link
                                href={route('home')}
                                className="text-blue-600 hover:text-blue-700 text-sm"
                                target="_blank"
                            >
                                View Site
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}