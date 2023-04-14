import { FormModel } from '@models';

const Column = () => {
    const col = [
        {
            name: 'phone',
            title: 'Số điện thoại',
            formItem: {
                placeholder: 'Nhập số điện thoại',
                rules: [{ type: 'required' }, { type: 'phone' }],
            },
        },
        {
            name: 'password',
            title: 'Mật khẩu',
            formItem: {
                placeholder: 'Nhập mật khẩu',
                type: 'password',
                rules: [{ type: 'required' }, { type: 'min', value: 6 }],
            },
        },
    ];
    return col;
};
export default Column;
