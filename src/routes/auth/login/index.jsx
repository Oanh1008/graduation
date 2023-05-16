import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaLongArrowAltUp } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import hi from '../../../assets/image/img.png'
import { get, post } from '../../../utils/apicommon'

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
                if (res.roleId === 2) {
                    if (res.hospital.status === true) {
                        const hospital = await get(`/common/hospital/${res.hospitalId}`)
                        localStorage.setItem("user", JSON.stringify(hospital));
                        window.location.href = "/";
                    }
                    else {
                        setErr('Thông tin tài khoản không đúng!')
                    }

                } else if (res.roleId == 5) {
                    setErr('Thông tin tài khoản không đúng!')
                }
                else {
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

        <section className="relative bg-[#f8f9fd] h-screen ">
            <div className='flex items-center  h-full '>
                <div className='flex items-center justify-center m-auto'>
                    <div className='h-[414px] w-[414px]'
                        style={{ backgroundImage: `url(${hi})`, backgroundPosition: 'top', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    </div>
                    <div className="relative z-20 h-[414px] w-[414px] flex-1 p-6 bg-white border shadow-lg max-w-3xl">
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
                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-[#070C52] focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-[#070C52] focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <p className='text-red-600 text-center mb-5 text-sm' >{err}</p>
                            <a
                                href='/resetpassword'
                                className="text-xs text-cyan-700 hover:underline"
                            >
                                Quên mật khẩu
                            </a>
                            <div className="mt-6">
                                <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#050a49] rounded-md hover:bg-cyan-500 focus:outline-none focus:bg-cyan-500">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>

                        <p className="mt-4 text-xs font-light text-center text-gray-700">
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
                </div>

            </div>

        </section >
    )
}

export default Login
