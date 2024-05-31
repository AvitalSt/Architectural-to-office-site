
import { observer } from "mobx-react";
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BusinessStore from '../../stores/businessDetails'

const FormUpdateBusinessData = observer(() => {
    useEffect(() => {
        BusinessStore.initialBusinessDetails();
    }, [])
    const [isOpen, setIsOpen] = useState(true);
    const [formData, setFormData] = useState({
        name: BusinessStore.businessDetails.name,
        address: BusinessStore.businessDetails.address,
        phone: BusinessStore.businessDetails.phone,
        description: BusinessStore.businessDetails.description
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        console.log(formData.name, formData.address)
        e.preventDefault();
        try {
            if (formData.name !== "" && formData.address !== "" && formData.phone !== "" && formData.description !== "") {
                BusinessStore.setBusinessDetails(formData)
            }
            setFormData({
                name: '',
                address: '',
                phone: '',
                description: "",
            });
            setIsOpen(false);
        }
        catch (error) {
            console.error('Error submitting meeting:', error);
        }
    };
    return (
        <>
            <button onClick={() => setIsOpen(true)}>לעריכת פרטי העסק</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>עריכת פרטי העסק</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                fullWidth
                                label="Business name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder=" business name"
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                label="Business address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder=" business address"
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                label="Business phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder=" business phone"
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                label="Business description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="business describtion"
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>)
})
export default FormUpdateBusinessData;