
const Columns = [
    {
        key: '1',
        title: "STT",
        width: 60,
        fixed: 'left',
        render: (text, record, index) => <p className='font-bold'>{index + 1}</p>,

    },

    {
        key: '9',
        fixed: 'left',
        title: "Bệnh viện khám",
        width: 200,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> {item.hospitalName}</div>
            </div>),
    },

    {
        key: '9',
        title: "Bác sĩ khám",
        width: 200,

        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.doctorName} </div>
            </div>),
    },

    {
        key: '9',
        title: "Các dịch vụ đã khám",
        width: 300,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3' style={{ whiteSpace: 'pre-line' }}>
                {item.services.map((item) => item.serviceName).join("\n")}
            </div>),

    },
    {
        key: '9',
        title: "Các loại thuốc đã uống",
        width: 300,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3' style={{ whiteSpace: 'pre-line' }}>
                {item.medicines.map((item) => item.medicineName).join("\n")}
            </div>),
    },
    {
        key: '6',
        title: "Triệu chứng chi tiết",
        dataIndex: "",
        width: 300,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.invoiceInformation.symptomDetail} </div>
            </div>),

    },

    {
        key: '7',
        title: "Kết quả khám bệnh",
        width: 200,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.invoiceInformation.diagnose} </div>
            </div>),
    },
    {
        key: '8',
        title: "Lời khuyên",
        width: 200,
        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.invoiceInformation.advices} </div>

            </div>),
    },


];

export default Columns