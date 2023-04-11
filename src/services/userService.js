import axios from 'axios';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/user`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  edit(body, id) {
    return this.api.put(`/edit/${id}`, body).then(({ data }) => data).catch(error => error);
  }

  delete(id) {
    return this.api.delete(`/delete/${id}`).then(({ data }) => data).catch(error => error);
  }
}

const userService = new UserService();

export default userService;