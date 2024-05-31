
import React, { useEffect } from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import BusinessDetailsComponent from '../BusinessDetailsComponent/BusinessDetailsComponent';
import BusinessStore from '../../stores/businessDetails';
import Footer from '../footer/footer';
import SingleService from '../singleService/singleService';
import './DesignWorksConstruction.css'

const DesignWorksConstruction = observer(() => {
  useEffect(() => {
    localStorage.removeItem('isLogin');
    BusinessStore.initialBusinessDetails();
  }, []);
  const { id } = useParams();

  return (
    <>
      <header>
        <BusinessDetailsComponent />
      </header>
      <Link to="/admin" className='admin-button'>
        <button>לעמוד המנהל</button>
      </Link>
      <div className="container">
        <div className="sidebar">
          {BusinessStore.businessServices.map((service, i) => (
            <Link to={`/${service.id}`} key={i}>
              <div>{service.name}</div>
            </Link>
          ))}
        </div>
        <div className="content">
          {id ? <Outlet context={[id]} /> : <SingleService context={[0]}></SingleService>}
        </div>
      </div >
      <footer>
        <Footer />
      </footer>
    </>
  );
});

export default DesignWorksConstruction;
