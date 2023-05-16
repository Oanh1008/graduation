import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hi from '../../../assets/image/img.png'
import { post } from '../../../utils/apicommon'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [err, setErr] = useState('')

    const navigate = useNavigate();

    const ProceedLogin = async () => {

        // e.preventDefault();
        if (validate()) {
            const add = await post(`/common/register/hospital`, {
                email: email,
                firstName: firstName,
                hospitalName: username,
                lastName: lastName,
                password: password,
                phone: phone
            })
            if (add) {
                message.open({
                    type: 'Thành công!',
                    content: 'Thêm mới tài khoản phòng khám thành công!',
                })
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            }
            else {
                setErr("Thông tin phòng khám đã tồn tại!");
            }
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null ||
            password === '' || password === null ||
            phone === '' || phone === null ||
            email === '' || email === null ||
            firstName === '' || firstName === null ||
            lastName === '' || password === null
        ) {
            result = false;
            setErr("Vui lòng nhập đủ thông tin!");
        }
        return result
    }

    return (

        <section className="relative bg-[#f8f9fd] h-screen ">
            <div className='flex items-center  h-full '>
                <div className='flex items-center justify-center m-auto'>
                    <div className=' h-[600px] w-[550px]'
                        style={{ backgroundImage: `url(${hi})`, backgroundPosition: 'top', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    </div>
                    <div className="relative z-20 h-[600px] w-[600px] p-6 m-auto bg-white rounded-lg shadow-lg lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-cyan-800 underline">
                            Đăng ký
                        </h1>
                        <form className="mt-6">
                            <div className="mb-2">
                                <label
                                    htmlFor="text"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Tên phòng khám
                                </label>
                                <input
                                    required={true}
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="phone"
                                    value={phone}
                                    min={10}
                                    max={10}
                                    required={true}

                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="text"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    value={password}
                                    required={true}

                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>

                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    value={email}
                                    required={true}

                                    className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>


                            <div className='flex justify-start gap-3 w-full'>
                                <div className="mb-2">
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Họ
                                    </label>
                                    <input
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text"
                                        value={lastName}
                                        required={true}

                                        className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="firstname"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Tên
                                    </label>
                                    <input
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text"
                                        value={firstName}
                                        required={true}

                                        className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                            </div>

                            <div className="mt-6">
                                <p className='text-red-500 text-center mb-3'>{err}</p>
                                <button type="button" onClick={ProceedLogin}
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#050a49] rounded-md hover:bg-cyan-500 focus:outline-none focus:bg-cyan-500">
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
