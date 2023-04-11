import axios from 'axios';

class WorkspaceService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/workspace`
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

  findByUser(id) {
    return this.api.get(`/user/${id}`).then(({ data }) => data);
  }

  findRelatedProjects(id) {
    return this.api.get(`/project/${id}`).then(({ data }) => data);
  }
}

const workspaceService = new WorkspaceService();

export default workspaceService;