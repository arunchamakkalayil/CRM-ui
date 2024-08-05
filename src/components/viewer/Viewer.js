import React, { useState } from 'react';
import Requirements from './Requirements';
import OnTheWay from './OnTheWay';
import Received from './Received';


const Viewer = () => {
  const [activeTab, setActiveTab] = useState('requirements');

  return (
    <div className="m-4">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid w-100">
          <a className="navbar-brand m-auto" href="/">
            <i className="bi bi-person-raised-hand text-success"></i>
          </a>
        </div>
      </nav>

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
              Requirements
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
              On the Way
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
              Received
            </button>
          </li>
        </ul>
        <div className="tab-content mt-2">
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
  );
};

export default Viewer;
