import { observer } from "mobx-react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom"; // יבוא נסר ל־useParams
import FormAddMeeting from "../fromAddMeeting/fromAddMeeting";
import BusinessStore from "../../stores/businessDetails";
import MeetingStore from '../../stores/meeting';
import "./singleService.css";

const SingleService = observer(() => {
  const { id } = useParams();
  const serviceId = id ? id : 0; //אם אין id שיהיה הגדרת ברירת מחדל 0
  const service = BusinessStore.businessServices.find(
    (service) => service.id === String(serviceId)
  );

  useEffect(() => {
    MeetingStore.initialMeetingList();
    BusinessStore.initialbusinessServices();
  }, []);

  return (
    <>
      <div className="singleservicediv">
        <div className="details">
          {service && service.name && <h2>{service.name}<div></div></h2>}
          {service && service.describtion && <div>{service.describtion}</div>}
        </div>
        <div>
          <FormAddMeeting i={service} name={service && service.name}></FormAddMeeting>
        </div>
      </div>
    </>
  );
});

export default SingleService;
