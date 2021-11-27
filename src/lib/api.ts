import { API_HOST_KEY, JWT_KEY } from './constants';
import { logout } from './auth';
import type { APIResponse, Blog, BlogForm, Course, CourseForm, Project, ProjectForm } from 'src';

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
  new: async (course: CourseForm): Promise<Course> => {
    const response = await fetch(baseUrl() + '/course', {
      method: 'POST',
      headers: headerBuilder().json().withAuth().build(),
      body: JSON.stringify(course),
    });
    return await handleResponse(response);
  },
  get: async (id: string): Promise<Course> => {
    const response = await fetch(baseUrl() + `/course/${id}`);
    return await handleResponse(response);
  },
  update: async (course: CourseForm): Promise<Course> => {
    const response = await fetch(baseUrl() + `/course`, {
      method: 'PUT',
      headers: headerBuilder().json().withAuth().build(),
      body: JSON.stringify(course),
    });
    return await handleResponse(response);
  },
  delete: async (id: string): Promise<void> => {
    const response = await fetch(baseUrl() + `/course/${id}`, {
      method: 'DELETE',
      headers: headerBuilder().withAuth().build(),
    });
    await handleResponse(response);
  },
};

const project = {
  getAll: async (): Promise<Project[]> => {
    const response = await fetch(baseUrl() + '/coursework/project');
    return handleResponse(response);
  },
  new: async (project: ProjectForm): Promise<Project> => {
    const response = await fetch(baseUrl() + '/coursework/project', {
      method: 'POST',
      headers: headerBuilder().json().withAuth().build(),
      body: JSON.stringify(project),
    });
    return handleResponse(response);
  },
  getOne: async (courseId: string, projectId: string): Promise<Project> => {
    const response = await fetch(baseUrl() + '/coursework/project/' + courseId + '/' + projectId);
    return handleResponse(response);
  },
  update: async (project: ProjectForm): Promise<null> => {
    const response = await fetch(baseUrl() + '/coursework/project', {
      method: 'PUT',
      headers: headerBuilder().json().withAuth().build(),
      body: JSON.stringify(project),
    });
    return handleResponse(response);
  },
  delete: async (courseId: string, projectId: string): Promise<void> => {
    const response = await fetch(baseUrl() + '/coursework/project/' + courseId + '/' + projectId, {
      method: 'DELETE',
      headers: headerBuilder().withAuth().build(),
    });
    await handleResponse(response);
  },
  updateThumbnail: async (formData: FormData): Promise<void> => {
    const response = await fetch(baseUrl() + '/coursework/project/thumbnail', {
      method: 'PUT',
      headers: headerBuilder().withAuth().build(),
      body: formData,
    });
    await handleResponse(response);
  },
};

const blog = {
  getAll: async (): Promise<Blog[]> => {
    const response = await fetch(baseUrl() + '/coursework/blog');
    return handleResponse(response);
  },
  getOne: async (courseId: string, blogId: string): Promise<Blog> => {
    const response = await fetch(baseUrl() + '/coursework/blog/' + courseId + '/' + blogId);
    return handleResponse(response);
  },
  new: async (blog: BlogForm): Promise<Blog> => {
    const response = await fetch(baseUrl() + '/coursework/blog', {
      method: 'POST',
      headers: headerBuilder().json().withAuth().build(),
      body: JSON.stringify(blog),
    });
    return handleResponse(response);
  },
  update: async (blog: BlogForm): Promise<null> => {
    const response = await fetch(baseUrl() + '/coursework/blog', {
      method: 'PUT',
      headers: headerBuilder().json().withAuth().build(),
      body: JSON.stringify(blog),
    });
    return handleResponse(response);
  },
  delete: async (courseId: string, blogId: string): Promise<void> => {
    const response = await fetch(baseUrl() + '/coursework/blog/' + courseId + '/' + blogId, {
      method: 'DELETE',
      headers: headerBuilder().withAuth().build(),
    });
    await handleResponse(response);
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
