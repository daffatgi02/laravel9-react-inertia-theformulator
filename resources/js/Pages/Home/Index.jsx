// resources/js/Pages/Home/Index.jsx

import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import HeroSection from '@/Shared/Components/HeroSection';
import ArticlesSection from '@/Shared/Components/ArticlesSection';
import SocialMediaSection from '@/Shared/Components/SocialMediaSection';
import ProjectsSection from '@/Shared/Components/ProjectsSection';
import Toast from '@/Shared/Components/Toast';

export default function Home({ 
    seoSettings, 
    heroSection, 
    articlesSection, 
    socialSection, 
    projectsSection,
    articles, 
    projects, 
    socialContents 
}) {
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const hideToast = () => {
        setToast({ ...toast, show: false });
    };

    return (
        <>
            <Head>
                <title>{seoSettings?.meta_title || 'The Formulator - Jose Asmodeus'}</title>
                <meta name="description" content={seoSettings?.meta_description || 'Professional formulator specializing in herbal and natural skincare products'} />
                {seoSettings?.meta_keywords && (
                    <meta name="keywords" content={seoSettings.meta_keywords} />
                )}
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={seoSettings?.og_title || seoSettings?.meta_title || 'The Formulator - Jose Asmodeus'} />
                <meta property="og:description" content={seoSettings?.og_description || seoSettings?.meta_description || 'Professional formulator specializing in herbal and natural skincare products'} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                {seoSettings?.og_image && (
                    <meta property="og:image" content={seoSettings.og_image} />
                )}

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seoSettings?.og_title || seoSettings?.meta_title || 'The Formulator - Jose Asmodeus'} />
                <meta name="twitter:description" content={seoSettings?.og_description || seoSettings?.meta_description || 'Professional formulator specializing in herbal and natural skincare products'} />
                {seoSettings?.og_image && (
                    <meta name="twitter:image" content={seoSettings.og_image} />
                )}

                {/* Structured Data */}
                {seoSettings?.structured_data && (
                    <script type="application/ld+json">
                        {JSON.stringify(seoSettings.structured_data)}
                    </script>
                )}
            </Head>

            <div className="min-h-screen">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            <motion.div 
                                className="font-bold text-xl text-gray-900"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                The Formulator
                            </motion.div>
                            
                            <motion.div 
                                className="hidden md:flex items-center space-x-6"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <a href="#home" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
                                <a href="#articles" className="text-gray-600 hover:text-gray-900 transition-colors">Artikel</a>
                                <a href="#social" className="text-gray-600 hover:text-gray-900 transition-colors">Social</a>
                                <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors">Projects</a>
                                <button 
                                    onClick={() => showToast('Hubungi kami melalui WhatsApp!', 'info')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Kontak
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </nav>

                {/* Main Sections */}
                <div id="home">
                    <HeroSection heroData={heroSection} />
                </div>
                
                <div id="articles">
                    <ArticlesSection articlesData={articlesSection} articles={articles} />
                </div>
                
                <div id="social">
                    <SocialMediaSection socialData={socialSection} socialContents={socialContents} />
                </div>
                
                <div id="projects">
                    <ProjectsSection projectsData={projectsSection} projects={projects} />
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">The Formulator</h3>
                                <p className="text-gray-400">
                                    Professional formulator specializing in herbal and natural skincare products.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                                    <li><a href="#articles" className="hover:text-white transition-colors">Artikel</a></li>
                                    <li><a href="#social" className="hover:text-white transition-colors">Social Media</a></li>
                                    <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-4">Contact Info</h4>
                                <div className="space-y-2 text-gray-400">
                                    <p>Jakarta, Indonesia</p>
                                    <p>info@theformulator.com</p>
                                    <div className="flex space-x-4 mt-4">
                                        <a href="#" className="hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                            </svg>
                                        </a>
                                        <a href="#" className="hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2025 The Formulator. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Toast Notifications */}
            <Toast 
                message={toast.message}
                type={toast.type}
                show={toast.show}
                onClose={hideToast}
            />
        </>
    );
}