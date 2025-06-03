import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'

export const BACKEND_URL = "http://localhost:8000/"

export default function Root() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null);
    
    const refreshToken = localStorage.getItem('refreshToken');
    useEffect(() => {
        fetch(`${BACKEND_URL}refresh`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            }
        })
        .then(res => res.json())
        .then(res => {
            setUser(res.user)
            localStorage.setItem('accessToken', res.accessToken)
            return
        })
        .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        fetch(`${BACKEND_URL}posts`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return setPosts(data)
        })
        .catch(e => console.error(e));
    }, [])
    return (
        <>
            <Outlet 
                context={{posts, user, setUser}}
            />
        </>
    )
}