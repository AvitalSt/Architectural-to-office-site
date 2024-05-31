import { useState } from 'react';
import { observer } from 'mobx-react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import meeting from '../../stores/meeting'

const FormAddMeeting = observer(({ i, name }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState({
        serviceName: i ? i.name : "שונות",
        serviceDescription: i?.describtion,
        servicePrice: i?.price,
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        meetingDateTime: null,
    })
    
    function handleChange(field, value) {
        setData(prevData => ({ ...prevData, [field]: value }));
        const isDateTaken = meeting.list.some(appointment => appointment.dateTime === value);
        if (isDateTaken) {
            alert("מתנצלים התאריך שבחרת תפוס בבקשה בחר תאריך אחר");
        }
    }

    function handleSubmit(e) {
        try {
            e.preventDefault();
            meeting.addAppointment(data);
            if (setIsOpen) {
                setIsOpen(false);
            }
            alert("הפגישה נוספה! נשמח לראותך אנא לחץ על אישור :)")
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)}>לקביעת פגישה</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>קביעת פגישה</DialogTitle>
                <DialogContent>
                    <form >
                        <div>
                            <TextField
                                fullWidth
                                label="Name"
                                name="clientName"
                                onChange={(e) => handleChange('clientName', e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                label="Email"
                                name="clientEmail"
                                onChange={(e) => handleChange('clientEmail', e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="clientPhone"
                                onChange={(e) => handleChange('clientPhone', e.target.value)}
                            />
                        </div>
                        <TextField type="date" onChange={e => handleChange('dateTime', e.target.value)} />

                    </form>
                </DialogContent>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
            </Dialog>

        </>
    );
});

export default FormAddMeeting;
