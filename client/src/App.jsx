import React, { useState, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer'; // <-- 1. IMPORT FOOTER
import ProtectedRoute from './components/layout/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddSalePage from './pages/AddSalePage';
import MonthlyTotalsPage from './pages/MonthlyTotalsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  if (!token || isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} /> 
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {isSidebarOpen && (
          <div 
              onClick={toggleSidebar} 
              className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
          ></div>
      )}

      {/* --- 2. LAYOUT ADJUSTMENT --- */}
      {/* We make the main content a flex column to push the footer down */}
      <main className="flex-1 lg:ml-[250px] p-4 sm:p-6 lg:p-8 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        {/* This div will grow to fill available space */}
        <div className="flex-grow">
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<AddSalePage />} />
                    <Route path="/totals" element={<MonthlyTotalsPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="*" element={<AddSalePage />} />
                </Route>
            </Routes>
        </div>
        
        {/* --- 3. RENDER FOOTER --- */}
        <Footer />
      </main>
    </div>
  );
}

export default App;