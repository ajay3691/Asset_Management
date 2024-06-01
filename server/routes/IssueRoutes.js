import express from 'express';
import Issue from '../models/issue.js';
import Asset from '../models/asset.js';
import Employee from '../models/employee.js';

const router = express.Router();

// Issue an asset to an employee
router.post('/', async (req, res) => {
    const { employeeId, assetId } = req.body;

    // Check if employee exists
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    // Check if asset exists and is in stock
    const asset = await Asset.findByPk(assetId);
    if (!asset) {
        return res.status(404).json({ error: 'Asset not found' });
    }
    if (asset.status !== 'in stock') {
        return res.status(400).json({ error: 'Asset is not available for issue' });
    }

    try {
        const issue = await Issue.create({ employeeId, assetId });
        await Asset.update({ status: 'issued' }, { where: { id: assetId } });
        res.json(issue);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all issues
router.get('/', async (req, res) => {
    try {
        const issues = await Issue.findAll({
            include: [
                { model: Employee, as: 'employee' },
                { model: Asset, as: 'asset' }
            ]
        });
        res.json(issues);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
