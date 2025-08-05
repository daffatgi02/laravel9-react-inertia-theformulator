// resources/js/Shared/Components/ArticlesSection.jsx

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

const ArticlesSection = ({ articlesData, articles }) => {
    // Limit to 3 latest articles
    const latestArticles = articles ? articles.slice(0, 3) : [];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isInArticleSection, setIsInArticleSection] = useState(false);

    const scrollToNext = () => {
        if (isScrolling) return;
        
        const nextIndex = currentIndex + 1;
        if (nextIndex < latestArticles.length) {
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

    // Handle scroll lock logic
    useEffect(() => {
        const handleScroll = (e) => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const isVisible = rect.top <= 0 && rect.bottom >= window.innerHeight;
            
            setIsInArticleSection(isVisible);
        };

        const handleWheel = (e) => {
            if (!isInArticleSection || isScrolling) return;

            e.preventDefault();
            
            if (e.deltaY > 0) {
                // Scrolling down
                if (currentIndex < latestArticles.length - 1) {
                    // Still have articles to navigate
                    scrollToNext();
                } else {
                    // Last article - allow scroll to next section
                    setIsInArticleSection(false);
                    const nextSection = document.querySelector('#social');
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            } else {
                // Scrolling up
                if (currentIndex > 0) {
                    // Navigate to previous article
                    scrollToPrev();
                } else {
                    // First article - allow scroll to previous section
                    setIsInArticleSection(false);
                    const prevSection = document.querySelector('#home');
                    if (prevSection) {
                        prevSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentIndex, isScrolling, latestArticles.length, isInArticleSection]);

    // Handle empty data
    if (!articlesData || !articlesData.content) {
        return null;
    }

    if (!latestArticles || latestArticles.length === 0) {
        return (
            <section id="articles" className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
                <div className="text-center">
                    <motion.h2 
                        className="text-4xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {articlesData.content.heading}
                    </motion.h2>
                    <motion.p 
                        className="text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Artikel menarik akan segera hadir.
                    </motion.p>
                </div>
            </section>
        );
    }

    return (
        <section 
            id="articles" 
            ref={sectionRef}
            className="min-h-screen bg-gray-50 relative overflow-hidden"
        >
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

            {/* Articles Container */}
            <div 
                ref={scrollContainerRef}
                className="h-screen pt-48 overflow-hidden scroll-smooth"
                style={{ scrollSnapType: 'y mandatory' }}
            >
                {latestArticles.map((article, index) => (
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

            {/* Navigation Control - Simple & Clean */}
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-3">
                    {/* Progress Dots */}
                    <div className="space-y-3">
                        {latestArticles.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    scrollToArticle(index);
                                }}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    index === currentIndex 
                                        ? 'bg-blue-600 scale-125' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                    
                    {/* Current Article Number */}
                    <div className="text-center mt-3 pt-3 border-t border-gray-200">
                        <span className="text-xs text-gray-500 font-medium">
                            {currentIndex + 1}/{latestArticles.length}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArticlesSection;