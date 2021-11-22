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
