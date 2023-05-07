import {

    Divider,
    Form,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { put } from '../../../utils/apicommon';


const CancelModal = ({ isVisible, Close, user, data, fetchData }) => {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            message: data.bookInformation.message
        });
    }, [data, form]);

    const onFinish = async (values) => {
        await put('/administrative/book/cancel', {
            bookId: data.bookInformation.id,
            message: values.message,
            operatorId: user.userId
        })
        Close();
        fetchData();
    };

    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id == 'wrapper') {
            Close()
        }
    }

    return (
        <div className='fixed inset-0 z-10 '>
            <div div className=' fixed inset-0 bg-black opacity-20 text-center z-20' id='wrapper' onClick={handleClose} ></div >
            <div className='absolute inset-0 flex justify-center items-center shadow-2xl'>
                <div className='bg-white  rounded-lg px-6 py-5 z-20'>
                    <div className='flex flex-row-reverse justify-between mb-6'>
                        <button onClick={() => Close()}><Times className='w-8 h-8 fill-black' /></button>
                        <p className="text-red-500     text-3xl font-bold">
                            Huỷ lịch khám
                        </p>
                    </div>
                    <Divider />
                    <Form
                        form={form}
                        name="validate_other"
                        onFinish={onFinish}
                        style={{
                            width: 400,
                        }}
                    >
                        <Form.Item
                            name='message'
                            label="Lý do huỷ"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea />
                        </Form.Item>

                        <div className='flex justify-around'>
                            <Button type="submit"
                                text="Huỷ đặt lịch" className=' w-1/3 mt-3 text-white hover:opacity-75 bg-red-500 px-3 border py-2 rounded-xl text-lg' />

                        </div>

                    </Form>

                </div>
            </div>
        </div >
    )
}
export default memo(CancelModal);