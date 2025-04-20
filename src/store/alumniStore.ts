import { create } from 'zustand';
import { Alumni, SearchFilters } from '../types';

// Mock alumni data for demonstration
const MOCK_ALUMNI: Alumni[] = [
  {
    id: '1',
    userId: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    batch: '2020',
    branch: 'Computer Science',
    company: 'Google',
    jobTitle: 'Software Engineer',
    location: 'San Francisco, CA',
    bio: 'Experienced software engineer with a passion for building scalable applications.',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    achievements: [
      { 
        id: '1', 
        title: 'Employee of the Year', 
        date: '2022-05-15',
        description: 'Recognized for outstanding performance and contributions to the team.',
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startYear: '2016',
        endYear: '2020',
      }
    ],
    experience: [
      {
        id: '1',
        company: 'Google',
        position: 'Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2020-06-01',
        current: true,
        description: 'Working on Google Cloud Platform, developing scalable solutions for enterprise clients.',
      }
    ],
    createdAt: '2023-01-15T12:00:00Z',
    updatedAt: '2023-06-20T15:30:00Z',
  },
  {
    id: '2',
    userId: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
    batch: '2019',
    branch: 'Electrical Engineering',
    company: 'Tesla',
    jobTitle: 'Electrical Engineer',
    location: 'Palo Alto, CA',
    bio: 'Passionate electrical engineer working on sustainable energy solutions.',
    linkedin: 'https://linkedin.com/in/janesmith',
    skills: ['Electrical Engineering', 'Circuit Design', 'Renewable Energy'],
    achievements: [
      { 
        id: '1', 
        title: 'Patent for Energy-Efficient Battery Design', 
        date: '2021-08-10',
        description: 'Developed and patented a new energy-efficient battery design for electric vehicles.',
      }
    ],
    education: [
      {
        id: '1',
        institution: 'MIT',
        degree: 'Bachelor of Science',
        field: 'Electrical Engineering',
        startYear: '2015',
        endYear: '2019',
      }
    ],
    experience: [
      {
        id: '1',
        company: 'Tesla',
        position: 'Electrical Engineer',
        location: 'Palo Alto, CA',
        startDate: '2019-07-15',
        current: true,
        description: 'Working on battery technology for Tesla vehicles.',
      }
    ],
    createdAt: '2023-02-10T14:20:00Z',
    updatedAt: '2023-05-25T11:45:00Z',
  },
  {
    id: '3',
    userId: '3',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    batch: '2021',
    branch: 'Mechanical Engineering',
    company: 'SpaceX',
    jobTitle: 'Mechanical Engineer',
    location: 'Hawthorne, CA',
    bio: 'Mechanical engineer passionate about aerospace and rocket propulsion systems.',
    linkedin: 'https://linkedin.com/in/michaeljohnson',
    skills: ['SolidWorks', 'Mechanical Design', 'Aerospace Engineering'],
    education: [
      {
        id: '1',
        institution: 'Caltech',
        degree: 'Bachelor of Science',
        field: 'Mechanical Engineering',
        startYear: '2017',
        endYear: '2021',
      }
    ],
    experience: [
      {
        id: '1',
        company: 'SpaceX',
        position: 'Mechanical Engineer',
        location: 'Hawthorne, CA',
        startDate: '2021-06-15',
        current: true,
        description: 'Working on propulsion systems for Falcon rockets.',
      }
    ],
    createdAt: '2023-03-05T09:15:00Z',
    updatedAt: '2023-06-10T16:40:00Z',
  },
  {
    id: '4',
    userId: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    batch: '2018',
    branch: 'Chemical Engineering',
    company: 'Pfizer',
    jobTitle: 'Research Scientist',
    location: 'New York, NY',
    bio: 'Chemical engineer specializing in pharmaceutical research and development.',
    linkedin: 'https://linkedin.com/in/emilydavis',
    skills: ['Chemical Engineering', 'Drug Development', 'Research'],
    education: [
      {
        id: '1',
        institution: 'Cornell University',
        degree: 'Bachelor of Science',
        field: 'Chemical Engineering',
        startYear: '2014',
        endYear: '2018',
      }
    ],
    experience: [
      {
        id: '1',
        company: 'Pfizer',
        position: 'Research Scientist',
        location: 'New York, NY',
        startDate: '2018-07-01',
        current: true,
        description: 'Conducting research on novel drug formulations.',
      }
    ],
    createdAt: '2023-01-20T11:30:00Z',
    updatedAt: '2023-05-15T13:25:00Z',
  },
  {
    id: '5',
    userId: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    batch: '2020',
    branch: 'Computer Science',
    company: 'Microsoft',
    jobTitle: 'Software Developer',
    location: 'Seattle, WA',
    bio: 'Software developer focused on cloud computing and distributed systems.',
    linkedin: 'https://linkedin.com/in/davidbrown',
    github: 'https://github.com/davidbrown',
    skills: ['C#', '.NET', 'Azure', 'Cloud Computing'],
    education: [
      {
        id: '1',
        institution: 'University of Washington',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startYear: '2016',
        endYear: '2020',
      }
    ],
    experience: [
      {
        id: '1',
        company: 'Microsoft',
        position: 'Software Developer',
        location: 'Seattle, WA',
        startDate: '2020-08-15',
        current: true,
        description: 'Developing cloud services for Azure platform.',
      }
    ],
    createdAt: '2023-02-25T16:45:00Z',
    updatedAt: '2023-06-05T10:20:00Z',
  },
];

interface AlumniStore {
  alumni: Alumni[];
  filteredAlumni: Alumni[];
  isLoading: boolean;
  searchQuery: string;
  filters: SearchFilters;
  
  // Actions
  fetchAlumni: () => Promise<void>;
  getAlumniById: (id: string) => Alumni | undefined;
  updateSearchQuery: (query: string) => void;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
}

export const useAlumniStore = create<AlumniStore>((set, get) => ({
  alumni: [],
  filteredAlumni: [],
  isLoading: false,
  searchQuery: '',
  filters: {},
  
  fetchAlumni: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      set({ 
        alumni: MOCK_ALUMNI,
        filteredAlumni: MOCK_ALUMNI,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching alumni:', error);
    }
  },
  
  getAlumniById: (id: string) => {
    return get().alumni.find(alumni => alumni.id === id);
  },
  
  updateSearchQuery: (query: string) => {
    set(state => {
      const filteredAlumni = applyFilters(state.alumni, query, state.filters);
      return { searchQuery: query, filteredAlumni };
    });
  },
  
  updateFilters: (filters: Partial<SearchFilters>) => {
    set(state => {
      const updatedFilters = { ...state.filters, ...filters };
      const filteredAlumni = applyFilters(state.alumni, state.searchQuery, updatedFilters);
      return { filters: updatedFilters, filteredAlumni };
    });
  },
  
  clearFilters: () => {
    set(state => {
      return { 
        filters: {}, 
        filteredAlumni: state.searchQuery 
          ? applyFilters(state.alumni, state.searchQuery, {})
          : state.alumni
      };
    });
  },
}));

// Helper function to apply filters
function applyFilters(
  alumni: Alumni[],
  query: string,
  filters: SearchFilters
): Alumni[] {
  let filtered = [...alumni];
  
  // Apply search query
  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    filtered = filtered.filter(
      alumni => 
        alumni.name.toLowerCase().includes(lowerCaseQuery) ||
        alumni.branch.toLowerCase().includes(lowerCaseQuery) ||
        alumni.batch.includes(lowerCaseQuery) ||
        (alumni.company && alumni.company.toLowerCase().includes(lowerCaseQuery)) ||
        (alumni.jobTitle && alumni.jobTitle.toLowerCase().includes(lowerCaseQuery)) ||
        (alumni.location && alumni.location.toLowerCase().includes(lowerCaseQuery))
    );
  }
  
  // Apply filters
  if (filters.batch) {
    filtered = filtered.filter(alumni => alumni.batch === filters.batch);
  }
  
  if (filters.branch) {
    filtered = filtered.filter(alumni => alumni.branch === filters.branch);
  }
  
  if (filters.jobTitle) {
    filtered = filtered.filter(
      alumni => alumni.jobTitle && alumni.jobTitle.includes(filters.jobTitle!)
    );
  }
  
  if (filters.location) {
    filtered = filtered.filter(
      alumni => alumni.location && alumni.location.includes(filters.location!)
    );
  }
  
  if (filters.skills && filters.skills.length > 0) {
    filtered = filtered.filter(
      alumni => alumni.skills && filters.skills!.some(skill => alumni.skills!.includes(skill))
    );
  }
  
  return filtered;
}