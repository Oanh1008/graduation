import {
    Divider,
    Form,
    Input,
    Select,
} from 'antd';
import { useEffect } from 'react';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { post, put } from '../../../utils/apicommon';


const EditModal = ({ isVisible, Close, formid, fetchData }) => {
    const [form] = Form.useForm()


    useEffect(() => {
        form.setFieldsValue({
            medicineName: formid.medicineName,
            medicinePrice: formid.medicinePrice,
            medicineUnit: formid.medicineUnit,
        });
    }, [formid, form]);

    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id == 'wrapper') {
            Close()
        }
    }

    const handleEdit = async (value) => {
        await put('admin/medicine', {
            id: formid.id,
            medicineName: value.medicineName,
            medicinePrice: value.medicinePrice,
            medicineUnit: value.medicineUnit,

        })
        fetchData();
        Close();

    }

    return (
        <div className='fixed inset-0 z-10 '>
            <div div className=' fixed inset-0 bg-black opacity-20 text-center z-10' id='wrapper' onClick={handleClose} ></div >
            <div className='absolute inset-0 flex justify-center items-center shadow-2xl'>
                <div className='bg-white  rounded-lg px-6 py-5 z-20'>
                    <div className='flex flex-row-reverse justify-between mb-6'>
                        <button onClick={() => Close()}><Times className='w-8 h-8 fill-black' /></button>
                        <p className="text-cyan-900 text-2xl font-bold">
                            Chỉnh sửa thuôc
                        </p>
                    </div>
                    <Divider />
                    <Form
                        form={form}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        onFinish={handleEdit}
                        name="validate_other"
                        style={{
                            width: 400,
                        }}
                    >
                        <Form.Item name="medicineName" label="Tên thuốc" rules={[{ required: true }]}>
                            <Input
                                className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />
                        </Form.Item>

                        <Form.Item name="medicinePrice" label="Giá thuốc" rules={[{ required: true }]}>
                            <Input
                                className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />
                        </Form.Item>
                        <Form.Item name="medicineUnit" label="Đơn vị tính" rules={[{ required: true }]}>
                            <Input
                                className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />
                        </Form.Item>

                        <div className='flex justify-center mt-5'>
                            <Button type="submit"
                                text="Lưu" className=' w-1/4 mt-3 bg-[#457b9d] hover:opacity-75 text-white py-2 rounded-xl text-lg' />

                        </div>
                    </Form>
                </div>
            </div>
        </div >
    )
}
export default EditModal;