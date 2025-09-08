import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import apiClient from '../api';
import AuthContext from './AuthContext';

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);

    const fetchSales = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/sales');
            setSales(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Could not fetch sales');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchSales();
        } else {
            setSales([]);
        }
    }, [token, fetchSales]);

    const createSale = async (saleData) => {
        const response = await apiClient.post('/sales', saleData);
        setSales(prevSales => [response.data, ...prevSales]);
    };

    // --- FIX IS HERE ---
    // Added a try/catch block for better error handling.
    const removeSale = async (id) => {
        try {
            await apiClient.delete(`/sales/${id}`);
            // This line will only run if the API call is successful
            setSales(prevSales => prevSales.filter((sale) => sale._id !== id));
        } catch (err) {
            // If the deletion fails, we'll know about it.
            console.error("Failed to delete sale:", err);
            // Optionally, you can set an error state here to show a message to the user.
            setError("Could not delete the sale. Please try again.");
        }
    };
    // --- FIX ENDS HERE ---

    return (
        <SalesContext.Provider value={{ sales, loading, error, fetchSales, createSale, removeSale }}>
            {children}
        </SalesContext.Provider>
    );
};

export default SalesContext;