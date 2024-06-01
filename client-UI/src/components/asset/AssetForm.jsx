import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AssetForm = () => {
  const [asset, setAsset] = useState({
    serialNumber: '',
    make: '',
    model: '',
    categoryId: '',
    branch: '',
    value: '',
    status: 'in stock'
  });
  const [error, setError] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8080/assets/${id}`)
        .then(response => setAsset(response.data))
        .catch(error => console.error('Error fetching asset:', error));
    }
    fetchCategoryOptions(); // Fetch category options when component mounts
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setAsset({ ...asset, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      axios.put(`http://127.0.0.1:8080/assets/${id}`, asset)
        .then(() => navigate('/assets'))
        .catch(handleError);
    } else {
      axios.post('http://127.0.0.1:8080/assets', asset)
        .then(() => navigate('/assets'))
        .catch(handleError);
    }
  };

  const handleError = error => {
    console.error('Error:', error);
    if (error.response && error.response.data) {
      setError(error.response.data.error);
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const fetchCategoryOptions = () => {
    axios.get('http://127.0.0.1:8080/asset-categories')
      .then(response => {
        const options = response.data.map(category => (
          <option key={category.id} value={category.id}>{category.id}</option>
        ));
        setCategoryOptions(options);
      })
      .catch(error => console.error('Error fetching category options:', error));
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Asset</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Serial Number</label>
          <input type="text" className="form-control" name="serialNumber" value={asset.serialNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Make</label>
          <input type="text" className="form-control" name="make" value={asset.make} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Model</label>
          <input type="text" className="form-control" name="model" value={asset.model} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-control" name="status" value={asset.status} onChange={handleChange}>
            <option value="in stock">In Stock</option>
            <option value="issued">Issued</option>
            <option value="scrapped">Scrapped</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category ID</label>
          <select className="form-control" name="categoryId" value={asset.categoryId} onChange={handleChange} required>
            <option value="">Select Category ID</option>
            {categoryOptions}
          </select>
        </div>
        <div className="form-group">
          <label>Branch</label>
          <input type="text" className="form-control" name="branch" value={asset.branch} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Value</label>
          <input type="number" step="0.01" className="form-control" name="value" value={asset.value} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AssetForm;
