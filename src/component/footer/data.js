import { IconEmail, IconPhone } from "../../assets/svg";


export const footerData = [
    {
        title: "Trang web",
        childen: [
            {
                name: "Trang chủ",
                path: '/'
            },
            {
                name: "Bác sĩ",
                path: '/'
            },
            {
                name: "Cơ sở y tế",
                path: '/'
            },
        ]
    },
    {
        title: "Về chúng tôi",
        childen: [
            {
                name: " (+84) 899 915 441",
                path: '/',
                alt: <IconPhone/>
            },
            {
                name: "carebookie@website.com.vn",
                path: '/',
                alt: <IconEmail/>
            },
        ]
    },
]
