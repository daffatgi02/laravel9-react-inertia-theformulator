// resources/js/Shared/Components/SocialMediaSection.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';

const SocialMediaSection = ({ socialData, socialContents }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedVideo, setSelectedVideo] = useState(null);

    const filteredContents = activeTab === 'all'
        ? socialContents
        : socialContents.filter(content => content.platform === activeTab);

    const platforms = ['all', 'youtube', 'tiktok', 'instagram'];
    const platformLabels = {
        all: 'Semua',
        youtube: 'YouTube',
        tiktok: 'TikTok',
        instagram: 'Instagram'
    };

    const platformColors = {
        youtube: 'bg-red-500',
        tiktok: 'bg-black',
        instagram: 'bg-gradient-to-r from-purple-500 to-pink-500'
    };

    const getEmbedUrl = (url, platform) => {
        if (platform === 'youtube') {
            const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
            return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
        }
        return url;
    };

    if (!socialData || !socialContents?.length) return null;

    return (
        <section className="min-h-screen bg-white py-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        {socialData.content.heading}
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">
                        {socialData.content.subtitle}
                    </p>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        {socialData.content.description}
                    </p>
                </motion.div>

                {/* Platform Filter */}
                <motion.div
                    className="flex justify-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="bg-gray-100 rounded-full p-2">
                        {platforms.map((platform) => (
                            <button
                                key={platform}
                                onClick={() => setActiveTab(platform)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === platform
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {platformLabels[platform]}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Content Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {filteredContents.map((content, index) => (
                        <motion.div
                            key={content.id}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="relative">
                                {content.platform === 'youtube' ? (
                                    <div className="aspect-video">
                                        <iframe
                                            src={getEmbedUrl(content.video_url, content.platform)}
                                            title={content.title}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="aspect-video bg-gray-200 relative cursor-pointer"
                                        onClick={() => setSelectedVideo(content)}
                                    >
                                        <img
                                            src={content.thumbnail || '/images/default-video.jpg'}
                                            alt={content.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M8 5v10l8-5-8-5z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Platform Badge */}
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold ${platformColors[content.platform] || 'bg-gray-500'}`}>
                                    {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                                    {content.title}
                                </h3>
                                {content.description && (
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {content.description}
                                    </p>
                                )}

                                <div className="mt-4 flex items-center justify-between">
                                    <button
                                        onClick={() => window.open(content.video_url, '_blank')} className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center"
                                    >
                                        Lihat Asli
                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </button>
                                    <span className="text-xs text-gray-500">
                                        {new Date(content.created_at).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Load More Button */}
                {filteredContents.length > 6 && (
                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <button className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                            Lihat Lebih Banyak
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Video Modal for TikTok/Instagram */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
                    <div className="relative max-w-md w-full" onClick={e => e.stopPropagation()}>
                        {selectedVideo.embed_code ? (
                            <div dangerouslySetInnerHTML={{ __html: selectedVideo.embed_code }} />
                        ) : (
                            <div className="bg-white rounded-lg p-4">
                                <h3 className="font-bold mb-4">{selectedVideo.title}</h3>
                                <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                                <a
                                    href={selectedVideo.video_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Buka di {selectedVideo.platform}
                                </a>
                            </div>
                        )}
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SocialMediaSection;