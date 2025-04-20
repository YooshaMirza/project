import { create } from 'zustand';
import { Post, Comment } from '../types';

// Mock data for posts
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: '1',
    author: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      batch: '2020',
      jobTitle: 'Software Engineer',
    },
    content: 'Just joined Google as a Software Engineer! Excited to start this new journey. #techlife #newbeginnings',
    likes: 42,
    comments: 8,
    hasLiked: false,
    tags: ['career', 'tech'],
    createdAt: '2023-06-15T14:30:00Z',
    updatedAt: '2023-06-15T14:30:00Z',
  },
  {
    id: '2',
    userId: '2',
    author: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      batch: '2019',
      jobTitle: 'Electrical Engineer',
    },
    content: 'Looking for electrical engineering graduates for internship opportunities at Tesla. Great chance to work on cutting-edge projects! DM me for details. #careers #electricalengineering',
    likes: 28,
    comments: 5,
    hasLiked: false,
    tags: ['job', 'opportunity'],
    createdAt: '2023-06-10T09:15:00Z',
    updatedAt: '2023-06-10T09:15:00Z',
  },
  {
    id: '3',
    userId: '3',
    author: {
      id: '3',
      name: 'Michael Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      batch: '2021',
      jobTitle: 'Mechanical Engineer',
    },
    content: 'Attending the Aerospace Engineering Conference next month in Los Angeles. Would love to connect with fellow alumni who are attending! #networking #aerospace',
    images: ['https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=600'],
    likes: 15,
    comments: 3,
    hasLiked: false,
    tags: ['event', 'networking'],
    createdAt: '2023-06-05T16:45:00Z',
    updatedAt: '2023-06-05T16:45:00Z',
  },
  {
    id: '4',
    userId: '4',
    author: {
      id: '4',
      name: 'Emily Davis',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      batch: '2018',
      jobTitle: 'Research Scientist',
    },
    content: 'Just published my research on novel drug delivery systems in the Journal of Pharmaceutical Sciences. Proud moment! #research #science',
    likes: 36,
    comments: 7,
    hasLiked: false,
    tags: ['research', 'publication'],
    createdAt: '2023-05-28T11:20:00Z',
    updatedAt: '2023-05-28T11:20:00Z',
  },
  {
    id: '5',
    userId: '5',
    author: {
      id: '5',
      name: 'David Brown',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      batch: '2020',
      jobTitle: 'Software Developer',
    },
    content: "Excited to announce that I'll be hosting a workshop on Cloud Computing next week! Perfect for beginners looking to get started. Register using the link in comments. #cloudcomputing #workshop",
    likes: 20,
    comments: 4,
    hasLiked: false,
    tags: ['education', 'tech'],
    createdAt: '2023-05-20T13:10:00Z',
    updatedAt: '2023-05-20T13:10:00Z',
  },
];

// Mock data for comments
const MOCK_COMMENTS: Record<string, Comment[]> = {
  '1': [
    {
      id: '1',
      postId: '1',
      userId: '2',
      author: {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      },
      content: 'Congratulations on your new job! Google is an amazing company to work for.',
      createdAt: '2023-06-15T15:00:00Z',
      updatedAt: '2023-06-15T15:00:00Z',
    },
    {
      id: '2',
      postId: '1',
      userId: '3',
      author: {
        id: '3',
        name: 'Michael Johnson',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      },
      content: 'Great achievement! Let me know if you need any tips for settling in.',
      createdAt: '2023-06-15T16:30:00Z',
      updatedAt: '2023-06-15T16:30:00Z',
    }
  ]
};

interface PostStore {
  posts: Post[];
  comments: Record<string, Comment[]>;
  isLoading: boolean;
  
  // Actions
  fetchPosts: () => Promise<void>;
  fetchComments: (postId: string) => Promise<Comment[]>;
  createPost: (content: string, tags?: string[], images?: string[]) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  comments: {},
  isLoading: false,
  
  fetchPosts: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      set({ posts: MOCK_POSTS, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching posts:', error);
    }
  },
  
  fetchComments: async (postId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const comments = MOCK_COMMENTS[postId] || [];
      
      set(state => ({
        comments: {
          ...state.comments,
          [postId]: comments
        }
      }));
      
      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  },
  
  createPost: async (content: string, tags?: string[], images?: string[]) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newPost: Post = {
        id: String(Math.random()),
        userId: '1', // Assuming current user
        author: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
          batch: '2020',
          jobTitle: 'Software Engineer',
        },
        content,
        images,
        likes: 0,
        comments: 0,
        hasLiked: false,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set(state => ({
        posts: [newPost, ...state.posts],
        isLoading: false
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error('Error creating post:', error);
    }
  },
  
  toggleLike: async (postId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      set(state => ({
        posts: state.posts.map(post => {
          if (post.id === postId) {
            const hasLiked = !post.hasLiked;
            const likes = hasLiked ? post.likes + 1 : post.likes - 1;
            return { ...post, hasLiked, likes };
          }
          return post;
        })
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  },
  
  addComment: async (postId: string, content: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newComment: Comment = {
        id: String(Math.random()),
        postId,
        userId: '1', // Assuming current user
        author: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set(state => {
        const postComments = state.comments[postId] || [];
        
        return {
          comments: {
            ...state.comments,
            [postId]: [...postComments, newComment]
          },
          posts: state.posts.map(post => {
            if (post.id === postId) {
              return { ...post, comments: post.comments + 1 };
            }
            return post;
          })
        };
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  },
}));