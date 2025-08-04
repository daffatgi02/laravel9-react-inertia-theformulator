// resources/js/Shared/Components/ProjectsSection.jsx

import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

const ProjectsSection = ({ projectsData, projects }) => {
    if (!projectsData || !projects?.length) return null;

    return (
        <section className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        {projectsData.content.heading}
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">
                        {projectsData.content.subtitle}
                    </p>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        {projectsData.content.description}
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="relative overflow-hidden">
                                <img 
                                    src={project.featured_image || '/images/default-project.jpg'}
                                    alt={project.title}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                
                                {/* Project Status Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        project.status === 'completed' 
                                            ? 'bg-green-500 text-white' 
                                            : project.status === 'ongoing'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-yellow-500 text-white'
                                    }`}>
                                        {project.status === 'completed' ? 'Selesai' : 
                                         project.status === 'ongoing' ? 'Berlangsung' : 'Tertunda'}
                                    </span>
                                </div>

                                {/* Featured Badge */}
                                {project.is_featured && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                                            ⭐ Featured
                                        </span>
                                    </div>
                                )}

                                {/* Category */}
                                {project.category && (
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                                            {project.category}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </h3>
                                
                                <p className="text-gray-600 mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Teknologi:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, techIndex) => (
                                                <span 
                                                    key={techIndex}
                                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between">
                                    <Link 
                                        href={`/project/${project.slug}`}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                                    >
                                        Lihat Detail
                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                    
                                    {project.project_url && (
                                        <a 
                                            href={project.project_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm"
                                        >
                                            Live Demo
                                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Projects Button */}
                <motion.div 
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg">
                        Lihat Semua Proyek
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;