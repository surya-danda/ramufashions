import React, { useContext } from 'react';
import SalesContext from '../context/SalesContext';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';

const HistoryPage = () => {
    const { sales, loading, removeSale } = useContext(SalesContext);

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-primary mb-6">Sales History</h1>
            <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Shop</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider text-right">Amount</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan="4" className="text-center p-4">Loading...</td></tr>
                            ) : sales.length > 0 ? (
                                sales.map((sale) => (
                                    <tr key={sale._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">{format(new Date(sale.date), 'dd MMM, yyyy')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{sale.shop}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary text-right font-semibold">₹{sale.amount.toLocaleString('en-IN')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                            <button onClick={() => removeSale(sale._id)} className="text-red-500 hover:text-red-700">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="text-center p-4 text-text-secondary">No sales recorded yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;