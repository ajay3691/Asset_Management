import express from 'express';
import { Op } from 'sequelize';
import Asset from '../models/asset.js';
import AssetCategory from '../models/assetCategory.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { type, search } = req.query;
    const where = {};

    // Filter by asset type if provided
    if (type) where.type = type;

    // Search by make if search query is provided
    if (search) where.make = { [Op.like]: `%${search}%` };

    const assets = await Asset.findAll({ where });
    res.json(assets);
});

router.post('/', async (req, res) => {
    const { serialNumber, categoryId } = req.body;

    try {
        // Check if asset with the same serial number already exists
        const existingAsset = await Asset.findOne({ where: { serialNumber } });
        if (existingAsset) {
            return res.status(400).json({ error: 'Asset with this serial number already exists' });
        }

        // Check if categoryId exists
        const category = await AssetCategory.findByPk(categoryId);
        if (!category) {
            return res.status(400).json({ error: 'Invalid categoryId: category does not exist' });
        }

        const asset = await Asset.create(req.body);
        res.json(asset);
    } catch (error) {
        console.error('Error creating asset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get single asset by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const asset = await Asset.findByPk(id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        res.json(asset);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the asset.' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { serialNumber, categoryId } = req.body;

    try {
        // Check if asset exists
        const asset = await Asset.findByPk(id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        // Check if categoryId exists
        const category = await AssetCategory.findByPk(categoryId);
        if (!category) {
            return res.status(400).json({ error: 'Invalid categoryId: category does not exist' });
        }

        // Check if serialNumber already exists for another asset
        const existingAsset = await Asset.findOne({ where: { serialNumber, id: { [Op.ne]: id } } });
        if (existingAsset) {
            return res.status(400).json({ error: 'Asset with this serial number already exists' });
        }

        await Asset.update(req.body, { where: { id } });
        const updatedAsset = await Asset.findByPk(id);
        res.json(updatedAsset);
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const asset = await Asset.findByPk(id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        await Asset.destroy({ where: { id } });
        res.json({ message: 'Asset deleted' });
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
