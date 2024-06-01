import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AssetView = () => {
  const [asset, setAsset] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/assets/${id}`)
      .then(response => setAsset(response.data))
      .catch(error => console.error('Error fetching asset:', error));
  }, [id]);

  return (
    <div>
      <h2>Asset Details</h2>
      <p><strong>ID:</strong> {asset.id}</p>
      <p><strong>Serial Number:</strong> {asset.serialNumber}</p>
      <p><strong>Make:</strong> {asset.make}</p>
      <p><strong>Model:</strong> {asset.model}</p>
      <p><strong>Category ID:</strong> {asset.categoryId}</p>
      <p><strong>Branch:</strong> {asset.branch}</p>
      <p><strong>Value:</strong> {asset.value}</p>
      <p><strong>Status:</strong> {asset.status}</p>
      <p><strong>Created At:</strong> {new Date(asset.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(asset.updatedAt).toLocaleString()}</p>
    </div>
  );
};

export default AssetView;
