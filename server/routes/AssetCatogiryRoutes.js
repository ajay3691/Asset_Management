import express from 'express';
import { Op } from 'sequelize';
import AssetCategory from '../models/assetCategory.js';

const router = express.Router();

// Get all asset categories
router.get('/', async (req, res) => {
    try {
        const categories = await AssetCategory.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single asset category by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const category = await AssetCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new asset category
router.post('/', async (req, res) => {
    const { name } = req.body;

    // Check if category with the same name already exists
    const existingCategory = await AssetCategory.findOne({ where: { name } });
    if (existingCategory) {
        return res.status(400).json({ error: 'Category with this name already exists' });
    }

    try {
        const category = await AssetCategory.create(req.body);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update an existing asset category
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    // Check if category exists
    const category = await AssetCategory.findByPk(id);
    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    // Check if category with the same name already exists
    const existingCategory = await AssetCategory.findOne({ where: { name, id: { [Op.ne]: id } } });
    if (existingCategory) {
        return res.status(400).json({ error: 'Category with this name already exists' });
    }

    try {
        await AssetCategory.update(req.body, { where: { id } });
        const updatedCategory = await AssetCategory.findByPk(id);
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete an asset category
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // Check if category exists
    const category = await AssetCategory.findByPk(id);
    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    try {
        await AssetCategory.destroy({ where: { id } });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
