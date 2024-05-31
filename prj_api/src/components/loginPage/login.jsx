import { useRef } from 'react';
import { useState, useEffect } from 'react';
import BusinessStore from '../../stores/businessDetails'
import BusinessDetailsComponent from '../BusinessDetailsComponent/BusinessDetailsComponent';
import logo from '../../assets/images/logo.png'

function Login() {
    const nameRef = useRef();
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const url = "http://localhost:8787";

    useEffect(() => {
        async function fetchData() {
            await BusinessStore.initialBusinessDetails();
            if (Object.keys(BusinessStore.businessDetails).length === 0) {
                BusinessStore.initBusinessDetails({
                    name: "Design Works Construction",
                    address: "רחוב הירקון 20 רמת גן",
                    phone: "073-375-3175",
                    logo: { logo },
                    description: "אנחנו צוות הבנייה, קבוצת אנשי מקצוע מתחום הבניה , התכנון וההנדסה האזרחית בעלי ניסיון רב שנים של עשייה ופעילות בתחומים שונים"
                })
            }
        }
        fetchData();
    }, [])

    async function login(e) {
        e.preventDefault();
        try {
            const data = { name: nameRef.current.value, password: passwordRef.current.value }
            const res = await fetch(url + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log("res", res);
            if (res.status === 200) {
                console.log("good")
                localStorage.setItem("isLogin", true);
                BusinessStore.setIsLogin(true);
            }
            else if (res.status === 401) {
                nameRef.current.value = "";
                passwordRef.current.value = "";
                setErrorMessage("פרטי ההתחברות שגויים. אנא נסה שוב.");
            }
        }
        catch (err) {
            console.log("error");
        }
    }
    return (
        <>
            <BusinessDetailsComponent></BusinessDetailsComponent>
            <form>
                <input type="text" placeholder='insert name' ref={nameRef} />
                <input type="text" placeholder='insert password' ref={passwordRef} />
                <button onClick={login}>submit</button>
                {errorMessage && <p style={{ 'position': 'absolute' }}>{errorMessage}</p>}
            </form>
        </>
    )
}
export default Login;
