import { API_HOST_KEY, JWT_KEY } from './constants';
import { logout } from './auth';
import type { APIResponse, Blog, Course, Project, ProjectForm } from 'src';

const host = () => localStorage.getItem(API_HOST_KEY);
const baseUrl = () => host() + '/api/v1';

const handleResponse = async <T>(response: Response): Promise<T> => {
  let jsonResponse: APIResponse<T>;
  try {
    jsonResponse = await response.json();
  } catch (e) {
    throw new Error(e);
  }
  if (!response.ok) {
    if (response.status === 401) {
      logout();
      throw new Error('Token expired');
    }
    throw new Error(jsonResponse.error || response.statusText || response.status.toString());
  }
  return jsonResponse.data;
};

const headerBuilder = function () {
  let isJson = false;
  let withAuth = false;
  return {
    withAuth: function () {
      this.withAuth = true;
      return this;
    },
    json: function () {
      this.isJson = true;
      return this;
    },
    build: function (): HeadersInit {
      let header: HeadersInit = {};
      if (this.withAuth) {
        header.Authorization = `Bearer ${localStorage.getItem(JWT_KEY)}`;
      }
      if (this.isJson) {
        header['Content-Type'] = 'application/json';
      }
      return header;
    },
  };
};

const auth = {
  login: async (jwt: string) => {
    const response = await fetch(baseUrl() + '/auth/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return await handleResponse(response);
  },
};

const course = {
  getAll: async (): Promise<Course[]> => {
    const response = await fetch(baseUrl() + '/course');
    return handleResponse(response);
  },
};

const project = {
  getAll: async (): Promise<Project[]> => {
    const response = await fetch(baseUrl() + '/coursework/project');
    return handleResponse(response);
  },
  new: async (data: ProjectForm): Promise<Project> => {
    const response = await fetch(baseUrl() + '/coursework/project', {
      method: 'POST',
      headers: headerBuilder().json().withAuth().build(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

const blog = {
  getAll: async (): Promise<Blog[]> => {
    const response = await fetch(baseUrl() + '/coursework/blog');
    return handleResponse(response);
  },
};

const api = {
  auth,
  course,
  coursework: {
    project,
    blog,
  },
};

export default api;
