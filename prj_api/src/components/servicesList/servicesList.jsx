import { observer } from 'mobx-react';
import { useEffect } from 'react';
import BusinessStore from '../../stores/businessDetails'
import FromAddService from '../fromAddService/fromAddService'
import './servicesList.css';

const ServicesList = observer(() => {
    useEffect(() => {
        BusinessStore.initialbusinessServices();
    }, []);

    return (
        <>
            <div>
                <FromAddService></FromAddService>
            </div>
            <div className="hhh">
                {BusinessStore.businessServices.map((item, index) =>
                    <div className='singlemeetingtoadmin' key={index}>
                        <h3 className='nameserv'>{item.name}</h3>
                        <div className='des'>{item.describtion}</div>
                    </div>
                )}
            </div>
        </>
    );
});
export default ServicesList