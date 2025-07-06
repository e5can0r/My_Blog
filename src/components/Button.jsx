import React from "react";

export default function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    bgColor,
    textColor,
    className = "",
    disabled = false,
    loading = false,
    ...props
}) {
    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-600 hover:bg-blue-700 text-white border-transparent'
            case 'secondary':
                return 'bg-gray-600 hover:bg-gray-700 text-white border-transparent'
            case 'success':
                return 'bg-green-600 hover:bg-green-700 text-white border-transparent'
            case 'danger':
                return 'bg-red-600 hover:bg-red-700 text-white border-transparent'
            case 'warning':
                return 'bg-yellow-600 hover:bg-yellow-700 text-white border-transparent'
            case 'outline':
                return 'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300'
            case 'ghost':
                return 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent'
            default:
                return 'bg-blue-600 hover:bg-blue-700 text-white border-transparent'
        }
    }

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-1.5 text-sm'
            case 'md':
                return 'px-4 py-2 text-base'
            case 'lg':
                return 'px-6 py-3 text-lg'
            case 'xl':
                return 'px-8 py-4 text-xl'
            default:
                return 'px-4 py-2 text-base'
        }
    }

    const baseClasses = 'font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center'
    
    const variantClasses = bgColor && textColor ? `${bgColor} ${textColor}` : getVariantClasses()
    const sizeClasses = getSizeClasses()
    
    return (
        <button 
            type={type}
            disabled={disabled || loading}
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
}
