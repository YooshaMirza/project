// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'alumni' | 'student';
  createdAt: string;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Alumni Types
export interface Alumni {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  batch: string;
  branch: string;
  company?: string;
  jobTitle?: string;
  location?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  skills?: string[];
  achievements?: Achievement[];
  education?: Education[];
  experience?: Experience[];
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

// Post Types
export interface Post {
  id: string;
  userId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    batch?: string;
    jobTitle?: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  hasLiked: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Search and Filter Types
export interface SearchFilters {
  batch?: string;
  branch?: string;
  jobTitle?: string;
  location?: string;
  skills?: string[];
}