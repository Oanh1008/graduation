import axios from "axios"

class ApiHandler extends React.Component {
    getDoctors = () => {
      return axios.get('/api/v1/care-bookie/doctor')
    }

    createDoctor = (data) => {
      return axios.post('/api/v1/care-bookie/doctor', data)
    }

    updateDoctor = (id, data) => {
      return axios.put(`/api/v1/care-bookie/doctor/${id}`, data)
    }

    deleteDoctor = (id) => {
      return axios.delete(`/api/v1/care-bookie/doctor/${id}`)
    }
  }