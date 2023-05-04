import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaLongArrowAltUp } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import hi from '../../../assets/image/background.jpeg'
import { get, post } from '../../../utils/apicommon'
import users from './login.json'
const Login = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')

    const navigate = useNavigate();

    const ProceedLogin = async (e) => {
        e.preventDefault();

        if (validate()) {
            const res = await post(`/common/login`, {
                phone: phone,
                password: password,
            });
            if (res) {
                if (res.roleId == 2) {
                    const hospital = await get(`/common/hospital/${res.hospitalId}`)
                    localStorage.setItem("user", JSON.stringify(hospital));
                    window.location.href = "/";

                } else {
                    localStorage.setItem("user", JSON.stringify(res));
                    window.location.href = "/";
                }
                console.log(res);
            } else {
                setErr('Thông tin tài khoản không đúng!')
            }
        }
    }

    const validate = () => {
        let result = true;
        if (phone === '' || phone === null || password === '' || password === null) {
            result = false;
            setErr("Vui lòng nhập đủ thông tin!");
        }
        return result
    }

    return (

        <section className="relative flex items-center min-h-screen">

            <div className="absolute bg-cover bg-top inset-0 bg-white opacity-20"> </div>
            <div className="relative z-20  w-full h-full p-6 m-auto bg-white rounded-lg shadow-lg lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-cyan-800 underline">
                    Đăng nhập
                </h1>
                <form
                    onSubmit={ProceedLogin} className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <p className='text-red-600 mb-5 text-sm' >{err}</p>
                    <a
                        href='/resetpassword'
                        className="text-xs text-cyan-700 hover:underline"
                    >
                        Quên mật khẩu
                    </a>
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-cyan-800 rounded-md hover:bg-cyan-500 focus:outline-none focus:bg-cyan-500">
                            Đăng nhập
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Tạo tài khoản phòng khám? {" "}
                    <button
                        onClick={() => navigate('/register')}
                        className="font-medium text-cyan-700 hover:underline"
                    >
                        Đăng ký
                    </button>
                </p>
            </div>

        </section >
    )
}

export default Login
