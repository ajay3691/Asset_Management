import express from 'express';
import Asset from '../models/asset.js';

const router = express.Router();

// Scrap an asset
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const asset = await Asset.findByPk(id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        // Check if the asset is already scrapped
        if (asset.status === 'scrapped') {
            return res.status(400).json({ error: 'Asset is already scrapped' });
        }

        await Asset.update({ status: 'scrapped' }, { where: { id } });
        res.json({ message: 'Asset scrapped' });
    } catch (error) {
        console.error('Error scrapping asset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
