import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-12 py-4 text-center">
            <p className="text-sm text-gray-800 font-medium">
                &copy; {currentYear} Copyright SURYA DANDA. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;