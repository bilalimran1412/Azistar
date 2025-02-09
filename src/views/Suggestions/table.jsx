import React from "react";
// components/Table.js
const Table = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No unanswered questions available.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto  data-table border-collapse border border-gray-200 w-full text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Number</th>
                        <th className="border border-gray-300 px-4 py-2">Question</th>
                        <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td className="border border-gray-300 px-4 py-2">{index}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.text}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
