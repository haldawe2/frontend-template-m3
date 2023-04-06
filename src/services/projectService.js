import axios from 'axios';

class ProjectService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/project`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  create(body) {
    return this.api.post('/create', body).then(({ data }) => data);
  }

  edit(body, id) {
    return this.api.put(`/edit/${id}`, body).then(({ data }) => data);
  }

  delete(id) {
    return this.api.delete(`/delete/${id}`).then(({ data }) => data);
  }

  get(id) {
    return this.api.get(`/${id}`).then(({ data }) => data);
  }
}

const projectService = new ProjectService();

export default projectService;