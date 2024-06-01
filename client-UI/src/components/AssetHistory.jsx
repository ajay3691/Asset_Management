// src/components/AssetHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssetHistory = () => {
  const [assetHistories, setAssetHistories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/asset-history')
      .then(response => setAssetHistories(response.data))
      .catch(error => setError(error.response ? error.response.data.error : 'Error fetching asset histories'));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!assetHistories.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Asset History</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Serial Number</th>
            <th>Make</th>
            <th>Model</th>
            <th>Branch</th>
            <th>Value</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Employee Phone</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Asset Status</th>
          </tr>
        </thead>
        <tbody>
          {assetHistories.map(asset => (
            asset.issues.map(issue => (
              <tr key={issue.id}>
                <td>{asset.id}</td>
                <td>{asset.serialNumber}</td>
                <td>{asset.make}</td>
                <td>{asset.model}</td>
                <td>{asset.branch}</td>
                <td>{asset.value}</td>
                <td>{issue.employee.name}</td>
                <td>{issue.employee.email}</td>
                <td>{issue.employee.phone}</td>
                <td>{new Date(issue.issueDate).toLocaleDateString()}</td>
                <td>{issue.returnDate ? new Date(issue.returnDate).toLocaleDateString() : 'Not Returned'}</td>
                <td>{asset.status}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetHistory;
