import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#FFBB28', '#00C49F', '#FF4D4F'];

const JobStats = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchJobStats = async () => {
        try {
            const res = await axios.get('/api/v1/job/job-state', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const { defaultState } = res.data;

            const chartData = [
                { name: 'Pending', value: defaultState.pending },
                { name: 'Interview', value: defaultState.interview },
                { name: 'Rejected', value: defaultState.rejected },
            ];

            setData(chartData);
        } catch (err) {
            toast.error('Failed to load job stats');
        }
    };

    useEffect(() => {
        fetchJobStats();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center mt-5 px-3">
            <div
                className="card shadow-lg p-4"
                style={{
                    maxWidth: '460px',
                    width: '100%',
                    borderRadius: '20px',
                    background: '#ffffff',
                    border: 'none',
                }}
            >
                <h4 className="text-center mb-4" style={{ fontWeight: '600', color: '#333' }}>
                    Job Status Overview
                </h4>

                {data.length > 0 ? (
                    <div className="d-flex justify-content-center">
                        <PieChart width={360} height={300}>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                ) : (
                    <p className="text-center text-muted">No data available</p>
                )}

                <button
                    className="btn btn-dark mt-4 w-100"
                    style={{
                        borderRadius: '8px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease-in-out',
                    }}
                    onClick={() => navigate('/jobs')}
                    onMouseOver={e => e.target.style.background = '#333'}
                    onMouseOut={e => e.target.style.background = '#000'}
                >
                    ← Back to Dashboard
                </button>
            </div>

        </div>

    );
};

export default JobStats;
