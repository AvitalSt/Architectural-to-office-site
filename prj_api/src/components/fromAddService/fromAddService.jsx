import { useState } from 'react';
import { observer } from 'mobx-react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import BusinessStore from '../../stores/businessDetails';

const FromAddService = observer(() => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        id: String(BusinessStore.businessServices.length),
        name: '',
        describtion: '',
        price: ''
    })

    const handleChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = async (e) => {
        console.log(formData.name, formData.price)
        e.preventDefault();
        try {
            if (formData.name !== "" && formData.describtion !== "" && formData.price !== "") {
                BusinessStore.addService(formData)
            }
            setFormData({
                id: String(BusinessStore.businessServices.length),
                name: '',
                describtion: '',
                price: ''
            });
            setIsOpen(false);
        }
        catch (error) {
            console.error('Error submitting meeting:', error);
        }
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} style={{ marginTop: "200px" }}>הוספת שירות לעסק</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>הוספת שירות</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                fullWidth
                                label="service name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="service describtion"
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                label="service describtion"
                                name="describtion"
                                value={formData.describtion}
                                onChange={(e) => handleChange('describtion', e.target.value)}
                                placeholder="service describtion"
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                label="service price"
                                name="price"
                                value={formData.price}
                                onChange={(e) => handleChange('price', e.target.value)}
                                placeholder="service price"
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
})
export default FromAddService