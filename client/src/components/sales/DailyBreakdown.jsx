import React from 'react';

const DailyBreakdown = ({ data, monthName, year }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
            <h3 className="text-xl font-bold text-text-primary">
                Daily Breakdown - {monthName} {year}
            </h3>
            <p className="text-text-secondary mt-1 mb-4">Daily sales breakdown for each shop</p>

            <div className="overflow-y-auto max-h-[500px] pr-2">
                <table className="w-full text-left">
                    <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider text-right">Ramu Fashions</th>
                            <th className="px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider text-right">Ramu Readymades</th>
                            <th className="px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((day) => (
                            <tr key={day.date} className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-text-primary">
                                    {day.date.replace(/, \d{4}/, '')} {/* Removes the year for a cleaner look */}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-text-secondary text-right">
                                    {day.ramuFashions > 0 ? `₹${day.ramuFashions.toLocaleString('en-IN')}` : '-'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-text-secondary text-right">
                                    {day.ramuReadymades > 0 ? `₹${day.ramuReadymades.toLocaleString('en-IN')}` : '-'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-text-primary text-right font-semibold">
                                    {day.total > 0 ? `₹${day.total.toLocaleString('en-IN')}` : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailyBreakdown;