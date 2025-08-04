// resources/js/Shared/Components/Form/FileUpload.jsx

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUpload({ 
    label, 
    onFilesSelect, 
    accept = 'image/*', 
    multiple = false, 
    error,
    required = false,
    currentFiles = []
}) {
    const onDrop = useCallback((acceptedFiles) => {
        onFilesSelect(acceptedFiles);
    }, [onFilesSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        multiple
    });

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            
            <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive 
                        ? 'border-blue-400 bg-blue-50' 
                        : error 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                }`}
            >
                <input {...getInputProps()} />
                <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {isDragActive ? (
                        <p className="text-blue-600">Drop the files here...</p>
                    ) : (
                        <div>
                            <p className="text-gray-600">
                                Drag & drop files here, or <span className="text-blue-600 underline">click to select</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {multiple ? 'Multiple files allowed' : 'Single file only'} • Max 2MB each
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Show current files */}
            {currentFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                    {currentFiles.map((file, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            {typeof file === 'string' ? file : file.name}
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}