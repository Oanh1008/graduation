
const Columns = [
    {
        key: '1',
        title: "ID",
        dataIndex: "id",
        width: 60,
        fixed: 'left',
        sorter: (record1, record2) => {
            return record1.id > record2.id
        }
    },

    {
        key: '9',
        title: "Bệnh viện khám",
        width: 200,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> {item.invoiceShares.hospitalName}</div>
            </div>),
    },

    {
        key: '9',
        title: "Bác sĩ khám",
        width: 200,

        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.invoiceShares.doctorName} </div>
            </div>),
    },

    {
        key: '9',
        title: "Các dịch vụ đã khám",
        width: 300,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                {item.invoiceShares.services.map((item) => (
                    <p key={item.id}>{item.serviceName} </p>
                ))}

            </div>),
    },
    {
        key: '9',
        title: "Các loại thuốc đã uống",
        fixed: 'right',
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                {item.invoiceShares.medicines.map((item) => (
                    <p key={item.id}>{item.medicineName} </p>
                ))}

            </div>),
    },
    {
        key: '6',
        title: "Triệu chứng chi tiết",
        dataIndex: "",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.invoiceShares.symptomDetail} </div>
            </div>),

    },

    {
        key: '7',
        title: "Kết quả khám bệnh",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.invoiceShares.diagnose} </div>
            </div>),
    },
    {
        key: '8',
        title: "Lời khuyên",
        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.invoiceShares.advices} </div>

            </div>),
    },


];

export default Columns