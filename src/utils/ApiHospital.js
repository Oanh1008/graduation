import axios from "axios"

class ApiHandler extends React.Component {
    getHospitals = () => {
      return axios.get('/api/v1/care-bookie/doctor')
    }

    createHospital = (data) => {
      return axios.post('/api/v1/care-bookie/doctor', data)
    }

    updateHospital = (id, data) => {
      return axios.put(`/api/v1/care-bookie/doctor/${id}`, data)
    }

    deleteHospital = (id) => {
      return axios.delete(`/api/v1/care-bookie/doctor/${id}`)
    }
  }