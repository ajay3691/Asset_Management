// src/components/ScrapAsset.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScrapAsset = () => {
  const [assets, setAssets] = useState([]);
  const [scrapInfo, setScrapInfo] = useState({ assetId: '', reason: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/assets')
      .then(response => setAssets(response.data))
      .catch(error => console.error('Error fetching assets:', error));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setScrapInfo({ ...scrapInfo, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError(null); // Reset error state before making the request

    axios.put(`http://127.0.0.1:8080/scrap/${scrapInfo.assetId}`, scrapInfo)
      .then(() => {
        alert('Asset scrapped successfully');
        // Optionally clear the form or refresh the assets list
        setScrapInfo({ assetId: '', reason: '' });
      })
      .catch(error => {
        console.error('Error scrapping asset:', error);
        if (error.response && error.response.data) {
          setError(error.response.data.error);
        } else {
          setError('Failed to scrap asset. Please try again.');
        }
      });
  };

  return (
    <div>
      <h2>Scrap Asset</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Asset</label>
          <select className="form-control" name="assetId" value={scrapInfo.assetId} onChange={handleChange} required>
            <option value="">Select Asset</option>
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>{asset.serialNumber}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Reason for Scrap</label>
          <input type="text" className="form-control" name="reason" value={scrapInfo.reason} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-danger">Scrap</button>
      </form>
    </div>
  );
};

export default ScrapAsset;
