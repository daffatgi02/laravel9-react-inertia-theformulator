// resources/js/Shared/Components/Form/FormInput.jsx

import { forwardRef } from 'react';

const FormInput = forwardRef(({ 
    label, 
    error, 
    type = 'text', 
    required = false, 
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
            <input
                ref={ref}
                type={type}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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

FormInput.displayName = 'FormInput';

export default FormInput;