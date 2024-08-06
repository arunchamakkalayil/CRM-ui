import React, { useState } from 'react';
import Requirements from './Requirements';
import OnTheWay from './OnTheWay';
import Received from './Received';
const Viewer = () => {
  const [activeTab, setActiveTab] = useState('requirements');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid w-100">
          <a className="navbar-brand" href="/">
            <i className="bi bi-people"></i> <b>ERM</b>
          </a>
        </div>
      </nav>
      <div style={{ flex: '1' }}>
        <div className="mt-4">
          <ul className="nav nav-tabs d-flex justify-content-around" id="myTab" role="tablist">
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
              >
                <i className="bi bi-check2-circle"></i> Received
              </button>
            </li>
          </ul>
          <div className="tab-content px-4">
            <div className="tab-pane fade show active" id="requirements" role="tabpanel" aria-labelledby="requirements-tab">
              <Requirements />
            </div>
            <div className="tab-pane fade" id="onTheWay" role="tabpanel" aria-labelledby="onTheWay-tab">
              <OnTheWay />
            </div>
            <div className="tab-pane fade" id="received" role="tabpanel" aria-labelledby="received-tab">
              <Received />
            </div>
          </div>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '10px', background: '#f1f1f1', borderRadius: '10px', position: 'sticky', bottom: 0 }}>
        <p>&copy; {new Date().getFullYear()} ERM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Viewer;
