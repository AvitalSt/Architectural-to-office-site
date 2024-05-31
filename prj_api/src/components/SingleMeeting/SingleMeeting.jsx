import React from 'react';
import './SingleMeeting.css';

const SingleMeeting = ({ meeting }) => {
  
  const isToday = (date) => {
    const today = new Date();
    const meetingDate = new Date(date);
    return today.toDateString() === meetingDate.toDateString();
  };

  return (
    <>
    <div className={`SingleMeeting ${isToday(meeting.dateTime) ? 'today' : ''}`}>
      <h3>נקבעה פגישה לשירות:</h3>
      <h2 className="SingleMeeting-title">{meeting.serviceName}</h2>
      <h2 className="SingleMeeting-description">{meeting.serviceDescription}</h2>
      <h2 className="SingleMeeting-price">₪{meeting.servicePrice}</h2>
      <div className="SingleMeeting-contactInfo">
        <h3 className="SingleMeeting-clientName">{meeting.clientName}</h3>
        <h4 className="SingleMeeting-contactInfo">{meeting.clientPhone}</h4>
        <h4 className="SingleMeeting-contactInfo">{meeting.clientEmail}</h4>
        <h4 className="SingleMeeting-contactInfo today">{meeting.dateTime}</h4>
      </div>
    </div>
    </>
  );
};

export default SingleMeeting;

