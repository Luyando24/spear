import React from 'react';
import { useApp } from '../contexts/AppContext';

const Header = () => {
    const { state } = useApp();
    const { user } = state;
    return (
        <header className="bg-white shadow-md border-b border-gray-200 px-6 py-4 animate-slide-up">
            <div className="flex items-center justify-between">
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-spear-dark font-spear">Dashboard</h2>
                    <p className="text-spear-gray-600 text-sm">
                        Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! Here's your learning progress.
                    </p>
                </div>
                <div className="flex items-center space-lg">
                    <div className="relative">
                        <input 
                            type="search" 
                            placeholder="Search courses..." 
                            className="form-input pl-10 pr-4 py-2 w-64 transition-all duration-normal focus:w-80"
                        />
                        <i className="fas fa-search absolute left-3 top-3 text-spear-gray-400"></i>
                    </div>
                </div>
            </div>
        </header>
     );
};

export default Header;