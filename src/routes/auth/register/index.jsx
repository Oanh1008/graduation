import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hi from '../../../assets/image/img.png'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();


    const ProceedLogin = (e) => {
        e.preventDefault();
        // if (validate()) {
        //     fetch('https://dummyjson.com/auth/login', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({

        //             username: 'kminchelle',
        //             password: '0lelplR',
        //         })
        //     })
        //         .then(res => res.json())
        //         .then((resp) => {
        //             if (Object.keys(resp).length === 0) {
        //                 console.log("username invalid");
        //             }
        //             else {
        //                 if (resp.password === password) {
        //                     sessionStorage.setItem('username', username)
        //                     navigate(`/login`)
        //                 } else {
        //                     console.log("invalid credential");
        //                     console.log(resp.firstName);
        //                 }
        //             }
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         })
        // }
        navigate('/')
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            console.log("enter un");
        }
        if (password === '' || password === null) {
            result = false;
            console.log("enter pww");
        }
        return result
    }
    return (

        <section className="relative bg-[#f8f9fd] h-screen ">
            <div className='flex items-center  h-full '>
                <div className='flex items-center justify-center m-auto'>
                    <div className=' h-[550px] w-[500px]'
                        style={{ backgroundImage: `url(${hi})`, backgroundPosition: 'top', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    </div>
                    <div className="relative z-20 h-[550px] w-[600px] p-6 m-auto bg-white rounded-lg shadow-lg lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-cyan-800 underline">
                            Đăng ký
                        </h1>
                        <form onSubmit={ProceedLogin} className="mt-6">
                            <div className="mb-2">
                                <label
                                    htmlFor="text"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Tên phòng khám
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    value={password}
                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    value={password}
                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>

                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    value={password}
                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Địa chỉ
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    value={password}
                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mt-6">
                                <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-cyan-800 rounded-md hover:bg-cyan-500 focus:outline-none focus:bg-cyan-500">
                                    Đăng ký
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>

        </section >
    )
}

export default Register
