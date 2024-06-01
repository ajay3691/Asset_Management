import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/navbar/Sidebar';
import Navbar from './components/navbar/Navbar';
import EmployeeList from './components/employee/EmployeeList';
import EmployeeForm from './components/employee/EmployeeForm';
import EmployeeView from './components/employee/EmployeeView';
import AssetList from './components/asset/AssetList';
import AssetForm from './components/asset/AssetForm';
import AssetView from './components/asset/AssetView';
import AssetCategoryList from './components/AssetCatogiry/AssetCatogiryList';
import AssetCategoryForm from './components/AssetCatogiry/AssetCatogiryForm';
import StockView from './components/StockView';
import IssueAsset from './components/IssuAsset';
import ReturnAsset from './components/ReturnAsset';
import ScrapAsset from './components/ScrapAsset';
import AssetHistory from './components/AssetHistory';
import 'rsuite/dist/rsuite.min.css';
import './App.css';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Router>
      <div>
        <Navbar toggleSidebar={toggleSidebar} style={{ zIndex: 1000 }} />
        <Container fluid style={{ marginTop: '56px', position: 'relative', zIndex: 1 }}>
          <Row>
            <Col md={3} className={`p-0 ${showSidebar ? '' : 'd-none d-md-block'}`}>
              <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            </Col>
            <Col md={9} className="mt-5 content-col">
              <Routes>
                <Route exact path="/employees" element={<EmployeeList />} />
                <Route path="/employees/add" element={<EmployeeForm />} />
                <Route path="/employees/edit/:id" element={<EmployeeForm />} />
                <Route path="/employees/view/:id" element={<EmployeeView />} />

                <Route exact path="/assets" element={<AssetList />} />
                <Route path="/assets/add" element={<AssetForm />} />
                <Route path="/assets/edit/:id" element={<AssetForm />} />
                <Route path="/assets/view/:id" element={<AssetView />} />

                <Route exact path="/asset-categories" element={<AssetCategoryList />} />
                <Route path="/asset-categories/add" element={<AssetCategoryForm />} />
                <Route path="/asset-categories/edit/:id" element={<AssetCategoryForm />} />

                <Route path="/stock-view" element={<StockView />} />
                <Route path="/issue-asset" element={<IssueAsset />} />
                <Route path="/return-asset" element={<ReturnAsset />} />
                <Route path="/scrap-asset" element={<ScrapAsset />} />
                <Route path="/asset-history" element={<AssetHistory />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;
