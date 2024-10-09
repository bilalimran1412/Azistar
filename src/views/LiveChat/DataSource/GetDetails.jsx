import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import { BsTrash } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import '../live-chat.css';

function extractWebsiteName(url) {
    try {
        // Prepend 'http://' if no protocol is provided
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }
        const { hostname } = new URL(url);
        return hostname;
    } catch (error) {
        console.error('Invalid URL:', url);
        return 'Unknown';
    }
}


function GetDetails() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        const fetchData = async () => {
            if (!userId) {
                console.error('User ID not found');
                setError('User ID not found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/api/v1/scrap_data/?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                const dataWithStatus = result.map(item => ({
                    ...item,
                    statusLoading: item.status === 'Pending',
                }));
                setData(dataWithStatus);

                // Check status periodically
                const intervalId = setInterval(async () => {
                    const updatedData = await Promise.all(dataWithStatus.map(async (item) => {
                        const statusResponse = await fetch(`http://localhost:4000/api/v1/scrap_data/status/${item._id}`);
                        const status = await statusResponse.json();
                        return {
                            ...item,
                            status: status.status,
                            statusLoading: status.status !== 'Complete',
                        };
                    }));
                    setData(updatedData);
                }, 5000);

                return () => clearInterval(intervalId);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        console.log('Deleting record with ID:', id); // Debugging line
        const isConfirmed = window.confirm("Are you sure you want to delete this record permanently?");
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/scrap_data/deleteurl/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setData(prevData => prevData.filter(item => item._id !== id));
                } else {
                    throw new Error(`Failed to delete record with ID ${id}`);
                }
            } catch (error) {
                console.error('Error deleting record:', error);
                setError(error.message);
            }
        } else {
            console.log('Deletion cancelled by user.');
        }
    };
    

    return (
        <div>
            <div className='hdr_st_so hdr_deta'>
                <div>
                    <h2>Data Sources</h2>
                    <p>Azister will use the knowledge you add here to answer customer questions.</p>
                </div>
                <a href='/data-sources'>
                    <button className='add_new_deta'>
                        <span><MdAdd /></span>
                        Add
                    </button>
                </a>
            </div>
            
            <div className="scrollAreaViewport">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Website Name</th>
                                <th>Data Source</th>
                                <th>Used By</th>
                                <th>Status</th>
                                <th>Last Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map(item => (
                                    <tr key={item._id}>
                                        <td>{extractWebsiteName(item.url)}</td>
                                        <td>Website</td>
                                        <td>Azister</td>
                                        <td>
                                            {item.statusLoading ? (
                                                <Loader />
                                            ) : (
                                                item.status || 'Complete'
                                            )}
                                        </td>
                                        <td>{new Date(item.timestamp).toLocaleString()}</td>
                                        <td>
                                            <button onClick={() => handleDelete(item._id)}><BsTrash /></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default GetDetails;
