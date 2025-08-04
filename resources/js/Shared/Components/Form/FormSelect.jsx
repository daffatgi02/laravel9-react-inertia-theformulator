// resources/js/Shared/Components/Form/FormSelect.jsx

import { forwardRef } from 'react';

const FormSelect = forwardRef(({ 
    label, 
    error, 
    options = [], 
    required = false, 
    placeholder = 'Select an option...', 
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
            <select
                ref={ref}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    error ? 'border-red-500' : ''
                } ${className}`}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

FormSelect.displayName = 'FormSelect';

export default FormSelect;