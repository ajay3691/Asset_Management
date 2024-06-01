import express from 'express';
import { Op } from 'sequelize';
import Employee from '../models/employee.js';

const router = express.Router();

router.get("/ok", (req, res) => {
    res.send("Employee - Root API........");
});


// Get all employees with optional filtering by status and search query
router.get('/', async (req, res) => {
    try {
        const { status, search } = req.query;
        const where = {};

        // Filter by status if provided
        if (status) where.status = status === 'active';

        // Search by name if search query is provided
        if (search) where.name = { [Op.like]: `%${search}%` };

        const employees = await Employee.findAll({ where });
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a new employee
/* router.post('/', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.json(employee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(400).json({ error: 'Bad Request' });
    }
}); */

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, status } = req.body;
        const employee = await Employee.create({ name, email, phone, status });
        res.status(201).json(employee);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            // Handle unique constraint violation error
            res.status(400).json({ error: 'Email address already exists' });
        } else {
            console.error('Error creating employee:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Get an employee by ID

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing employee
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const existingEmployee = await Employee.findByPk(id);

        if (!existingEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Check if the provided email already exists for another employee
        const { email } = req.body;
        if (email && email !== existingEmployee.email) {
            const emailExists = await Employee.findOne({ where: { email } });
            if (emailExists) {
                return res.status(400).json({ error: 'Email address already exists' });
            }
        }

        await Employee.update(req.body, { where: { id } });
        const employee = await Employee.findByPk(id);
        res.json(employee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(400).json({ error: 'Bad Request' });
    }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        await Employee.destroy({ where: { id } });
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(400).json({ error: 'Bad Request' });
    }
});

export default router;
