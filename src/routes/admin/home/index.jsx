import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../../layout'
import welcome from '../../../assets/image/welcome.jpg'

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let username = sessionStorage.getItem('user');
        console.log(username);
        if (username === '' || username === null) {
            navigate(`/login`)
        }
    }, [])
    return (
        <Layout>
            <div className='flex justify-center items-center text-5xl text-cyan-900 font-bold'>
                WELCOME TO MY WEBSITE
            </div>
        </Layout>
    )
}

export default Home
