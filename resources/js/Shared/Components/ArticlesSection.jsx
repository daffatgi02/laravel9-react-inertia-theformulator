// resources/js/Shared/Components/ArticlesSection.jsx

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

const ArticlesSection = ({ articlesData, articles }) => {
    if (!articlesData || !articlesData.content) {
        console.log('ArticlesSection: Missing articlesData or content');
        return null;
    }

    if (!articles || articles.length === 0) {
        console.log('ArticlesSection: No articles data');
        return (
            <section className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel Segera Hadir</h2>
                    <p className="text-gray-600">Kami sedang menyiapkan artikel-artikel menarik untuk Anda.</p>
                </div>
            </section>
        );
    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const scrollToNext = () => {
        if (isScrolling) return;

        const nextIndex = currentIndex + 1;
        if (nextIndex < articles.length) {
            setCurrentIndex(nextIndex);
            scrollToArticle(nextIndex);
        }
    };

    const scrollToPrev = () => {
        if (isScrolling) return;

        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            setCurrentIndex(prevIndex);
            scrollToArticle(prevIndex);
        }
    };

    const scrollToArticle = (index) => {
        setIsScrolling(true);
        const container = scrollContainerRef.current;
        const articleHeight = container.clientHeight;

        container.scrollTo({
            top: index * articleHeight,
            behavior: 'smooth'
        });

        setTimeout(() => setIsScrolling(false), 800);
    };

    useEffect(() => {
        const handleWheel = (e) => {
            if (isScrolling) return;

            e.preventDefault();

            if (e.deltaY > 0) {
                scrollToNext();
            } else {
                scrollToPrev();
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            return () => container.removeEventListener('wheel', handleWheel);
        }
    }, [currentIndex, isScrolling]);

    if (!articlesData || !articles?.length) return null;

    return (
        <section className="min-h-screen bg-gray-50 relative overflow-hidden">
            {/* Section Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm p-8">
                <div className="container mx-auto text-center">
                    <motion.h2
                        className="text-4xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {articlesData.content.heading}
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-600 mb-2"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {articlesData.content.subtitle}
                    </motion.p>
                    <motion.p
                        className="text-gray-500"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {articlesData.content.description}
                    </motion.p>
                </div>
            </div>

            {/* Articles Container with Vertical Scroll Snap */}
            <div
                ref={scrollContainerRef}
                className="h-screen pt-48 overflow-hidden scroll-smooth"
                style={{ scrollSnapType: 'y mandatory' }}
            >
                {articles.map((article, index) => (
                    <motion.div
                        key={article.id}
                        className="h-screen flex items-center justify-center px-4"
                        style={{ scrollSnapAlign: 'start' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <div className="container mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="relative">
                                    <img
                                        src={article.featured_image || '/images/default-article.jpg'}
                                        alt={article.title}
                                        className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                    />
                                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        Artikel #{index + 1}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href={`/artikel/${article.slug}`}
                                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Baca Selengkapnya
                                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                        <span className="text-sm text-gray-500">
                                            {new Date(article.published_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 space-y-4">
                <button
                    onClick={scrollToPrev}
                    disabled={currentIndex === 0}
                    className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>

                <div className="text-center">
                    <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full shadow">
                        {currentIndex + 1} / {articles.length}
                    </span>
                </div>

                <button
                    onClick={scrollToNext}
                    disabled={currentIndex === articles.length - 1}
                    className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Progress Indicator */}
            <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20">
                <div className="space-y-2">
                    {articles.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentIndex(index);
                                scrollToArticle(index);
                            }}
                            className={`w-2 h-8 rounded-full transition-all ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ArticlesSection;