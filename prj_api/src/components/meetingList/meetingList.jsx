import { useEffect } from 'react';
import { observer } from 'mobx-react';
import SingleMeeting from '../SingleMeeting/SingleMeeting';
import MeetingStore from '../../stores/meeting';
import './meetingList.css';

const MeetingList = observer(() => {
  useEffect(() => {
    MeetingStore.initialMeetingList();
  }, []);

  return (
    <div className='allMeeting'>
      {MeetingStore.list.map((meeting, i) => (
        <SingleMeeting key={i} meeting={meeting} />
      ))}
    </div>
  );
});

export default MeetingList;