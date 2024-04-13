import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/notfound.css';

function NotFound() {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className='w-100'>
      <section className="page_404 ">
        <div className="container">
          <div className="row">	
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">Page Not Found</h3>
                  <p>The page you are looking for is not available!</p>
                  <button className="btn btn-primary" onClick={handleGoToHome}>Go to Home</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
