import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('http://127.0.0.1:8080/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8080/employees/${id}`)
      .then(response => {
        console.log('Delete response:', response);
        fetchEmployees(); // Refresh the list of employees after deletion
      })
      .catch(error => {
        console.error('Error deleting employee:', error.response || error.message);
        if (error.response && error.response.data) {
          alert(`Failed to delete employee: ${error.response.data.error}`);
        } else {
          alert('Failed to delete employee. Please try again.');
        }
      });
  };

  return (
    <div>
      <h2>Employees</h2>
      <Link to="/employees/add" className="btn btn-primary mb-3">Add Employee</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.status ? 'Active' : 'Inactive'}</td>
              <td>
                <Link to={`/employees/view/${employee.id}`} className="btn btn-info btn-sm mr-2">View</Link>
                <Link to={`/employees/edit/${employee.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                <button onClick={() => handleDelete(employee.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
