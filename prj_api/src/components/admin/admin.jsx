import { Outlet, Link } from "react-router-dom";
import { observer } from "mobx-react";
import { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import FormUpdateBusinessData from '../FormUpdateBusinessData/FormUpdateBusinessData'
import BusinessDetailsComponent from '../BusinessDetailsComponent/BusinessDetailsComponent'
import Login from '../loginPage/login'
import BusinessStore from '../../stores/businessDetails'

const Admin = observer(() => {
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditModeToggle = () => {
        setIsEditMode(!isEditMode)
    }

    useEffect(() => {
        if (localStorage.getItem("isLogin") === true) {
            BusinessStore.setIsLogin(true)
        }
        BusinessStore.initialbusinessServices();
        BusinessStore.initialBusinessDetails();
    }, []);

    return (
        <>
            <div>
                {BusinessStore.isLogin ?
                    <>
                        <Fab
                            onClick={handleEditModeToggle} >
                            <EditIcon />
                        </Fab>
                        {isEditMode ? (<FormUpdateBusinessData  ></FormUpdateBusinessData>)
                            :
                            <BusinessDetailsComponent></BusinessDetailsComponent>}
                        <div>
                            <Button variant="outlined" ><Link to="./services">רשימת השירותים</Link></Button>
                            <Button variant="outlined" ><Link to="./meeting">רשימת הפגישות</Link></Button>
                        </div>
                        <Outlet />
                    </> :
                    <Login />}
            </div>
        </>
    )
})
export default Admin;