import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../../layout'

const Home = () => {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     let username = sessionStorage.getItem('usename');
    //     if (username === '' || username === null) {
    //         navigate(`/login`)
    //     }
    // })
    return (
        <Layout>
            Welcome
        </Layout>
    )
}

export default Home
