import React from 'react'
import image1 from '../../../assets/image/imagereview1.png'
import image2 from '../../../assets/image/image_review.png'
import { HeartBeat } from '../../../assets/svg'

const Review = () => {
    return (
        <div className='lg:flex relative justify-end container gap-6 items-center '>
            <div className='text-cyan-900 py-20 w-2/3'>
                <div className='text-3xl font-bold leading-loose'>
                    <p> Tạo sao khách hàng chọn{' '}</p>
                    <p className='text-6xl text-center'>CareBookie?</p>
                </div>
                <ul className='my-8 flex justify-between gap-5'>
                    <li>
                        <div className=' items-start flex my-3 gap-5'>
                            <HeartBeat className='w-32 fill-cyan-600' />
                            <div>
                                <p className='font-bold text-2xl pb-2'>Tiết kiệm thời gian</p>
                                <p className='leading-relaxed text-lg text-sky-700   '> Bạn không cần phải đến trực tiếp phòng khám để đặt lịch hẹn. Chỉ cần truy cập trang web của chúng tôi từ bất kỳ nơi nào có kết nối internet và dễ dàng đặt lịch hẹn trong vài phút.</p>
                            </div>
                        </div>
                        <div className='items-start flex my-6 gap-5'>
                            <HeartBeat className='w-32 fill-cyan-600' />
                            <div>
                                <p className='font-bold text-2xl pb-2'>Tiện lợi và linh hoạt</p>
                                <p className='leading-relaxed text-lg text-sky-700'>Bạn có thể chọn ngày, giờ hẹn phù hợp với lịch trình của bạn. Ngoài ra, trang web cũng cho phép bạn thay đổi hoặc hủy bỏ lịch hẹn một cách dễ dàng, tiết kiệm thời gian và công sức.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='items-start flex my-3 gap-5'>
                            <HeartBeat className='w-32 fill-cyan-600' />
                            <div>
                                <p className='font-bold text-2xl pb-2'>Đánh giá từ bệnh nhân</p>
                                <p className='leading-relaxed text-lg text-sky-700   '>Trang web hiển thị đánh giá và đánh giá từ bệnh nhân trước đó về các bác sĩ và phòng khám. Điều này giúp bạn có cái nhìn tổng quan về chất lượng dịch vụ và đưa ra quyết định đúng đắn.</p>
                            </div>
                        </div>
                        <div className='items-start flex my-6  gap-5'>
                            <HeartBeat className='w-32 fill-cyan-600' />
                            <div>
                                <p className='font-bold text-2xl pb-2'>Bảo mật thông tin</p>
                                <p className='leading-relaxed text-lg text-sky-700'>Chúng tôi đảm bảo bảo mật thông tin cá nhân của bạn và tuân thủ các quy định về bảo mật dữ liệu. Bạn có thể yên tâm khi sử dụng trang web của chúng tôi.

                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            {/* <div className=' flex-1'>
                <img className='absolute top-28 rounded-lg ' src={image1} width={400} />
                <img className='absolute  -right-16 rounded-lg ' src={image2} width={400} />
            </div> */}
        </div>
    )
}

export default Review
