// resources/js/Shared/Components/HeroSection.jsx

import { motion } from 'framer-motion';

const HeroSection = ({ heroData }) => {
    if (!heroData) return null;

    const { content } = heroData;

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center py-20">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Grid - Photo & Basic Info */}
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
                        
                        <motion.h1 
                            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {content.name}
                        </motion.h1>
                        
                        <motion.h2 
                            className="text-2xl lg:text-3xl text-blue-600 font-light mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {content.title}
                        </motion.h2>
                    </motion.div>

                    {/* Right Grid - 5W1H Information */}
                    <motion.div 
                        className="space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tentang The Formulator</h3>
                            
                            <div className="space-y-6">
                                {/* What */}
                                <motion.div 
                                    className="flex items-start space-x-4"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-bold text-lg">?</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Apa yang saya lakukan?</h4>
                                        <p className="text-gray-600">{content.what}</p>
                                    </div>
                                </motion.div>

                                {/* Who */}
                                <motion.div 
                                    className="flex items-start space-x-4"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 font-bold text-lg">👤</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Siapa saya?</h4>
                                        <p className="text-gray-600">{content.who}</p>
                                    </div>
                                </motion.div>

                                {/* When */}
                                <motion.div 
                                    className="flex items-start space-x-4"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <span className="text-yellow-600 font-bold text-lg">📅</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Kapan memulai?</h4>
                                        <p className="text-gray-600">{content.when}</p>
                                    </div>
                                </motion.div>

                                {/* Where */}
                                <motion.div 
                                    className="flex items-start space-x-4"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-purple-600 font-bold text-lg">📍</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Di mana beroperasi?</h4>
                                        <p className="text-gray-600">{content.where}</p>
                                    </div>
                                </motion.div>

                                {/* Why */}
                                <motion.div 
                                    className="flex items-start space-x-4"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                        <span className="text-red-600 font-bold text-lg">💡</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Mengapa memilih bidang ini?</h4>
                                        <p className="text-gray-600">{content.why}</p>
                                    </div>
                                </motion.div>

                                {/* How */}
                                <motion.div 
                                    className="flex items-start space-x-4"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <span className="text-indigo-600 font-bold text-lg">⚙️</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Bagaimana cara kerja?</h4>
                                        <p className="text-gray-600">{content.how}</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;