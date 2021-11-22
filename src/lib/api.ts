import { API_HOST_KEY } from './constants';
import { logout } from './auth';
import type { APIResponse, Course, Project } from 'src';

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
};

const api = {
  auth,
  course,
  coursework: {
    project,
  },
};

export default api;
