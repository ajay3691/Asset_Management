// src/components/assetCategory/AssetCategoryList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AssetCategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('http://127.0.0.1:8080/asset-categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8080/asset-categories/${id}`)
      .then(() => {
        fetchCategories(); // Refresh the list of categories after deletion
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  return (
    <div>
      <h2>Asset Categories</h2>
      <Link to="/asset-categories/add" className="btn btn-primary mb-3">Add Category</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Link to={`/asset-categories/edit/${category.id}`} className="btn btn-warning btn-sm">Edit</Link>
                <button onClick={() => handleDelete(category.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetCategoryList;
