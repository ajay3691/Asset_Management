import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAssets();
    fetchCategories();
  }, []);

  const fetchAssets = () => {
    axios.get('http://127.0.0.1:8080/assets')
      .then(response => setAssets(response.data))
      .catch(error => console.error('Error fetching assets:', error));
  };

  const fetchCategories = () => {
    axios.get('http://127.0.0.1:8080/asset-categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8080/assets/${id}`)
      .then(response => {
        console.log('Delete response:', response);
        fetchAssets(); // Refresh the list of assets after deletion
      })
      .catch(error => {
        console.error('Error deleting asset:', error.response || error.message);
        if (error.response && error.response.data) {
          alert(`Failed to delete asset: ${error.response.data.error}`);
        } else {
          alert('Failed to delete asset. Please try again.');
        }
      });
  };

  return (
    <div>
      <h2>Assets</h2>
      <Link to="/assets/add" className="btn btn-primary mb-3">Add Asset</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Serial Number</th>
            <th>Make</th>
            <th>Model</th>
            <th>Category</th>
            <th>Branch</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>{asset.serialNumber}</td>
              <td>{asset.make}</td>
              <td>{asset.model}</td>
              <td>{getCategoryName(asset.categoryId)}</td>
              <td>{asset.branch}</td>
              <td>{asset.status}</td>
              <td>
                <Link to={`/assets/view/${asset.id}`} className="btn btn-info btn-sm mr-2">View</Link>
                <Link to={`/assets/edit/${asset.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                <button onClick={() => handleDelete(asset.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;
