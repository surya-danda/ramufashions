import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const getPageTitle = (pathname) => {
    switch (pathname) {
        case '/':
            return 'Add Daily Sale';
        case '/totals':
            return 'Monthly Totals';
        case '/history':
            return 'Sales History';
        default:
            return 'Dashboard';
    }
};

const Header = ({ toggleSidebar }) => {
    const location = useLocation();
    const title = getPageTitle(location.pathname);

    return (
        <header className="flex items-center justify-between lg:justify-end mb-6">
            {/* Hamburger Icon - visible only on screens smaller than lg */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden text-text-primary focus:outline-none"
            >
                <FaBars size={24} />
            </button>
            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">{title}</h1>
        </header>
    );
};

export default Header;