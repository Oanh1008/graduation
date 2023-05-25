import React from 'react'
import { IconEmail, IconPhone, Map } from '../../assets/svg'

const Contact = () => {
    return (
        <div className="container lg:flex  mx-auto z-50">
            <div className="basis-1/2 px-4">
                <h3 className='border-b text-lg font-medium mb-6 pb-6'>Liên hệ</h3>
                <div className='flex justify-between'>
                    <div >
                        <ul className='mb-5 '>
                            <li className='flex '>
                                <div className='mr-3 h-5 w-5    '>
                                    <IconEmail className='h-5 w-5 basis-5' />
                                </div>
                                <p className='mb-5'>carebookie@website.com.vn</p>
                            </li>
                            <li className='flex '>
                                <div className='mr-3 h-5 w-5    '>
                                    <IconPhone className=' mr-3 h-5 w-5 basis-5' />
                                </div>
                                <p >(+84) 899 915 441 </p>
                            </li>
                        </ul>

                    </div>


                </div>
            </div>

            <div className="basis-1/2  px-4">
                <h3 className='border-b font-medium mb-7 pb-7'>Hỗ trợ khách hàng</h3>
                <div className='border rounded-3xl px-6 pt-4 pb-6 mb-4'>
                    <div className='flex items-center mb-2'>
                        <h2 className='font-bold inline-block'>Cần Hỗ Trợ Chọn Gói Dịch Vụ?</h2>
                    </div>
                    <p>Chúng tôi cung cấp các giải pháp cho doanh nghiệp với mọi quy mô.
                        Đối với câu hỏi về trang web của chúng tôi, hãy liên hệ với đội ngũ chuyên gia của chúng tôi. {''}

                    </p>
                </div>
                <a href='/' className='font-bold text-black hover:text-cyan-900 hover:ease-out hover:transition-all hover:duration-500 block'>Hỗ trợ</a>
            </div>
        </div>
    )
}

export default Contact
