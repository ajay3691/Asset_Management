import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeView = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/employees/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.error('Error fetching employee:', error));
  }, [id]);

  return (
    <div>
      <h2>Employee Details</h2>
      {employee ? (
        <div>
          <p><strong>ID:</strong> {employee.id}</p>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <p><strong>Status:</strong> {employee.status ? 'Active' : 'Inactive'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeView;
