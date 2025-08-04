// resources/js/Shared/Components/Form/FormTextarea.jsx

import { forwardRef } from 'react';

const FormTextarea = forwardRef(({ 
    label, 
    error, 
    required = false, 
    rows = 4, 
    className = '', 
    ...props 
}, ref) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                ref={ref}
                rows={rows}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
                    error ? 'border-red-500' : ''
                } ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;