import axios from 'axios';

class TaskService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/tasks`
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
    return this.api.post('/create', body).then(({ data }) => data).catch(error => error);
  }

  edit(body, id) {
    return this.api.put(`/edit/${id}`, body).then(({ data }) => data).catch(error => error);
  }

  delete(id) {
    return this.api.delete(`/delete/${id}`).then(({ data }) => data).catch(error => error);
  }

  get(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(error => error);
  }

  findByProject(id) {
    return this.api.get(`/project/${id}`).then(({ data }) => data).catch(error => error);
  }
}

const taskService = new TaskService();

export default taskService;