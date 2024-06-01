import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReturnAsset = () => {
  const [issueId, setIssueId] = useState('');
  const [issueIds, setIssueIds] = useState([]);
  const [returnDate, setReturnDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the issue IDs from the backend
    axios.get('http://127.0.0.1:8080/issue')
      .then(response => {
        setIssueIds(response.data.map(issue => issue.id));
      })
      .catch(error => {
        console.error('Error fetching issue IDs:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8080/return/${issueId}`, { returnDate, reason });
      setMessage('Asset returned successfully');
    } catch (error) {
      setMessage(error.response.data.error || 'Error returning asset');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Return Asset</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Asset ID:</label>
          <select
            className="form-control"
            value={issueId}
            onChange={(e) => setIssueId(e.target.value)}
            required
          >
            <option value="">Select Asset ID</option>
            {issueIds.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Return Date:</label>
          <input
            type="date"
            className="form-control"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Reason for Return:</label>
          <input
            type="text"
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Return Asset</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ReturnAsset;
