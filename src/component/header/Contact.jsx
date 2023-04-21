import React from 'react'

const Contact = () => {
    return (
        <div className="container lg:flex  mx-auto">
            <div className="basis-2/3 px-4">
                <h3 className='border-b font-medium mb-7 pb-7'>Contact</h3>
                <div className='flex justify-between'>
                    <div >
                        <ul className='mb-5 '>
                            <li className='flex '>
                                <div className='mr-3 h-5 w-5    '>
                                    {/* <SVGEmail className='h-5 w-5 basis-5' /> */}
                                </div>
                                <p className='mb-5'>company@gmail.com</p>
                            </li>
                            <li className='flex '>
                                <div className='mr-3 h-5 w-5    '>
                                    {/* <SVGmap className=' mr-3 h-5 w-5 basis-5' /> */}
                                </div>

                                <p className='mb-5'>Ranelagh Place, Liverpool, L3 5UL, England</p>
                            </li>
                            <li className='flex '>
                                <div className='mr-3 h-5 w-5    '>
                                    {/* <SVGClock className=' mr-3 h-5 w-5 basis-5' /> */}
                                </div>
                                <p >7 Days a week from 10-00 am to 6-00 pm</p>
                            </li>
                        </ul>
                        <a href='/' className='font-bold text-black underline hover:text-orange-400 hover:ease-out hover:transition-all hover:duration-500'>Let’s Chat</a>
                    </div>

                    <div className='border rounded-3xl flex pl-9 ml-10 items-center'>
                        <div className='basis-2/4'>
                            <h2 className='text-2xl  mb-7 '>One of Our <strong>Best Ongoing</strong> Projects</h2>
                            <button className=' no-underline py-5 px-8 bg-orange-400 text-white rounded-3xl'>Details</button>
                        </div>
                        <div className='basis-2/4'>
                            {/* <GatsbyImage image={dt.icon.childImageSharp.gatsbyImageData} alt="support_img " /> */}
                        </div>

                    </div>
                </div>
            </div>

            <div className="basis-1/3  px-4">
                <h3 className='border-b font-medium mb-7 pb-7'>Customer Support</h3>
                <div className='border rounded-3xl px-6 pt-4 pb-6 mb-4'>
                    <div className='flex items-center mb-2'>
                        <h2 className='font-bold inline-block'>Need Help Choosing a Plan?</h2>
                    </div>
                    <p >We offer solutions for businesses of all sizes.
                        For questions about our plans and products, contact our team of experts.
                        <a href='/' className=' underline text-orange-400 '>Get in touch </a>
                    </p>
                </div>
                <a href='/' className='font-bold text-black hover:text-orange-400 hover:ease-out hover:transition-all hover:duration-500 block'>Support</a>
                <a href='/' className='font-bold text-black hover:text-orange-400 hover:ease-out hover:transition-all hover:duration-500 block'>Documentation</a>
            </div>
        </div>
    )
}

export default Contact
