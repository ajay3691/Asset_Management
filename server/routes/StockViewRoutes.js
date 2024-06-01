import express from 'express';
import { sequelize } from '../config/database.js';
import Asset from '../models/asset.js';

const router = express.Router();

// View stock of assets in stock
router.get('/', async (req, res) => {
    try {
        const stockView = await Asset.findAll({
            attributes: [
                'branch',
                [sequelize.fn('COUNT', sequelize.col('id')), 'total_assets'],
                [sequelize.fn('SUM', sequelize.col('value')), 'total_value'],
            ],
            where: { status: 'in stock' },
            group: ['branch'],
        });

        res.json(stockView);
    } catch (error) {
        console.error('Error fetching stock view:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
