import express from 'express';
import Asset from '../models/asset.js';
import Issue from '../models/issue.js';
import Employee from '../models/employee.js';

const router = express.Router();

// Get all asset histories
router.get('/', async (req, res) => {
    try {
        const assets = await Asset.findAll({
            include: [
                {
                    model: Issue,
                    as: 'issues',
                    include: [
                        {
                            model: Employee,
                            as: 'employee'
                        }
                    ]
                }
            ]
        });
        res.json(assets);
    } catch (error) {
        console.error('Error fetching asset histories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
