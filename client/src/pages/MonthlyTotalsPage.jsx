import React, { useContext, useState, useMemo } from 'react';
import SalesContext from '../context/SalesContext';
import { getYear, getMonth, getDaysInMonth, getDate, format } from 'date-fns';
import DailyBreakdown from '../components/sales/DailyBreakdown';

const MonthlyTotalsPage = () => {
    const { sales, loading } = useContext(SalesContext);
    const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));
    const [selectedYear, setSelectedYear] = useState(getYear(new Date()));

    const filteredSales = useMemo(() => sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return getYear(saleDate) === selectedYear && getMonth(saleDate) === selectedMonth;
    }), [sales, selectedMonth, selectedYear]);

    const totals = useMemo(() => {
        const ramuFashions = filteredSales.filter(s => s.shop === 'Ramu Fashions').reduce((sum, s) => sum + s.amount, 0);
        const ramuReadymades = filteredSales.filter(s => s.shop === 'Ramu Readymades').reduce((sum, s) => sum + s.amount, 0);
        return { ramuFashions, ramuReadymades, overall: ramuFashions + ramuReadymades };
    }, [filteredSales]);
    
    // New logic to process data for the daily breakdown table
    const dailyData = useMemo(() => {
        const daysInMonth = getDaysInMonth(new Date(selectedYear, selectedMonth));
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(selectedYear, selectedMonth, i + 1);
            return {
                date: format(date, 'MMM dd, yyyy'),
                ramuFashions: 0,
                ramuReadymades: 0,
                total: 0,
            };
        });

        for (const sale of filteredSales) {
            const dayOfMonth = getDate(new Date(sale.date)) - 1; // getDate is 1-based, array is 0-based
            if (daysArray[dayOfMonth]) {
                if (sale.shop === 'Ramu Fashions') {
                    daysArray[dayOfMonth].ramuFashions += sale.amount;
                } else if (sale.shop === 'Ramu Readymades') {
                    daysArray[dayOfMonth].ramuReadymades += sale.amount;
                }
                daysArray[dayOfMonth].total += sale.amount;
            }
        }
        return daysArray;
    }, [filteredSales, selectedMonth, selectedYear]);

    const years = Array.from(new Array(5), (val, index) => getYear(new Date()) - index);
    const months = Array.from({ length: 12 }, (e, i) => new Date(null, i, 1).toLocaleDateString("en", { month: "long" }));

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-primary mb-6">Monthly Totals</h1>
            <div className="bg-surface p-6 rounded-xl shadow-sm mb-6 flex flex-wrap items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-700">Select Period</h3>
                <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))} className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
                <select value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))} className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                    {months.map((month, index) => <option key={month} value={index}>{month}</option>)}
                </select>
            </div>

            {loading ? <p>Loading totals...</p> : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                            <h3 className="text-text-secondary font-medium">Ramu Fashions</h3>
                            <p className="text-3xl font-bold text-text-primary mt-2">₹{totals.ramuFashions.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                            <h3 className="text-text-secondary font-medium">Ramu Readymades</h3>
                            <p className="text-3xl font-bold text-text-primary mt-2">₹{totals.ramuReadymades.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-indigo-200 font-medium">Overall Total</h3>
                            <p className="text-3xl font-bold mt-2">₹{totals.overall.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                    
                    {/* Render the new DailyBreakdown component */}
                    <DailyBreakdown data={dailyData} monthName={months[selectedMonth]} year={selectedYear} />
                </>
            )}
        </div>
    );
};

export default MonthlyTotalsPage;