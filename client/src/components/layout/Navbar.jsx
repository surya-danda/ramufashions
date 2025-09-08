import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { FaChartBar, FaPlusCircle, FaHistory, FaSignOutAlt } from 'react-icons/fa';

// We pass setSidebarOpen to close the sidebar when a link is clicked on mobile
const NavItem = ({ to, icon, children, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-gray-200 hover:text-text-primary'
            }`
        }
    >
        {icon}
        <span className="font-medium">{children}</span>
    </NavLink>
);

const Navbar = ({ isSidebarOpen, setSidebarOpen }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLinkClick = () => {
        // Close sidebar on mobile after navigation
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const handleLogout = () => {
        handleLinkClick();
        logout();
        navigate('/login');
    };

    return (
        <aside 
            className={`w-[250px] h-screen bg-surface border-r border-gray-200 flex flex-col p-4 
            fixed lg:fixed 
            transform transition-transform duration-300 ease-in-out z-50
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0`}
        >
            <div className="text-2xl font-bold text-primary mb-10 text-center">
                Sales Tracker
            </div>
            <nav className="flex flex-col space-y-2">
                <NavItem to="/" icon={<FaPlusCircle size={20} />} onClick={handleLinkClick}>Add Sale</NavItem>
                <NavItem to="/totals" icon={<FaChartBar size={20} />} onClick={handleLinkClick}>Monthly Totals</NavItem>
                <NavItem to="/history" icon={<FaHistory size={20} />} onClick={handleLinkClick}>Sales History</NavItem>
            </nav>
            <button
                onClick={handleLogout}
                className="mt-auto flex items-center space-x-3 p-3 rounded-lg text-red-500 bg-red-50 hover:bg-red-100 transition-colors duration-200"
            >
                <FaSignOutAlt size={20} />
                <span className="font-medium">Logout</span>
            </button>
        </aside>
    );
};

export default Navbar;