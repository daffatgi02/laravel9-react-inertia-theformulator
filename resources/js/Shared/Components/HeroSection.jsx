// resources/js/Shared/Components/HeroSection.jsx

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

const HeroSection = ({ heroData, articlesData, articles }) => {
    // Limit to 3 latest articles
    const latestArticles = articles ? articles.slice(0, 3) : [];
    
    // Total sections: CEO Hero + 3 Articles = 4 sections
    const totalSections = 1 + latestArticles.length; // 1 CEO + articles
    const [currentSection, setCurrentSection] = useState(0); // 0 = CEO, 1-3 = Articles
    const [isScrolling, setIsScrolling] = useState(false);
    const [isInHeroSection, setIsInHeroSection] = useState(false);
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const scrollToSection = (sectionIndex) => {
        if (isScrolling) return;
        
        setIsScrolling(true);
        const container = scrollContainerRef.current;
        const sectionHeight = container.clientHeight;
        
        container.scrollTo({
            top: sectionIndex * sectionHeight,
            behavior: 'smooth'
        });

        setCurrentSection(sectionIndex);
        setTimeout(() => setIsScrolling(false), 800);
    };

    const scrollToNext = () => {
        if (isScrolling) return;
        
        if (currentSection < totalSections - 1) {
            scrollToSection(currentSection + 1);
        } else {
            // End of hero section, go to next section (Social Media)
            setIsInHeroSection(false);
            const nextSection = document.querySelector('#social');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const scrollToPrev = () => {
        if (isScrolling) return;
        
        if (currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
        // If at CEO section (0), let natural scroll handle going to previous page sections
    };

    // Handle scroll lock for extended hero section
    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const isVisible = rect.top <= 0 && rect.bottom >= window.innerHeight;
            setIsInHeroSection(isVisible);
        };

        const handleWheel = (e) => {
            if (!isInHeroSection || isScrolling) return;

            e.preventDefault();
            
            if (e.deltaY > 0) {
                scrollToNext();
            } else {
                scrollToPrev();
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentSection, isScrolling, totalSections, isInHeroSection]);

    if (!heroData) return null;

    const { content } = heroData;

    return (
        <section 
            id="home" 
            ref={sectionRef}
            className="min-h-screen relative overflow-hidden"
        >
            {/* Extended Hero Container */}
            <div 
                ref={scrollContainerRef}
                className="h-screen overflow-hidden scroll-smooth"
                style={{ scrollSnapType: 'y mandatory' }}
            >
                {/* Section 0: CEO Hero */}
                <motion.div
                    className="h-screen bg-gradient-to-br from-gray-50 to-white flex items-center py-20"
                    style={{ scrollSnapAlign: 'start' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* CEO Info - Left */}
                            <motion.div 
                                className="text-center lg:text-left"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="relative inline-block mb-8">
                                    <div className="w-64 h-64 mx-auto lg:mx-0 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                                        <img 
                                            src={content.photo || '/images/default-profile.jpg'} 
                                            alt={content.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 lg:left-8 lg:transform-none bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg">
                                        <span className="text-sm font-semibold">CEO & Founder</span>
                                    </div>
                                </div>
                                
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                    {content.name}
                                </h1>
                                
                                <h2 className="text-2xl lg:text-3xl text-blue-600 font-light mb-6">
                                    {content.title}
                                </h2>
                            </motion.div>

                            {/* 5W1H Info - Right */}
                            <motion.div 
                                className="space-y-8"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tentang The Formulator</h3>
                                    
                                    <div className="space-y-6">
                                        {[
                                            { icon: '?', color: 'blue', title: 'Apa yang saya lakukan?', content: content.what },
                                            { icon: '👤', color: 'green', title: 'Siapa saya?', content: content.who },
                                            { icon: '📅', color: 'yellow', title: 'Kapan memulai?', content: content.when },
                                            { icon: '📍', color: 'purple', title: 'Di mana beroperasi?', content: content.where },
                                            { icon: '💡', color: 'red', title: 'Mengapa memilih bidang ini?', content: content.why },
                                            { icon: '⚙️', color: 'indigo', title: 'Bagaimana cara kerja?', content: content.how },
                                        ].map((item, index) => (
                                            <motion.div 
                                                key={index}
                                                className="flex items-start space-x-4"
                                                whileHover={{ x: 5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <div className={`flex-shrink-0 w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
                                                    <span className={`text-${item.color}-600 font-bold text-lg`}>{item.icon}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                                                    <p className="text-gray-600">{item.content}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Sections 1-3: Articles */}
                {latestArticles.map((article, index) => (
                    <motion.div
                        key={article.id}
                        className="h-screen bg-gray-50 flex items-center py-20"
                        style={{ scrollSnapAlign: 'start' }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="container mx-auto px-4">
                            {/* Article Header - Only show once */}
                            {index === 0 && (
                                <motion.div 
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: -30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                        {articlesData?.content?.heading || 'Artikel Terbaru'}
                                    </h2>
                                    <p className="text-xl text-gray-600 mb-4">
                                        {articlesData?.content?.subtitle || 'Insight dan pengetahuan terbaru'}
                                    </p>
                                    <p className="text-gray-500 max-w-2xl mx-auto">
                                        {articlesData?.content?.description || 'Koleksi artikel pilihan tentang formulasi dan industri kosmetik'}
                                    </p>
                                </motion.div>
                            )}

                            {/* Article Content */}
                            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                                <motion.div 
                                    className="relative"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                        <img 
                                            src={article.featured_image || '/images/default-article.jpg'}
                                            alt={article.title}
                                            className="w-full h-96 lg:h-[500px] object-cover"
                                        />
                                        
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                        
                                        <div className="absolute top-6 left-6">
                                            <div className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg">
                                                <span className="text-sm font-semibold">
                                                    Artikel #{index + 1}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-6 left-6">
                                            <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                                                {new Date(article.published_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                
                                <motion.div 
                                    className="space-y-6"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <div className="space-y-4">
                                        <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                                            {article.title}
                                        </h3>
                                        
                                        <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                                        
                                        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <Link 
                                            href={`/artikel/${article.slug}`}
                                            className="group inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                                        >
                                            Baca Selengkapnya
                                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Navigation Control */}
            <div className="fixed right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-30">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-3 border border-gray-200/50">
                    {/* Progress Dots */}
                    <div className="flex flex-col space-y-3 py-2">
                        {Array.from({ length: totalSections }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToSection(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentSection 
                                        ? 'bg-blue-600 scale-125 shadow-lg' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={index === 0 ? 'CEO Section' : `Article ${index}`}
                            />
                        ))}
                    </div>
                    
                    {/* Section Label */}
                    <div className="border-t border-gray-200 mt-3 pt-3 text-center">
                        <span className="text-xs text-gray-500 font-medium">
                            {currentSection === 0 ? 'CEO' : `Art ${currentSection}`}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;