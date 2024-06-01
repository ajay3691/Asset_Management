import express from 'express';
import Issue from '../models/issue.js';
import Asset from '../models/asset.js';

const router = express.Router();

// Return an asset
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { returnDate, reason } = req.body;

    try {
        const issue = await Issue.findByPk(id);
        if (!issue) {
            return res.status(404).json({ error: 'Issue record not found' });
        }

        // Check if the asset has already been returned
        if (issue.returnDate) {
            return res.status(400).json({ error: 'Asset has already been returned' });
        }

        // Update the issue record with return date and reason
        await issue.update({ returnDate, reason });
        // Update the asset status to 'in stock'
        await Asset.update({ status: 'in stock' }, { where: { id: issue.assetId } });

        res.json(issue);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
