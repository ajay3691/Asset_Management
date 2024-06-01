import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { sequelize, connectDatabase } from './config/database.js';
import employeeRoutes from './routes/EmployeeRoute.js';
import assetRoutes from './routes/AssetRoutes.js';
import assetCategoryRoutes from './routes/AssetCatogiryRoutes.js';
import issueRoutes from './routes/IssueRoutes.js';
import returnRoutes from './routes/ReturnRoute.js';
import scrapRoutes from './routes/ScrapRoutes.js';
import assetHistoryRoutes from './routes/AssetHistoryRoutes.js';
import stockViewRoutes from './routes/StockViewRoutes.js';
import cors from 'cors'
// Load environment variables from config.env file
dotenv.config({ path: './config/config.env' });

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors())

// Root route
app.get("/", (req, res) => {
    res.send("Express - Root API........");
});

// Apply routes
app.use('/employees', employeeRoutes);
app.use('/assets', assetRoutes);
app.use('/asset-categories', assetCategoryRoutes);
app.use('/issue', issueRoutes);
app.use('/return', returnRoutes);
app.use('/scrap', scrapRoutes);
app.use('/asset-history', assetHistoryRoutes);
app.use('/stock-view', stockViewRoutes);
//app.use('/stock', StockRoute);

// Import models and associations
/* import './models/asset.js';
import './models/issue.js';
import './models/employee.js';
import './models/assetCategory.js'; */
import initializeAssociations from './models/association.js'; // Import associations after models

// Initialize associations
initializeAssociations();

// Start the server
connectDatabase().then(() => {
    sequelize.sync().then(() => {
        app.listen(port, host, (err) => {
            if (err) {
                console.error('Error starting server:', err);
            } else {
                console.log(`Server Running on http://${host}:${port}`);
            }
        });
    });
}).catch(error => {
    console.error('Failed to connect to the database:', error);
});
