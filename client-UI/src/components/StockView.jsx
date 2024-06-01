// src/components/StockView.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockView = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/stock-view')
      .then(response => setStock(response.data))
      .catch(error => console.error('Error fetching stock view:', error));
  }, []);

  return (
    <div>
      <h2>Stock View</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Branch</th>
            <th>Total Assets</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item, index) => (
            <tr key={index}>
              <td>{item.branch}</td>
              <td>{item.total_assets}</td>
              <td>{item.total_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockView;
