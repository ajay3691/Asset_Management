import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({ name: '', email: '', phone: '', status: true });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8080/employees/${id}`)
        .then(response => setEmployee(response.data))
        .catch(error => console.error('Error fetching employee:', error));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: name === 'status' ? (value === 'true') : value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const request = id
      ? axios.put(`http://127.0.0.1:8080/employees/${id}`, employee)
      : axios.post('http://127.0.0.1:8080/employees', employee);

    request
      .then(() => navigate('/employees'))
      .catch(error => console.error(`Error ${id ? 'updating' : 'adding'} employee:`, error));
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            name="status"
            value={employee.status}
            onChange={handleChange}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
