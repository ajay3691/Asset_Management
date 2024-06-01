// src/components/assetCategory/AssetCategoryForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AssetCategoryForm = () => {
  const [category, setCategory] = useState({ name: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8080/asset-categories/${id}`)
        .then(response => setCategory(response.data))
        .catch(error => console.error('Error fetching category:', error));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      axios.put(`http://127.0.0.1:8080/asset-categories/${id}`, category)
        .then(() => navigate('/asset-categories'))
        .catch(handleError);
    } else {
      axios.post('http://127.0.0.1:8080/asset-categories', category) // Changed the endpoint URL
        .then(() => navigate('/asset-categories'))
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

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Category</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={category.name} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AssetCategoryForm;
