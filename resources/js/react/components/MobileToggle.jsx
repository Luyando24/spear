import React from 'react';

const MobileToggle = ({ isMobile, isMobileOpen, onToggle }) => {
    if (!isMobile) return null;

    return (
        <button 
            id="mobile-toggle"
            onClick={onToggle}
            className="fixed top-4 right-4 md:hidden bg-military-green text-white p-3 rounded-full shadow-lg z-50"
        >
            <i className={`fas ${isMobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
    );
};

export default MobileToggle;