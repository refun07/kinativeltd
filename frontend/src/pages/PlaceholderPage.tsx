import React from 'react';

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-heading font-bold mb-4">{title}</h1>
                <p className="text-xl text-gray-400">Coming Soon</p>
            </div>
        </div>
    );
};

export default PlaceholderPage;
