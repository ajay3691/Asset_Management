// /server/models/associations.js

import Asset from './asset.js';
import Issue from './issue.js';
import Employee from './employee.js';
import AssetCategory from './assetCategory.js';

// Define associations
Asset.belongsTo(AssetCategory, { foreignKey: 'categoryId', as: 'category' });
Asset.hasMany(Issue, { foreignKey: 'assetId', as: 'issues' });
Issue.belongsTo(Asset, { foreignKey: 'assetId', as: 'asset' });
Issue.belongsTo(Employee, { foreignKey: 'employeeId', as: 'employee' });

function initializeAssociations() {
    console.log('Associations initialized');
}

export default initializeAssociations
