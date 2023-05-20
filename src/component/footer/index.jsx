import { Divider } from 'antd'
import React from 'react'
import { footerData } from './data'
import logo from '../../assets/image/logo_1.png'

const Footer = () => {
    return (
        <footer className="relative bg bottom-0 w-full bg-cyan-950  ">
            <div className="container mx-auto">
                <div className="max-sm:grid-cols-1 grid grid-cols-2 gap-8 mx-3 pt-32 pb-20 md:grid-cols-3">
                    <div>
                        <div className="mb-4">
                            <img src={logo} width={200} />
                        </div>
                        <div className='mb-2 text-white font-bold'>Hỗ trợ khách hàng</div>
                        <h2 className='text-xl text-white hover:text-cyan-400'>0123 - 567 - 7650</h2>
                    </div>

                    {footerData.map((footer, index) => {
                        return (
                            <div key={index}>
                                <h3 className="mb-6 text-xl font-semibold text-white uppercase">{footer.title}</h3>
                                <ul className="  text-cyan-600">
                                    {footer.childen.map((item, id) => {
                                        return (
                                            <li className="mb-4 relative flex gap-3 items-center group ">
                                                <p className='w-8 h-8 fill-white group-hover:fill-cyan-500'>{item.alt}</p>
                                                <a href="#" className="text-white  group-hover:text-cyan-500">{item.name}</a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}

                </div>
            </div>
        </footer>
    )
}

export default Footer
