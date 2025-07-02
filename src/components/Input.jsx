import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    error = "",
    ...props
}, ref) {
    const id = useId()

    return (
        <div className="w-full mb-4">
            {label && (
                <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                ref={ref}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${className}`}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
        </div>
    )
})

export default Input
