const LoadingSpinner = ({ size = 'default', text = '' }) => {
    const sizeClasses = {
        small: 'w-6 h-6 border-2',
        default: 'w-12 h-12 border-4',
        large: 'w-16 h-16 border-4',
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div
                className={`${sizeClasses[size]} border-accent-green border-t-transparent rounded-full animate-spin`}
            ></div>
            {text && <p className="mt-4 text-text-secondary">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;
