export interface GoogleAuthResponse {
  credential: string;
}

export interface AuthStore {
  isAuthenticated: boolean;
}

export interface APIResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  voteQuota: number;
}

export interface Project {
  id: string;
  name: string;
  team: string;
  description: string;
  thumbnail: string[];
  link: string;
  video: string;
  active: boolean;
  courseId: CourseType;
  field: ProjectFieldType;
  metadata?: string;
  createdAt: string;
}
