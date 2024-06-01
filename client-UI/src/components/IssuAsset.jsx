// src/components/IssueAsset.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IssueAsset = () => {
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);
  const [issue, setIssue] = useState({ employeeId: '', assetId: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));

    axios.get('http://127.0.0.1:8080/assets')
      .then(response => setAssets(response.data))
      .catch(error => console.error('Error fetching assets:', error));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    axios.post('http://127.0.0.1:8080/issue', issue)
      .then(() => {
        alert('Asset issued successfully');
        // Clear the form after successful submission
        setIssue({ employeeId: '', assetId: '' });
      })
      .catch(error => {
        console.error('Error issuing asset:', error);
        if (error.response && error.response.data) {
          setError(error.response.data.error);
        } else {
          setError('Failed to issue asset. Please try again.');
        }
      });
  };

  return (
    <div>
      <h2>Issue Asset</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee</label>
          <select className="form-control" name="employeeId" value={issue.employeeId} onChange={handleChange} required>
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Asset</label>
          <select className="form-control" name="assetId" value={issue.assetId} onChange={handleChange} required>
            <option value="">Select Asset</option>
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>{asset.serialNumber}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Issue</button>
      </form>
    </div>
  );
};

export default IssueAsset;
