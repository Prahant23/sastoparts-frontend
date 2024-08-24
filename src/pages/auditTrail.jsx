import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { getAuditTrailsApi } from '../apis/Api'; // Adjust the import path as necessary
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuditTrail = () => {
    const [auditTrails, setAuditTrails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAuditTrails();
    }, []);

    const fetchAuditTrails = async () => {
        try {
            const response = await getAuditTrailsApi();
            if (response.data.success) {
                setAuditTrails(response.data.data);
            } else {
                toast.error('Failed to fetch audit trails');
            }
        } catch (error) {
            toast.error('Error fetching audit trails');
            console.error('Error fetching audit trails:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5" style={{ backgroundColor: "#FFFFFF", color: "#000000", padding: "20px", borderRadius: "8px" }}>
            <h2 className="text-center mb-4 text-black">Audit Trail</h2>
            <div className="audit-trail-table mt-4">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Email Address</th> {/* Change header from User ID to Email Address */}
                            <th>Action</th>
                            <th>Timestamp</th>
                            <th>IP Address</th>
                            <th>Method</th>
                            <th>Status Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auditTrails.length > 0 ? auditTrails.map(trail => (
                            <tr key={trail._id}>
                                <td>{trail.email || 'N/A'}</td> {/* Display email instead of userId */}
                                <td>{trail.action}</td>
                                <td>{new Date(trail.timestamp).toLocaleString()}</td>
                                <td>{trail.ipAddress || 'N/A'}</td>
                                <td>{trail.method || 'N/A'}</td>
                                <td>{trail.statusCode || 'N/A'}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center">No audit trails found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AuditTrail;
