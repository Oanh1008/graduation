import { Divider } from 'antd'
import React from 'react'
import { footerData } from './data'
import logo from '../../assets/image/logo_1.png'

const Footer = () => {
    return (
        <footer className="relative bg bottom-0 w-full bg-cyan-950  ">
            <div className="container mx-auto">
                <div className="max-sm:grid-cols-1 grid grid-cols-2 gap-8 mx-3 pt-32 pb-20 md:grid-cols-4">
                    <div>
                        <div className="mb-4">
                            <img src={logo} width={200} />
                        </div>
                        <div className='mb-2 text-white font-bold'>For Support</div>
                        <h2 className='text-xl text-white hover:text-orange-400'>0123 - 567 - 7650</h2>
                    </div>

                    {footerData.map((footer, index) => {
                        return (
                            <div key={index}>
                                <h3 className="mb-6 text-xl font-semibold text-white uppercase">{footer.title}</h3>
                                <ul className="  text-cyan-600">
                                    {footer.childen.map((item, id) => {
                                        return (
                                            <li className="mb-4 relative">
                                                <a href="#" className="before:w-1 before:h-1 before:absolute before:bg-slate-400 before:rounded before:top-2 before:-left-5 hover:before:bg-orange-400  text-white no-underline hover:text-orange-400">{item.name}</a>
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
