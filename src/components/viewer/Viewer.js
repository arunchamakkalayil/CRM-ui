import React, { useState } from 'react';
import Requirements from './Requirements';
import OnTheWay from './OnTheWay';
import Received from './Received';
import { Link } from 'react-router-dom';
import './Viewer.css'
const Viewer = () => {
  const [activeTab, setActiveTab] = useState('requirements');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid w-100">
        <a className="navbar-brand" href="/">
          <i className="bi bi-people"></i> <b>ERM</b>
        </a>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{color:'black !important'}}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-link" style={{color:'black !important'}}>About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      <div style={{ flex: '1' }}>
        <div className="mt-4">
          <ul
            className="nav nav-tabs d-flex justify-content-around flex-wrap"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'requirements' ? 'active' : ''}`}
                id="requirements-tab"
                data-bs-toggle="tab"
                data-bs-target="#requirements"
                type="button"
                role="tab"
                aria-controls="requirements"
                aria-selected={activeTab === 'requirements'}
                onClick={() => setActiveTab('requirements')}
                style={{
                  fontSize: window.innerWidth < 768 ? '12px' : '16px',
                  padding: window.innerWidth < 768 ? '8px 12px' : '10px 16px',
                  borderRadius: '8px',
                  boxShadow: activeTab === 'requirements' ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                  background: activeTab === 'requirements' ? 'linear-gradient(45deg, #36D1DC, #5B86E5)' : '#f8f9fa',
                  color: activeTab === 'requirements' ? '#fff' : '#333',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <i className="bi bi-bag"></i> Requirements
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'onTheWay' ? 'active' : ''}`}
                id="onTheWay-tab"
                data-bs-toggle="tab"
                data-bs-target="#onTheWay"
                type="button"
                role="tab"
                aria-controls="onTheWay"
                aria-selected={activeTab === 'onTheWay'}
                onClick={() => setActiveTab('onTheWay')}
                style={{
                  fontSize: window.innerWidth < 768 ? '12px' : '16px',
                  padding: window.innerWidth < 768 ? '8px 12px' : '10px 16px',
                  borderRadius: '8px',
                  boxShadow: activeTab === 'onTheWay' ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                  background: activeTab === 'onTheWay' ? 'linear-gradient(45deg, rgb(255 209 0), rgb(171 255 78))' : '#f8f9fa',
                  color: activeTab === 'onTheWay' ? '#fff' : '#333',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <i className="bi bi-truck"></i> On the Way
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'received' ? 'active' : ''}`}
                id="received-tab"
                data-bs-toggle="tab"
                data-bs-target="#received"
                type="button"
                role="tab"
                aria-controls="received"
                aria-selected={activeTab === 'received'}
                onClick={() => setActiveTab('received')}
                style={{
                  fontSize: window.innerWidth < 768 ? '12px' : '16px',
                  padding: window.innerWidth < 768 ? '8px 12px' : '10px 16px',
                  borderRadius: '8px',
                  boxShadow: activeTab === 'received' ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                  background: activeTab === 'received' ? 'linear-gradient(45deg, #93EDC7, #1CD8D2)' : '#f8f9fa',
                  color: activeTab === 'received' ? '#fff' : '#333',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <i className="bi bi-check2-circle"></i> Received
              </button>
            </li>
          </ul>
          <br></br>
          <div className="tab-content px-3">
            <div
              className="tab-pane fade show active"
              id="requirements"
              role="tabpanel"
              aria-labelledby="requirements-tab"
              style={{
                padding: '10px',
                borderRadius: '12px',
                transition: 'background-color 0.3s ease',
              }}
            >
              <Requirements />
            </div>
            <div
              className="tab-pane fade"
              id="onTheWay"
              role="tabpanel"
              aria-labelledby="onTheWay-tab"
              style={{
                padding: '10px',
                borderRadius: '12px',
                transition: 'background-color 0.3s ease',
              }}
            >
              <OnTheWay />
            </div>
            <div
              className="tab-pane fade"
              id="received"
              role="tabpanel"
              aria-labelledby="received-tab"
              style={{

                padding: '10px',
                borderRadius: '12px',
                transition: 'background-color 0.3s ease',
              }}
            >
              <Received />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
