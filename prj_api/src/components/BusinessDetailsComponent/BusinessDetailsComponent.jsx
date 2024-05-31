import { observer } from 'mobx-react';
import { useEffect } from 'react';
import businessDetails from '../../stores/businessDetails'
import logo from '../../assets/images/logo.png'
import "./BusinessDetailsComponent.css";

const BusinessDetailsComponent = observer(() => {
  useEffect(() => {
    businessDetails.initialBusinessDetails()
  }, []);

  return (
    businessDetails.businessDetails &&
    <header className='business-header' >
      <div className="business-details">
        <div className="business-info">
          <h1 className="business-name">{businessDetails.businessDetails.name}</h1>
          <div>
            <h2 > כתובת : {businessDetails.businessDetails.address}</h2>
            <h2> טלפון : {businessDetails.businessDetails.phone}</h2>
          </div>
        </div>
      </div>
      <img
        src={logo}
        alt="Business logo"
        className="business-logo"
      />
    </header>)
})

export default BusinessDetailsComponent;