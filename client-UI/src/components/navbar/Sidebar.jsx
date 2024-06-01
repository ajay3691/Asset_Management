import React, { useState, useEffect } from 'react';
import { Sidenav, Nav, Toggle } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import './Sidebar.css';

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const handleNavSelect = (eventKey) => {
    navigate(eventKey);
    if (window.innerWidth <= 768) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSidebar(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setShowSidebar]);

  return (
    <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
      <Toggle
        onChange={() => setExpanded(!expanded)}
        checked={expanded}
        checkedChildren="Expand"
        unCheckedChildren="Collapse"
        className='mt-2'
      />
      <hr />
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
        <Sidenav.Body>
          <Nav onSelect={handleNavSelect}>
            <Nav.Item eventKey="/employees" icon={<DashboardIcon />}>
              Employees
            </Nav.Item>
            <Nav.Item eventKey="/assets" icon={<GroupIcon />}>
              Assets
            </Nav.Item>
            <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="/asset-categories">Asset Categories</Nav.Item>
              <Nav.Item eventKey="/stock-view">Stock View</Nav.Item>
              <Nav.Item eventKey="/issue-asset">Issue Asset</Nav.Item>
              <Nav.Item eventKey="/return-asset">Return Asset</Nav.Item>
              <Nav.Item eventKey="/scrap-asset">Scrap Asset</Nav.Item>
              <Nav.Item eventKey="/asset-history">Asset History</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default Sidebar;
