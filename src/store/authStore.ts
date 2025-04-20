import { create } from 'zustand';
import { AuthState, User } from '../types';

// Mock user data storage
let MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123', // In a real app, this would be hashed
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'alumni',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123', // In a real app, this would be hashed
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'alumni',
    createdAt: new Date().toISOString(),
  },
] as (User & { password: string })[];

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password from user object before setting state
      const { password: _, ...userWithoutPassword } = user;
      
      set({ user: userWithoutPassword, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check if user exists
      const exists = MOCK_USERS.some(u => u.email === email);
      
      if (exists) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        name,
        email,
        password, // In a real app, this would be hashed
        role: 'alumni' as const,
        createdAt: new Date().toISOString(),
      };
      
      // Add to mock database
      MOCK_USERS.push(newUser);
      
      // Remove password from user object before setting state
      const { password: _, ...userWithoutPassword } = newUser;
      
      set({ user: userWithoutPassword, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  updateProfile: async (data: Partial<User>) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      set(state => {
        if (!state.user) return state;
        
        const updatedUser = { ...state.user, ...data };
        
        // Update in mock database
        const userIndex = MOCK_USERS.findIndex(u => u.id === state.user?.id);
        if (userIndex !== -1) {
          MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...data };
        }
        
        return { user: updatedUser, isLoading: false };
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));