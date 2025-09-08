import React, { useState, useContext } from 'react';
import SalesContext from '../context/SalesContext';
import { FaCheckCircle } from 'react-icons/fa';

const AddSalePage = () => {
    const [shop, setShop] = useState('Ramu Fashions');
    const [amount, setAmount] = useState('');

    const getTodayString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [date, setDate] = useState(getTodayString());
    const [message, setMessage] = useState('');
    const { createSale } = useContext(SalesContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSale({ shop, amount: Number(amount), date });
            setMessage('Sale added successfully!');
            setShop('Ramu Fashions');
            setAmount('');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to add sale. Please try again.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-surface p-6 sm:p-8 rounded-xl shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-lg font-medium text-text-primary">Select Shop</label>
                        <div className="mt-2 flex flex-col sm:flex-row gap-4">
                            {['Ramu Fashions', 'Ramu Readymades'].map((shopName) => (
                                <label key={shopName} className="flex-1 flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer has-[:checked]:bg-indigo-50 has-[:checked]:border-primary">
                                    <input type="radio" value={shopName} name="shop" checked={shop === shopName} onChange={(e) => setShop(e.target.value)}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/>
                                    <span className="ml-3 font-medium text-text-primary">{shopName}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-text-secondary">Date</label>
                            <input type="date" id="date" value={date} max={getTodayString()} onChange={(e) => setDate(e.target.value)} required
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-text-secondary">Amount (₹)</label>
                            <input type="number" id="amount" placeholder="e.g. 15000" value={amount} onChange={(e) => setAmount(e.target.value)} required
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Add Sale
                        </button>
                    </div>
                </form>
                {message && (
                    <div className="mt-4 flex items-center space-x-2 text-green-600">
                        <FaCheckCircle />
                        <span>{message}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddSalePage;