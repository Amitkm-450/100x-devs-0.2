import axios from "axios";
import { useEffect, useState } from "react"


export const User = () => {
    const [userData, setUserData] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/user', {
            withCredentials: true,
          })
            .then(res => {
                setUserData(res.data.id);
            })

         
    }, []);
    const BACKEND_URL = 'http://loalhost:3000';
    return <div>
        You're id is {userData}
        <br /><br />
        <button onClick={() => {
          alert('hiii')
        }}>Logout</button>
    </div>
}