import React, { list } from 'react'
import { IconHospital, Stethoscope, User} from '../../assets/svg/index'
export const Data = [
    {
        key: 1,
        title: "Bác sĩ",
        subtitle: "Khám phá đội ngũ bác sĩ tài năng và đầy tâm huyết, sẵn sàng chăm sóc sức khỏe của bạn!",
        path: "/doctor",
        icon: <User/>
    },
    {
        key: 2,
        title: "Cơ sở y tế",
        subtitle: "Khám phá danh sách cơ sở y tế đa dạng và hiện đại trên trang web của chúng tôi - hãy trải nghiệm sự chăm sóc y tế chất lượng và tiện nghi!",
        path: "/hospital",
        icon: <IconHospital/>

    },
]