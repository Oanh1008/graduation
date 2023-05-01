import axios from "axios"

class ApiHandler extends React.Component {
    getUsers = () => {
      return axios.get('/api/v1/care-bookie/user')
    }

    createUser = (data) => {
      return axios.post('/api/v1/care-bookie/user', data)
    }

    updateUser = (id, data) => {
      return axios.put(`/api/v1/care-bookie/user/${id}`, data)
    }

    deleteUser = (id) => {
      return axios.delete(`/api/v1/care-bookie/user/${id}`)
    }
  }